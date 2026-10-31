#!/usr/bin/env python3
import struct
import json
import os
import math

def build_placa_glb(jpeg_path, output_path):
    with open(jpeg_path, 'rb') as f:
        jpeg_bytes = f.read()

    # Align JPEG bytes to 4-byte boundary
    pad_len = (4 - (len(jpeg_bytes) % 4)) % 4
    jpeg_padded = jpeg_bytes + b'\x00' * pad_len

    bin_data = bytearray()
    buffer_views = []
    accessors = []

    def add_buffer_data(data_bytes, target=None):
        offset = len(bin_data)
        bin_data.extend(data_bytes)
        # Pad to 4 bytes
        pad = (4 - (len(bin_data) % 4)) % 4
        bin_data.extend(b'\x00' * pad)

        bv = {
            "buffer": 0,
            "byteOffset": offset,
            "byteLength": len(data_bytes)
        }
        if target is not None:
            bv["target"] = target
        bv_idx = len(buffer_views)
        buffer_views.append(bv)
        return bv_idx

    def add_accessor(bv_idx, component_type, count, acc_type, min_val, max_val):
        acc = {
            "bufferView": bv_idx,
            "componentType": component_type,
            "count": count,
            "type": acc_type,
            "min": min_val,
            "max": max_val
        }
        acc_idx = len(accessors)
        accessors.append(acc)
        return acc_idx

    # Helper to create a Box geometry
    def make_box(dx, dy, dz, center_x=0, center_y=0, center_z=0, rot_x_rad=0, pivot_y=0, pivot_z=0):
        hx, hy, hz = dx / 2, dy / 2, dz / 2
        faces = [
            # Front (+Z)
            ((-hx, -hy,  hz), ( hx, -hy,  hz), ( hx,  hy,  hz), (-hx,  hy,  hz), ( 0,  0,  1)),
            # Back (-Z)
            (( hx, -hy, -hz), (-hx, -hy, -hz), (-hx,  hy, -hz), ( hx,  hy, -hz), ( 0,  0, -1)),
            # Top (+Y)
            ((-hx,  hy,  hz), ( hx,  hy,  hz), ( hx,  hy, -hz), (-hx,  hy, -hz), ( 0,  1,  0)),
            # Bottom (-Y)
            ((-hx, -hy, -hz), ( hx, -hy, -hz), ( hx, -hy,  hz), (-hx, -hy,  hz), ( 0, -1,  0)),
            # Right (+X)
            (( hx, -hy,  hz), ( hx, -hy, -hz), ( hx,  hy, -hz), ( hx,  hy,  hz), ( 1,  0,  0)),
            # Left (-X)
            ((-hx, -hy, -hz), (-hx, -hy,  hz), (-hx,  hy,  hz), (-hx,  hy, -hz), (-1,  0,  0)),
        ]

        cos_r = math.cos(rot_x_rad)
        sin_r = math.sin(rot_x_rad)

        positions = []
        normals = []
        uvs = []
        indices = []

        v_offset = 0
        for p0, p1, p2, p3, norm in faces:
            quad = [p0, p1, p2, p3]
            quad_uvs = [(0, 0), (1, 0), (1, 1), (0, 1)]
            for pt, (u, v) in zip(quad, quad_uvs):
                # Apply rotation around pivot
                lx = pt[0] + center_x
                ly = pt[1] + center_y - pivot_y
                lz = pt[2] + center_z - pivot_z

                rx = lx
                ry = ly * cos_r - lz * sin_r + pivot_y
                rz = ly * sin_r + lz * cos_r + pivot_z
                positions.append((rx, ry, rz))

                nrx = norm[0]
                nry = norm[1] * cos_r - norm[2] * sin_r
                nrz = norm[1] * sin_r + norm[2] * cos_r
                normals.append((nrx, nry, nrz))
                uvs.append((u, v))

            indices.extend([v_offset, v_offset + 1, v_offset + 2, v_offset, v_offset + 2, v_offset + 3])
            v_offset += 4

        return positions, normals, uvs, indices

    # 1. Base de Apoio (Flat horizontal acrylic sheet extending backwards on table)
    # 10.4 cm wide, 2.5 mm thick, 5.5 cm deep
    base_pos, base_norm, base_uv, base_idx = make_box(
        dx=1.04, dy=0.025, dz=0.55,
        center_x=0.0, center_y=0.0125, center_z=-0.25
    )

    # 2. Smooth curved thermoformed bend joint at the front (connecting base to vertical plate)
    bend_pos = []
    bend_norm = []
    bend_uv = []
    bend_idx = []
    num_bend_segs = 6
    w = 1.04
    hw = w / 2
    bend_radius = 0.035
    thickness = 0.025
    # angle from 0 (horizontal) to pi/2 + 4.5 degrees (vertical tilted)
    tilt_rad = math.radians(4.5)
    total_angle = math.pi / 2 + tilt_rad

    for s in range(num_bend_segs + 1):
        theta = (s / num_bend_segs) * total_angle
        # outer arc
        ro = bend_radius + thickness / 2
        yo = ro * math.sin(theta)
        zo = -ro * (1.0 - math.cos(theta)) + 0.02
        # inner arc
        ri = bend_radius - thickness / 2
        yi = ri * math.sin(theta)
        zi = -ri * (1.0 - math.cos(theta)) + 0.02

        bend_pos.extend([(-hw, yo, zo), (hw, yo, zo), (hw, yi, zi), (-hw, yi, zi)])
        ny = math.sin(theta)
        nz = math.cos(theta)
        bend_norm.extend([(0, ny, nz), (0, ny, nz), (0, -ny, -nz), (0, -ny, -nz)])
        bend_uv.extend([(0, 0), (1, 0), (1, 1), (0, 1)])

    for s in range(num_bend_segs):
        v = s * 4
        # outer surface
        bend_idx.extend([v, v + 1, v + 5, v, v + 5, v + 4])
        # inner surface
        bend_idx.extend([v + 3, v + 7, v + 6, v + 3, v + 6, v + 2])

    # 3. Vertical Acrylic Backing Plate (10.4 cm wide, 15.2 cm tall, 2.5 mm thick)
    # Centered along the vertical upright tilted back by 4.5 deg
    vert_h = 1.52
    pivot_y = 0.035
    pivot_z = 0.02
    vert_center_y = pivot_y + (vert_h / 2)
    vert_pos, vert_norm, vert_uv, vert_idx = make_box(
        dx=1.04, dy=vert_h, dz=thickness,
        center_x=0.0, center_y=vert_center_y, center_z=pivot_z,
        rot_x_rad=tilt_rad, pivot_y=pivot_y, pivot_z=pivot_z
    )

    # 4. Front Acrylic Shield Plate (Transparent sheet covering the art)
    # Offset forward by thickness + 0.006
    front_pos, front_norm, front_uv, front_idx = make_box(
        dx=1.02, dy=1.50, dz=0.015,
        center_x=0.0, center_y=vert_center_y, center_z=pivot_z + 0.022,
        rot_x_rad=tilt_rad, pivot_y=pivot_y, pivot_z=pivot_z
    )

    # Combine all clear acrylic components into one primary mesh
    acrylic_pos = base_pos + bend_pos
    acrylic_norm = base_norm + bend_norm
    acrylic_uv = base_uv + bend_uv
    acrylic_idx = base_idx + [i + len(base_pos) for i in bend_idx]

    offset_vert = len(acrylic_pos)
    acrylic_pos += vert_pos + front_pos
    acrylic_norm += vert_norm + front_norm
    acrylic_uv += vert_uv + front_uv
    acrylic_idx += [i + offset_vert for i in vert_idx]
    acrylic_idx += [i + offset_vert + len(vert_pos) for i in front_idx]

    # 5. Artwork Face Quad (Front face with Google Review artwork)
    # In standard 10x15 portrait ratio: width 0.98, height 1.48
    # Art quad sits at local Z = pivot_z + 0.0135 (between vertical acrylic back and front shield)
    art_w = 0.98
    art_hw = art_w / 2
    # 4 horizontal strips to preserve 1:1 circular Google logo and stars while seamlessly filling 10x15:
    # y ranges from -0.72 to +0.72 (height 1.44)
    # center 1:1 region: y from -0.49 to +0.49 (height 0.98, width 0.98 -> exact 1:1 aspect ratio!)
    # top region (y: +0.49 to +0.72): royal blue background with smooth gradient
    # bottom region (y: -0.72 to -0.49): pure white background
    y_strips = [-0.72, -0.49, 0.49, 0.72]
    # In glTF UV space: V=0 is TOP of image (blue), V=1 is BOTTOM of image (white)
    # Strip 3 (y=+0.72, top): V = 0.005 (deep blue top)
    # Strip 2 (y=+0.49, top of 1:1): V = 0.04 (top edge of Google art)
    # Strip 1 (y=-0.49, bottom of 1:1): V = 0.96 (bottom edge of QR/NFC art)
    # Strip 0 (y=-0.72, bottom): V = 0.995 (pure white bottom)
    v_strips = [0.995, 0.96, 0.04, 0.005]

    art_pos = []
    art_norm = []
    art_uv = []
    art_idx = []

    cos_t = math.cos(tilt_rad)
    sin_t = math.sin(tilt_rad)
    art_local_z = pivot_z + 0.0135

    for r in range(4):
        y_loc = y_strips[r]
        v_coord = v_strips[r]
        for x_loc, u_coord in [(-art_hw, 0.0), (art_hw, 1.0)]:
            # Rotate around pivot
            ly = vert_center_y + y_loc - pivot_y
            lz = art_local_z - pivot_z
            ry = ly * cos_t - lz * sin_t + pivot_y
            rz = ly * sin_t + lz * cos_t + pivot_z
            art_pos.append((x_loc, ry, rz))

            # Normal facing outwards toward camera (+Z)
            art_norm.append((0.0, -sin_t, cos_t))
            art_uv.append((u_coord, v_coord))

    for r in range(3):
        base_v = r * 2
        # Counter-clockwise triangles
        art_idx.extend([
            base_v, base_v + 1, base_v + 3,
            base_v, base_v + 3, base_v + 2
        ])

    # 6. Backing White Card (Rear face of the printed artwork)
    back_pos = []
    back_norm = []
    back_uv = []
    back_idx = [0, 2, 1, 0, 3, 2]
    back_local_z = pivot_z - 0.013
    for x_loc, y_loc in [(-art_hw, -0.72), (art_hw, -0.72), (art_hw, 0.72), (-art_hw, 0.72)]:
        ly = vert_center_y + y_loc - pivot_y
        lz = back_local_z - pivot_z
        ry = ly * cos_t - lz * sin_t + pivot_y
        rz = ly * sin_t + lz * cos_t + pivot_z
        back_pos.append((x_loc, ry, rz))
        back_norm.append((0.0, sin_t, -cos_t))
        back_uv.append((0.0, 0.0))

    # 7. 4 Non-Slip Clear Silicone Feet on Base bottom (under corners)
    feet_pos = []
    feet_norm = []
    feet_uv = []
    feet_idx = []
    feet_coords = [(-0.46, -0.48), (0.46, -0.48), (-0.46, -0.04), (0.46, -0.04)]
    for fx, fz in feet_coords:
        f_p, f_n, f_u, f_i = make_box(dx=0.065, dy=0.006, dz=0.065, center_x=fx, center_y=0.003, center_z=fz)
        offset = len(feet_pos)
        feet_pos.extend(f_p)
        feet_norm.extend(f_n)
        feet_uv.extend(f_u)
        feet_idx.extend([i + offset for i in f_i])

    # Serializer for a mesh primitive
    def serialize_primitive(positions, normals, uvs, indices):
        pos_bytes = bytearray()
        min_p = [float('inf')]*3
        max_p = [float('-inf')]*3
        for p in positions:
            for k in range(3):
                min_p[k] = min(min_p[k], p[k])
                max_p[k] = max(max_p[k], p[k])
            pos_bytes.extend(struct.pack('<fff', *p))
        bv_pos = add_buffer_data(pos_bytes, target=34962)
        acc_pos = add_accessor(bv_pos, 5126, len(positions), "VEC3", min_p, max_p)

        norm_bytes = bytearray()
        min_n = [float('inf')]*3
        max_n = [float('-inf')]*3
        for n in normals:
            for k in range(3):
                min_n[k] = min(min_n[k], n[k])
                max_n[k] = max(max_n[k], n[k])
            norm_bytes.extend(struct.pack('<fff', *n))
        bv_norm = add_buffer_data(norm_bytes, target=34962)
        acc_norm = add_accessor(bv_norm, 5126, len(normals), "VEC3", min_n, max_n)

        uv_bytes = bytearray()
        min_u = [float('inf')]*2
        max_u = [float('-inf')]*2
        for u in uvs:
            for k in range(2):
                min_u[k] = min(min_u[k], u[k])
                max_u[k] = max(max_u[k], u[k])
            uv_bytes.extend(struct.pack('<ff', *u))
        bv_uv = add_buffer_data(uv_bytes, target=34962)
        acc_uv = add_accessor(bv_uv, 5126, len(uvs), "VEC2", min_u, max_u)

        idx_bytes = bytearray()
        min_i = min(indices)
        max_i = max(indices)
        for i in indices:
            idx_bytes.extend(struct.pack('<H', i))
        bv_idx = add_buffer_data(idx_bytes, target=34963)
        acc_idx = add_accessor(bv_idx, 5123, len(indices), "SCALAR", [min_i], [max_i])

        return {
            "attributes": {
                "POSITION": acc_pos,
                "NORMAL": acc_norm,
                "TEXCOORD_0": acc_uv
            },
            "indices": acc_idx,
            "mode": 4
        }

    prim_acrylic = serialize_primitive(acrylic_pos, acrylic_norm, acrylic_uv, acrylic_idx)
    prim_acrylic["material"] = 0

    prim_art = serialize_primitive(art_pos, art_norm, art_uv, art_idx)
    prim_art["material"] = 1

    prim_back = serialize_primitive(back_pos, back_norm, back_uv, back_idx)
    prim_back["material"] = 2

    prim_feet = serialize_primitive(feet_pos, feet_norm, feet_uv, feet_idx)
    prim_feet["material"] = 3

    # Add embedded JPEG image to binary buffer
    img_bv_idx = add_buffer_data(jpeg_padded)

    materials = [
        # Material 0: Clear Acrylic Stand (L-stand crystal acrylic with subtle specular sheen)
        {
            "name": "AcrilicoTransparente",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.90, 0.95, 1.0, 0.28],
                "roughnessFactor": 0.05,
                "metallicFactor": 0.06
            },
            "alphaMode": "BLEND",
            "doubleSided": True
        },
        # Material 1: Google Review Artwork (Embedded texture)
        {
            "name": "ArteGoogleAvaliacao",
            "pbrMetallicRoughness": {
                "baseColorTexture": {
                    "index": 0
                },
                "roughnessFactor": 0.20,
                "metallicFactor": 0.02
            },
            "doubleSided": False
        },
        # Material 2: White Backing Card
        {
            "name": "VersoCartaoBranco",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.97, 0.97, 0.98, 1.0],
                "roughnessFactor": 0.35,
                "metallicFactor": 0.0
            },
            "doubleSided": True
        },
        # Material 3: Silicone Pads
        {
            "name": "PesSilicone",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.25, 0.25, 0.28, 0.8],
                "roughnessFactor": 0.6,
                "metallicFactor": 0.05
            },
            "alphaMode": "BLEND"
        }
    ]

    images = [
        {
            "name": "padrao-google",
            "mimeType": "image/jpeg",
            "bufferView": img_bv_idx
        }
    ]

    samplers = [
        {
            "magFilter": 9729, # LINEAR
            "minFilter": 9987, # LINEAR_MIPMAP_LINEAR
            "wrapS": 33071,   # CLAMP_TO_EDGE
            "wrapT": 33071    # CLAMP_TO_EDGE
        }
    ]

    textures = [
        {
            "name": "TexturaGoogleAvaliacao",
            "sampler": 0,
            "source": 0
        }
    ]

    meshes = [
        {"name": "SuporteAcrilicoL", "primitives": [prim_acrylic]},
        {"name": "ArteGoogleFace", "primitives": [prim_art]},
        {"name": "VersoCartao", "primitives": [prim_back]},
        {"name": "PesApoioSilicone", "primitives": [prim_feet]}
    ]

    nodes = [
        {
            "name": "PlaquinhaGoogleLStand",
            "children": [1, 2, 3, 4]
        },
        {"name": "NodeSuporteAcrilico", "mesh": 0},
        {"name": "NodeArteGoogle", "mesh": 1},
        {"name": "NodeVersoCartao", "mesh": 2},
        {"name": "NodePesSilicone", "mesh": 3}
    ]

    scenes = [
        {
            "name": "CenaPrincipal",
            "nodes": [0]
        }
    ]

    gltf_dict = {
        "asset": {
            "version": "2.0",
            "generator": "Inova 3D Plaque Generator v2.5"
        },
        "scene": 0,
        "scenes": scenes,
        "nodes": nodes,
        "meshes": meshes,
        "materials": materials,
        "textures": textures,
        "images": images,
        "samplers": samplers,
        "accessors": accessors,
        "bufferViews": buffer_views,
        "buffers": [
            {
                "byteLength": len(bin_data)
            }
        ]
    }

    json_str = json.dumps(gltf_dict, separators=(',', ':'))
    json_bytes = json_str.encode('utf-8')
    json_pad = (4 - (len(json_bytes) % 4)) % 4
    json_padded = json_bytes + b' ' * json_pad

    total_length = 12 + 8 + len(json_padded) + 8 + len(bin_data)

    glb_bytes = bytearray()
    glb_bytes.extend(struct.pack('<III', 0x46546C67, 2, total_length))
    glb_bytes.extend(struct.pack('<II', len(json_padded), 0x4E4F534A))
    glb_bytes.extend(json_padded)
    glb_bytes.extend(struct.pack('<II', len(bin_data), 0x004E4942))
    glb_bytes.extend(bin_data)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'wb') as f:
        f.write(glb_bytes)

    print(f"Successfully created {output_path} ({len(glb_bytes)} bytes)")

if __name__ == "__main__":
    build_placa_glb("public/assets/inova/padrao-google.jpeg", "public/models/placa-google-azul.glb")
