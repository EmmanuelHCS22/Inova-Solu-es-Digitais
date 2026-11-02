import fs from 'fs';
import path from 'path';

// 1. Extract the authentic JPEG texture from the original model
const origGlb = fs.readFileSync('public/models/placa-google-azul.glb');
const origJsonLen = origGlb.readUInt32LE(12);
const origJson = JSON.parse(origGlb.subarray(20, 20 + origJsonLen).toString());
const origBinData = origGlb.subarray(28 + origJsonLen);

const origImgBv = origJson.bufferViews[origJson.images[0].bufferView];
const jpegBuffer = origBinData.subarray(origImgBv.byteOffset, origImgBv.byteOffset + origImgBv.byteLength);
console.log(`Original JPEG: ${jpegBuffer.length} bytes extracted.`);

// 2. Physical Constants of the Acrylic L-Stand
const THICKNESS = 0.024; // 24mm uniform acrylic thickness
const HALF_WIDTH = 0.52; // Width = 1.04m (X: [-0.52, +0.52])
const WIDTH = HALF_WIDTH * 2;
const CORNER_R = 0.018; // 18mm rounded corner radius for safe, polished display corners
const BEVEL_SIZE = 0.0016; // 1.6mm diamond polished chamfer facet

const TILT_DEG = 4.5;
const THETA = (90 - TILT_DEG) * Math.PI / 180; // 85.5 deg
const ROUT = 0.040; // 40mm outer thermal bend radius
const RIN = ROUT - THICKNESS; // 16mm inner thermal bend radius
const RMID = (ROUT + RIN) / 2; // 28mm centerline radius

const NY_PLANE = -Math.cos(THETA); // -0.0784591
const NZ_PLANE = Math.sin(THETA);  //  0.9969173
const TARGET_D = 0.03069228; // Exact art plane d = y*Ny + z*Nz
const YC = ROUT; // 0.040
const ZC = (TARGET_D + YC * Math.cos(THETA) - ROUT) / Math.sin(THETA); // -0.0061884

const BASE_START_Z = -0.525;
const L_BASE = ZC - BASE_START_Z; // ~0.5188m
const L_BEND = RMID * THETA; // ~0.0418m
const Y_TOP = 1.545; // Height of acrylic plaque
const Y_OUT_THETA = YC - ROUT * Math.cos(THETA);
const L_UPRIGHT = (Y_TOP - Y_OUT_THETA) / Math.sin(THETA); // ~1.5128m
const L_TOTAL = L_BASE + L_BEND + L_UPRIGHT; // ~2.0734m

// Evaluates the continuous centerline of the bent acrylic sheet
function evaluateCenterline(s) {
  let Yc_s, Zc_s, Ny_s, Nz_s, Ty_s, Tz_s;
  if (s <= L_BASE) {
    Yc_s = THICKNESS / 2;
    Zc_s = BASE_START_Z + s;
    Ny_s = -1;
    Nz_s = 0;
    Ty_s = 0;
    Tz_s = 1;
  } else if (s <= L_BASE + L_BEND) {
    const phi = (s - L_BASE) / RMID;
    Yc_s = YC - RMID * Math.cos(phi);
    Zc_s = ZC + RMID * Math.sin(phi);
    Ny_s = -Math.cos(phi);
    Nz_s = Math.sin(phi);
    Ty_s = Math.sin(phi);
    Tz_s = Math.cos(phi);
  } else {
    const u = s - (L_BASE + L_BEND);
    Yc_s = (YC - RMID * Math.cos(THETA)) + u * Math.sin(THETA);
    Zc_s = (ZC + RMID * Math.sin(THETA)) + u * Math.cos(THETA);
    Ny_s = NY_PLANE;
    Nz_s = NZ_PLANE;
    Ty_s = Math.sin(THETA);
    Tz_s = Math.cos(THETA);
  }
  return { Yc: Yc_s, Zc: Zc_s, Ny: Ny_s, Nz: Nz_s, Ty: Ty_s, Tz: Tz_s };
}

// 3. Build Mesh 0: SuporteAcrilicoL (Single continuous water-tight acrylic solid)
function buildAcrylicSolid() {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  // Helper to push triangle
  function addTri(i1, i2, i3) {
    indices.push(i1, i2, i3);
  }
  function addQuad(i1, i2, i3, i4) {
    indices.push(i1, i2, i3, i1, i3, i4);
  }

  // We construct the acrylic sheet via parametric grid:
  // s: arc distance along the sheet
  // Base: from 0 to L_BASE (flat)
  // Bend: from L_BASE to L_BASE + L_BEND (curved arc)
  // Upright: from L_BASE + L_BEND to L_TOTAL (inclined flat)
  
  // We use:
  // s samples:
  const sSamples = [];
  // Base samples: 8 steps
  for (let i = 0; i <= 8; i++) {
    sSamples.push((i / 8) * L_BASE);
  }
  // Bend samples: 16 steps
  for (let i = 1; i <= 16; i++) {
    sSamples.push(L_BASE + (i / 16) * L_BEND);
  }
  // Upright samples: 20 steps
  for (let i = 1; i <= 20; i++) {
    sSamples.push(L_BASE + L_BEND + (i / 20) * L_UPRIGHT);
  }

  // x samples:
  // Across width X from -HALF_WIDTH to +HALF_WIDTH
  // With bevel insets at boundaries:
  // [-HALF_WIDTH, -HALF_WIDTH + BEVEL, ... interior ..., HALF_WIDTH - BEVEL, HALF_WIDTH]
  const xSamples = [];
  xSamples.push(-HALF_WIDTH);
  xSamples.push(-HALF_WIDTH + BEVEL_SIZE);
  const interiorSteps = 16;
  for (let i = 1; i < interiorSteps; i++) {
    const t = i / interiorSteps;
    xSamples.push((-HALF_WIDTH + BEVEL_SIZE) + t * (2 * HALF_WIDTH - 2 * BEVEL_SIZE));
  }
  xSamples.push(HALF_WIDTH - BEVEL_SIZE);
  xSamples.push(HALF_WIDTH);

  const numS = sSamples.length;
  const numX = xSamples.length;

  // Let's create outer surface vertices
  // side = +1 for outer
  const outerGrid = [];
  for (let j = 0; j < numS; j++) {
    const s = sSamples[j];
    const c = evaluateCenterline(s);
    const row = [];
    for (let i = 0; i < numX; i++) {
      let x = xSamples[i];
      let sEff = s;
      
      // Discrete corner rounding for top corners and rear corners:
      // Rear corners: s < CORNER_R and |x| > HALF_WIDTH - CORNER_R
      if (s < CORNER_R) {
        if (x < -HALF_WIDTH + CORNER_R) {
          const dx = x - (-HALF_WIDTH + CORNER_R);
          const ds = s - CORNER_R;
          const dist = Math.sqrt(dx * dx + ds * ds);
          if (dist > CORNER_R - BEVEL_SIZE && dist > 1e-6) {
            const factor = (CORNER_R - BEVEL_SIZE) / dist;
            // soft clamp
            x = (-HALF_WIDTH + CORNER_R) + dx * factor;
            sEff = CORNER_R + ds * factor;
          }
        } else if (x > HALF_WIDTH - CORNER_R) {
          const dx = x - (HALF_WIDTH - CORNER_R);
          const ds = s - CORNER_R;
          const dist = Math.sqrt(dx * dx + ds * ds);
          if (dist > CORNER_R - BEVEL_SIZE && dist > 1e-6) {
            const factor = (CORNER_R - BEVEL_SIZE) / dist;
            x = (HALF_WIDTH - CORNER_R) + dx * factor;
            sEff = CORNER_R + ds * factor;
          }
        }
      }
      // Top corners: s > L_TOTAL - CORNER_R
      else if (s > L_TOTAL - CORNER_R) {
        if (x < -HALF_WIDTH + CORNER_R) {
          const dx = x - (-HALF_WIDTH + CORNER_R);
          const ds = s - (L_TOTAL - CORNER_R);
          const dist = Math.sqrt(dx * dx + ds * ds);
          if (dist > CORNER_R - BEVEL_SIZE && dist > 1e-6) {
            const factor = (CORNER_R - BEVEL_SIZE) / dist;
            x = (-HALF_WIDTH + CORNER_R) + dx * factor;
            sEff = (L_TOTAL - CORNER_R) + ds * factor;
          }
        } else if (x > HALF_WIDTH - CORNER_R) {
          const dx = x - (HALF_WIDTH - CORNER_R);
          const ds = s - (L_TOTAL - CORNER_R);
          const dist = Math.sqrt(dx * dx + ds * ds);
          if (dist > CORNER_R - BEVEL_SIZE && dist > 1e-6) {
            const factor = (CORNER_R - BEVEL_SIZE) / dist;
            x = (HALF_WIDTH - CORNER_R) + dx * factor;
            sEff = (L_TOTAL - CORNER_R) + ds * factor;
          }
        }
      }

      const cEff = evaluateCenterline(sEff);
      const isBoundary = (i === 0 || i === numX - 1 || j === 0 || j === numS - 1);
      const normalOffset = isBoundary ? -BEVEL_SIZE : 0;
      const dist = (THICKNESS / 2) + normalOffset;

      const px = x;
      const py = cEff.Yc + dist * cEff.Ny;
      const pz = cEff.Zc + dist * cEff.Nz;

      // Normal
      let nx = 0, ny = cEff.Ny, nz = cEff.Nz;
      if (i === 0) nx -= 0.7071;
      else if (i === numX - 1) nx += 0.7071;
      if (j === 0) { ny -= 0.7071 * cEff.Ty; nz -= 0.7071 * cEff.Tz; }
      else if (j === numS - 1) { ny += 0.7071 * cEff.Ty; nz += 0.7071 * cEff.Tz; }
      
      const nLen = Math.sqrt(nx*nx + ny*ny + nz*nz);
      if (nLen > 1e-6) { nx /= nLen; ny /= nLen; nz /= nLen; }

      const vIdx = positions.length / 3;
      positions.push(px, py, pz);
      normals.push(nx, ny, nz);
      uvs.push((px + HALF_WIDTH) / WIDTH, sEff / L_TOTAL);
      row.push(vIdx);
    }
    outerGrid.push(row);
  }

  // Outer surface quads
  for (let j = 0; j < numS - 1; j++) {
    for (let i = 0; i < numX - 1; i++) {
      const v00 = outerGrid[j][i];
      const v10 = outerGrid[j][i+1];
      const v11 = outerGrid[j+1][i+1];
      const v01 = outerGrid[j+1][i];
      addQuad(v00, v10, v11, v01);
    }
  }

  // Create inner surface vertices (side = -1)
  const innerGrid = [];
  for (let j = 0; j < numS; j++) {
    const s = sSamples[j];
    const row = [];
    for (let i = 0; i < numX; i++) {
      let x = xSamples[i];
      let sEff = s;

      if (s < CORNER_R) {
        if (x < -HALF_WIDTH + CORNER_R) {
          const dx = x - (-HALF_WIDTH + CORNER_R);
          const ds = s - CORNER_R;
          const dist = Math.sqrt(dx * dx + ds * ds);
          if (dist > CORNER_R - BEVEL_SIZE && dist > 1e-6) {
            const factor = (CORNER_R - BEVEL_SIZE) / dist;
            x = (-HALF_WIDTH + CORNER_R) + dx * factor;
            sEff = CORNER_R + ds * factor;
          }
        } else if (x > HALF_WIDTH - CORNER_R) {
          const dx = x - (HALF_WIDTH - CORNER_R);
          const ds = s - CORNER_R;
          const dist = Math.sqrt(dx * dx + ds * ds);
          if (dist > CORNER_R - BEVEL_SIZE && dist > 1e-6) {
            const factor = (CORNER_R - BEVEL_SIZE) / dist;
            x = (HALF_WIDTH - CORNER_R) + dx * factor;
            sEff = CORNER_R + ds * factor;
          }
        }
      } else if (s > L_TOTAL - CORNER_R) {
        if (x < -HALF_WIDTH + CORNER_R) {
          const dx = x - (-HALF_WIDTH + CORNER_R);
          const ds = s - (L_TOTAL - CORNER_R);
          const dist = Math.sqrt(dx * dx + ds * ds);
          if (dist > CORNER_R - BEVEL_SIZE && dist > 1e-6) {
            const factor = (CORNER_R - BEVEL_SIZE) / dist;
            x = (-HALF_WIDTH + CORNER_R) + dx * factor;
            sEff = (L_TOTAL - CORNER_R) + ds * factor;
          }
        } else if (x > HALF_WIDTH - CORNER_R) {
          const dx = x - (HALF_WIDTH - CORNER_R);
          const ds = s - (L_TOTAL - CORNER_R);
          const dist = Math.sqrt(dx * dx + ds * ds);
          if (dist > CORNER_R - BEVEL_SIZE && dist > 1e-6) {
            const factor = (CORNER_R - BEVEL_SIZE) / dist;
            x = (HALF_WIDTH - CORNER_R) + dx * factor;
            sEff = (L_TOTAL - CORNER_R) + ds * factor;
          }
        }
      }

      const cEff = evaluateCenterline(sEff);
      const isBoundary = (i === 0 || i === numX - 1 || j === 0 || j === numS - 1);
      const normalOffset = isBoundary ? BEVEL_SIZE : 0;
      const dist = -(THICKNESS / 2) + normalOffset;

      const px = x;
      const py = cEff.Yc + dist * cEff.Ny;
      const pz = cEff.Zc + dist * cEff.Nz;

      // Normal points outward from inner face: -Ny, -Nz
      let nx = 0, ny = -cEff.Ny, nz = -cEff.Nz;
      if (i === 0) nx -= 0.7071;
      else if (i === numX - 1) nx += 0.7071;
      if (j === 0) { ny -= 0.7071 * cEff.Ty; nz -= 0.7071 * cEff.Tz; }
      else if (j === numS - 1) { ny += 0.7071 * cEff.Ty; nz += 0.7071 * cEff.Tz; }

      const nLen = Math.sqrt(nx*nx + ny*ny + nz*nz);
      if (nLen > 1e-6) { nx /= nLen; ny /= nLen; nz /= nLen; }

      const vIdx = positions.length / 3;
      positions.push(px, py, pz);
      normals.push(nx, ny, nz);
      uvs.push((px + HALF_WIDTH) / WIDTH, sEff / L_TOTAL);
      row.push(vIdx);
    }
    innerGrid.push(row);
  }

  // Inner surface quads (winding reversed so normal faces outward)
  for (let j = 0; j < numS - 1; j++) {
    for (let i = 0; i < numX - 1; i++) {
      const v00 = innerGrid[j][i];
      const v10 = innerGrid[j][i+1];
      const v11 = innerGrid[j+1][i+1];
      const v01 = innerGrid[j+1][i];
      addQuad(v00, v01, v11, v10);
    }
  }

  // Connect edges between outerGrid and innerGrid:
  // 1. Left side wall (i = 0, for all j in 0..numS-1)
  for (let j = 0; j < numS - 1; j++) {
    const out0 = outerGrid[j][0];
    const out1 = outerGrid[j+1][0];
    const in0 = innerGrid[j][0];
    const in1 = innerGrid[j+1][0];
    addQuad(out0, out1, in1, in0);
  }

  // 2. Right side wall (i = numX - 1, for all j in 0..numS-1)
  for (let j = 0; j < numS - 1; j++) {
    const out0 = outerGrid[j][numX - 1];
    const out1 = outerGrid[j+1][numX - 1];
    const in0 = innerGrid[j][numX - 1];
    const in1 = innerGrid[j+1][numX - 1];
    addQuad(out0, in0, in1, out1);
  }

  // 3. Base rear wall (j = 0, for all i in 0..numX-1)
  for (let i = 0; i < numX - 1; i++) {
    const out0 = outerGrid[0][i];
    const out1 = outerGrid[0][i+1];
    const in0 = innerGrid[0][i];
    const in1 = innerGrid[0][i+1];
    addQuad(out0, in0, in1, out1);
  }

  // 4. Upright top wall (j = numS - 1, for all i in 0..numX-1)
  for (let i = 0; i < numX - 1; i++) {
    const out0 = outerGrid[numS - 1][i];
    const out1 = outerGrid[numS - 1][i+1];
    const in0 = innerGrid[numS - 1][i];
    const in1 = innerGrid[numS - 1][i+1];
    addQuad(out0, out1, in1, in0);
  }

  console.log(`SuporteAcrilicoL built: ${positions.length / 3} vertices, ${indices.length / 3} triangles.`);
  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

// 4. Build Mesh 1: ArteGoogleFace (Original graphic art placed flush on front vertical face)
function buildArtMesh() {
  // Original width X: [-0.49, +0.49]
  // Y ranges from 0.0738 to 1.5094 (or 1.530)
  // Normal is [0, NY_PLANE, NZ_PLANE]
  // Plane equation: y*NY_PLANE + z*NZ_PLANE = TARGET_D
  // Z = (TARGET_D - y * NY_PLANE) / NZ_PLANE
  // Micrometric outward offset of 0.0004 to eliminate any z-fighting with the acrylic surface
  const artD = TARGET_D + 0.0004;

  const yStrips = [0.0738, 0.3031, 1.2801, 1.5300];
  const uvYStrips = [0.995, 0.960, 0.040, 0.038]; // 0.038 removes scan border and gives pure Google blue header

  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let s = 0; s < yStrips.length; s++) {
    const y = yStrips[s];
    const z = (artD - y * NY_PLANE) / NZ_PLANE;
    const uvY = uvYStrips[s];

    // Left vertex
    positions.push(-0.49, y, z);
    normals.push(0, NY_PLANE, NZ_PLANE);
    uvs.push(0.0, uvY);

    // Right vertex
    positions.push(0.49, y, z);
    normals.push(0, NY_PLANE, NZ_PLANE);
    uvs.push(1.0, uvY);
  }

  // Quad indices: 3 strips
  for (let s = 0; s < 3; s++) {
    const v0 = s * 2;
    const v1 = s * 2 + 1;
    const v2 = (s + 1) * 2;
    const v3 = (s + 1) * 2 + 1;
    indices.push(v0, v1, v3, v0, v3, v2);
  }

  console.log(`ArteGoogleFace built: ${positions.length / 3} vertices, ${indices.length / 3} triangles.`);
  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

// 5. Build Mesh 2: VersoCartao (Clean opaque white backing layer behind the art)
function buildVersoMesh() {
  // Sits immediately behind the art (e.g. artD - 0.0006)
  const versoD = TARGET_D - 0.0006;
  const y0 = 0.0738;
  const z0 = (versoD - y0 * NY_PLANE) / NZ_PLANE;
  const y1 = 1.5300;
  const z1 = (versoD - y1 * NY_PLANE) / NZ_PLANE;

  // Normal points backwards: [0, -NY_PLANE, -NZ_PLANE]
  const NyBack = -NY_PLANE;
  const NzBack = -NZ_PLANE;

  const positions = new Float32Array([
    -0.49, y0, z0,
     0.49, y0, z0,
     0.49, y1, z1,
    -0.49, y1, z1
  ]);

  const normals = new Float32Array([
    0, NyBack, NzBack,
    0, NyBack, NzBack,
    0, NyBack, NzBack,
    0, NyBack, NzBack
  ]);

  const uvs = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1
  ]);

  const indices = new Uint16Array([
    0, 2, 1,
    0, 3, 2
  ]);

  console.log(`VersoCartao built: ${positions.length / 3} vertices, ${indices.length / 3} triangles.`);
  return { positions, normals, uvs, indices };
}

// 6. Assemble into binary GLB
const acrylicMesh = buildAcrylicSolid();
const artMesh = buildArtMesh();
const versoMesh = buildVersoMesh();

// Build binary buffers and bufferViews
// Alignment helper
function align4(buf) {
  const rem = buf.length % 4;
  if (rem === 0) return buf;
  const pad = 4 - rem;
  return Buffer.concat([buf, Buffer.alloc(pad, 0)]);
}

// Binary chunk layout
const binBuffers = [];
const bufferViews = [];
const accessors = [];

function addAccessor(typedArray, type, componentType, target, minMax = true) {
  const byteOffset = binBuffers.reduce((sum, b) => sum + b.length, 0);
  const rawBuf = Buffer.from(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
  const paddedBuf = align4(rawBuf);
  binBuffers.push(paddedBuf);

  const bvIdx = bufferViews.length;
  bufferViews.push({
    buffer: 0,
    byteOffset,
    byteLength: typedArray.byteLength,
    target
  });

  const count = typedArray.length / (type === 'VEC3' ? 3 : type === 'VEC2' ? 2 : 1);
  const accessor = {
    bufferView: bvIdx,
    componentType,
    count,
    type
  };

  if (minMax) {
    if (type === 'VEC3') {
      let minX = 1e9, minY = 1e9, minZ = 1e9;
      let maxX = -1e9, maxY = -1e9, maxZ = -1e9;
      for (let i = 0; i < typedArray.length; i += 3) {
        const x = typedArray[i], y = typedArray[i+1], z = typedArray[i+2];
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
        if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
      }
      accessor.min = [minX, minY, minZ];
      accessor.max = [maxX, maxY, maxZ];
    } else if (type === 'VEC2') {
      let minU = 1e9, minV = 1e9, maxU = -1e9, maxV = -1e9;
      for (let i = 0; i < typedArray.length; i += 2) {
        const u = typedArray[i], v = typedArray[i+1];
        if (u < minU) minU = u; if (u > maxU) maxU = u;
        if (v < minV) minV = v; if (v > maxV) maxV = v;
      }
      accessor.min = [minU, minV];
      accessor.max = [maxU, maxV];
    } else if (type === 'SCALAR') {
      let minVal = 1e9, maxVal = -1e9;
      for (let i = 0; i < typedArray.length; i++) {
        const val = typedArray[i];
        if (val < minVal) minVal = val;
        if (val > maxVal) maxVal = val;
      }
      accessor.min = [minVal];
      accessor.max = [maxVal];
    }
  }

  const accIdx = accessors.length;
  accessors.push(accessor);
  return accIdx;
}

// Acrylic attributes
const acrylicPosAcc = addAccessor(acrylicMesh.positions, 'VEC3', 5126, 34962);
const acrylicNrmAcc = addAccessor(acrylicMesh.normals, 'VEC3', 5126, 34962);
const acrylicUvAcc = addAccessor(acrylicMesh.uvs, 'VEC2', 5126, 34962);
const acrylicIndAcc = addAccessor(acrylicMesh.indices, 'SCALAR', 5123, 34963);

// Art attributes
const artPosAcc = addAccessor(artMesh.positions, 'VEC3', 5126, 34962);
const artNrmAcc = addAccessor(artMesh.normals, 'VEC3', 5126, 34962);
const artUvAcc = addAccessor(artMesh.uvs, 'VEC2', 5126, 34962);
const artIndAcc = addAccessor(artMesh.indices, 'SCALAR', 5123, 34963);

// Verso attributes
const versoPosAcc = addAccessor(versoMesh.positions, 'VEC3', 5126, 34962);
const versoNrmAcc = addAccessor(versoMesh.normals, 'VEC3', 5126, 34962);
const versoUvAcc = addAccessor(versoMesh.uvs, 'VEC2', 5126, 34962);
const versoIndAcc = addAccessor(versoMesh.indices, 'SCALAR', 5123, 34963);

// Add image bufferView (no target attribute for image bufferViews in GLTF)
const imgByteOffset = binBuffers.reduce((sum, b) => sum + b.length, 0);
const imgPadded = align4(jpegBuffer);
binBuffers.push(imgPadded);
const imgBvIdx = bufferViews.length;
bufferViews.push({
  buffer: 0,
  byteOffset: imgByteOffset,
  byteLength: jpegBuffer.length
});

const totalBinLength = binBuffers.reduce((sum, b) => sum + b.length, 0);
const fullBinBuffer = Buffer.concat(binBuffers);

// Complete GLTF JSON
const gltfJson = {
  asset: {
    version: "2.0",
    generator: "Inova 3D Plaque Generator v3.0 (Continuous Seamless Acrylic L-Bend)"
  },
  scene: 0,
  scenes: [
    {
      name: "CenaPrincipal",
      nodes: [0]
    }
  ],
  nodes: [
    {
      name: "PlaquinhaGoogleLStand",
      children: [1, 2, 3]
    },
    {
      name: "NodeSuporteAcrilico",
      mesh: 0
    },
    {
      name: "NodeArteGoogle",
      mesh: 1
    },
    {
      name: "NodeVersoCartao",
      mesh: 2
    }
  ],
  meshes: [
    {
      name: "SuporteAcrilicoL",
      primitives: [
        {
          attributes: {
            POSITION: acrylicPosAcc,
            NORMAL: acrylicNrmAcc,
            TEXCOORD_0: acrylicUvAcc
          },
          indices: acrylicIndAcc,
          mode: 4,
          material: 0
        }
      ]
    },
    {
      name: "ArteGoogleFace",
      primitives: [
        {
          attributes: {
            POSITION: artPosAcc,
            NORMAL: artNrmAcc,
            TEXCOORD_0: artUvAcc
          },
          indices: artIndAcc,
          mode: 4,
          material: 1
        }
      ]
    },
    {
      name: "VersoCartao",
      primitives: [
        {
          attributes: {
            POSITION: versoPosAcc,
            NORMAL: versoNrmAcc,
            TEXCOORD_0: versoUvAcc
          },
          indices: versoIndAcc,
          mode: 4,
          material: 2
        }
      ]
    }
  ],
  materials: [
    {
      name: "AcrilicoTransparente",
      pbrMetallicRoughness: {
        baseColorFactor: [0.92, 0.96, 1.0, 0.22],
        roughnessFactor: 0.04,
        metallicFactor: 0.06
      },
      alphaMode: "BLEND",
      doubleSided: false
    },
    {
      name: "ArteGoogleAvaliacao",
      pbrMetallicRoughness: {
        baseColorTexture: {
          index: 0
        },
        roughnessFactor: 0.08,
        metallicFactor: 0.0
      },
      doubleSided: false
    },
    {
      name: "VersoCartaoBranco",
      pbrMetallicRoughness: {
        baseColorFactor: [0.98, 0.98, 0.99, 1.0],
        roughnessFactor: 0.30,
        metallicFactor: 0.0
      },
      doubleSided: false
    }
  ],
  textures: [
    {
      name: "TexturaGoogleAvaliacao",
      sampler: 0,
      source: 0
    }
  ],
  images: [
    {
      name: "padrao-google",
      mimeType: "image/jpeg",
      bufferView: imgBvIdx
    }
  ],
  samplers: [
    {
      magFilter: 9729,
      minFilter: 9987,
      wrapS: 33071,
      wrapT: 33071
    }
  ],
  accessors,
  bufferViews,
  buffers: [
    {
      byteLength: totalBinLength
    }
  ]
};

// GLB Packing
const jsonString = JSON.stringify(gltfJson);
const jsonBuffer = Buffer.from(jsonString, 'utf8');
const jsonPadded = align4(jsonBuffer);
// Pad JSON with space characters (0x20)
if (jsonPadded.length > jsonBuffer.length) {
  for (let i = jsonBuffer.length; i < jsonPadded.length; i++) {
    jsonPadded[i] = 0x20;
  }
}

const totalGlbLength = 12 + 8 + jsonPadded.length + 8 + fullBinBuffer.length;
const glb = Buffer.alloc(totalGlbLength);

// Header
glb.writeUInt32LE(0x46546C67, 0); // 'glTF'
glb.writeUInt32LE(2, 4);          // version 2
glb.writeUInt32LE(totalGlbLength, 8);

// Chunk 0: JSON
glb.writeUInt32LE(jsonPadded.length, 12);
glb.writeUInt32LE(0x4E4F534A, 16); // 'JSON'
jsonPadded.copy(glb, 20);

// Chunk 1: BIN
const binHeaderOffset = 20 + jsonPadded.length;
glb.writeUInt32LE(fullBinBuffer.length, binHeaderOffset);
glb.writeUInt32LE(0x004E4942, binHeaderOffset + 4); // 'BIN\0'
fullBinBuffer.copy(glb, binHeaderOffset + 8);

const outputPath = 'public/models/placa-google-otimizada.glb';
fs.writeFileSync(outputPath, glb);
console.log(`Optimized GLB successfully written to ${outputPath} (${glb.length} bytes)!`);
