import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Loader2, RotateCcw } from 'lucide-react';

export const HeroPlaque3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const defaultCameraPos = useRef(new THREE.Vector3(0, 0.2, 2.2));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 480;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.copy(defaultCameraPos.current);

    // 3. High-Performance WebGL Renderer with Alpha (Transparent for seamless #0A0F2E integration)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent background
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping; // Khronos PBR Neutral tone mapping: preserva fidelidade absoluta do azul Google, estrelas e logo
    renderer.toneMappingExposure = 1.0;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.display = 'block';

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Environment Map for realistic acrylic specular reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();
    roomEnv.dispose();

    // 5. OrbitControls with smooth damping and clamped polar angles
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false; // Never capture page scroll gestures
    controls.enablePan = false;
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 1.6; // Elegant continuous 360° rotation
    // Clamping to keep the plaque elegantly in view
    controls.minPolarAngle = Math.PI / 3.6; // ~50°
    controls.maxPolarAngle = Math.PI / 1.72; // ~104°

    // 6. Calibrated Studio Lighting (fidelidade cromática máxima e reflexos físicos no acrílico)
    // Ambient Light: iluminação neutra e balanceada, preservando pretos puros e azul Google uniforme
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.48);
    scene.add(ambientLight);

    // Key Light: luz direcional frontal-superior destacando a impressão gráfica sem lavar cores
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
    keyLight.position.set(2.2, 3.8, 4.2);
    scene.add(keyLight);

    // Fill Light: preenchimento suave com leve matiz frio
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.60);
    fillLight.position.set(-2.8, 1.8, 3.2);
    scene.add(fillLight);

    // Rim Light 1: Ciano Inova oficial acentuando bordas biseladas e quinas do acrílico cristal
    const rimCyan = new THREE.DirectionalLight(0x00c2ff, 2.8);
    rimCyan.position.set(4.0, 2.6, -3.2);
    scene.add(rimCyan);

    // Rim Light 2: Roxo Inova refinado realçando o chanfro esquerdo e profundidade
    const rimPurple = new THREE.DirectionalLight(0x8b5cf6, 2.4);
    rimPurple.position.set(-4.0, 2.6, -3.2);
    scene.add(rimPurple);

    // Top highlight: ponto de luz superior para realçar o bisel superior do acrílico
    const topLight = new THREE.PointLight(0xffffff, 1.1, 8);
    topLight.position.set(0, 3.6, 1.2);
    scene.add(topLight);

    // Base Glow Light: iluminação sutil focada na base horizontal em L do acrílico
    const baseGlowLight = new THREE.PointLight(0x06b6d4, 1.3, 3.5);
    baseGlowLight.position.set(0, -0.45, 0.15);
    scene.add(baseGlowLight);

    // 7. 3D WebGL ground contact projection plane /* taste-skill-ignore */
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 256;
    groundCanvas.height = 256;
    const gCtx = groundCanvas.getContext('2d');
    if (gCtx) {
      const grad = gCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
      grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.15)'); // Dispersão ciano sutil
      grad.addColorStop(0.65, 'rgba(0, 0, 0, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      gCtx.fillStyle = grad;
      gCtx.fillRect(0, 0, 256, 256);
    }
    const groundTexture = new THREE.CanvasTexture(groundCanvas);
    groundTexture.needsUpdate = true;

    const groundGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const groundMat = new THREE.MeshBasicMaterial({
      map: groundTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.7;
    scene.add(groundMesh);

    // 8. Model container group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 9. Authentic GLTF Loader loading the real GLB model
    const loader = new GLTFLoader();
    let loadedScene: THREE.Object3D | null = null;
    let animationFrameId: number;
    const clock = new THREE.Clock();

    loader.load(
      '/models/placa-google-otimizada.glb',
      (gltf) => {
        loadedScene = gltf.scene;

        // Materiais PBR e propriedades físicas do acrílico cristal e arte original
        loadedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;

            if (mat) {
              const matName = (mat.name || '').toLowerCase();
              const meshName = (mesh.name || '').toLowerCase();

              // 1. Arte Gráfica Original: Material "ArteGoogleAvaliacao" / Mesh "ArteGoogleFace"
              // Fixada na face frontal externa do acrílico com fidelidade total de cores e azul puro
              if (matName.includes('artegoogle') || meshName.includes('artegoogle')) {
                mesh.renderOrder = 2; // Renderiza à frente: cores autênticas e vivas
                mat.transparent = false;
                mat.opacity = 1.0;
                mat.depthWrite = true;
                mat.depthTest = true;
                mat.roughness = 0.05; // Impressão UV lisa de alta definição: pretos profundos e azul intenso
                mat.metalness = 0.0;
                mat.envMapIntensity = 0.18; // Reflexo de estúdio sutil sem desbotar o azul
                mat.side = THREE.FrontSide;
                mat.polygonOffset = true;
                mat.polygonOffsetFactor = -1.0;
                mat.polygonOffsetUnits = -4.0; // Elimina qualquer conflito coplanar com o acrílico

                if (mat.map) {
                  mat.map.colorSpace = THREE.SRGBColorSpace;
                  mat.map.anisotropy = 16;
                  mat.map.generateMipmaps = true;
                  mat.map.minFilter = THREE.LinearMipmapLinearFilter;
                  mat.map.magFilter = THREE.LinearFilter;
                  mat.map.needsUpdate = true;
                }
              }

              // 2. Fundo Branco da Arte Impressa: Material "VersoCartaoBranco" / Mesh "VersoCartao"
              // Alinhado imediatamente atrás da arte na face frontal (base branca da impressão UV)
              else if (matName.includes('versocartao') || meshName.includes('versocartao')) {
                mesh.renderOrder = 1;
                mat.transparent = false;
                mat.opacity = 1.0;
                mat.depthWrite = true;
                mat.depthTest = true;
                mat.roughness = 0.35;
                mat.metalness = 0.0;
                mat.side = THREE.FrontSide;
                mat.polygonOffset = true;
                mat.polygonOffsetFactor = 1.0;
                mat.polygonOffsetUnits = 2.0;
              }

              // 3. Suporte de Acrílico Cristal Contínuo: Material "AcrilicoTransparente" / Mesh "SuporteAcrilicoL"
              // Peça única e sólida dobrada termicamente em L, sem emendas, junções aparentes ou pés artificiais
              else if (matName.includes('acrilico') || meshName.includes('suporteacrilico')) {
                mesh.renderOrder = 0;
                mat.transparent = true;
                mat.opacity = 0.22; // Acrílico cristal transparente límpido de alta refração
                mat.depthWrite = false;
                mat.roughness = 0.035; // Polimento cristal com alto brilho especular nas bordas chanfradas
                mat.metalness = 0.06;
                mat.color = new THREE.Color(0xf6fbff); // Pureza óptica com sutil toque frio
                mat.side = THREE.DoubleSide;
              }

              // Oculta qualquer elemento antigo de pés de silicone caso presente
              else if (matName.includes('pessilicone') || meshName.includes('pesapoio')) {
                mesh.visible = false;
              }
            }
          }
        });

        // Atualiza a matriz mundial de todos os nós após configuração dos materiais
        loadedScene.updateMatrixWorld(true);

        // Center model geometry for a balanced 360° spin along the central vertical axis
        const box = new THREE.Box3().setFromObject(loadedScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        loadedScene.position.x = -center.x;
        loadedScene.position.y = -center.y;
        loadedScene.position.z = -center.z;

        modelGroup.add(loadedScene);

        // Adjust ground contact projection height directly under the base
        const bottomY = -size.y / 2 - 0.09;
        groundMesh.position.y = bottomY;

        // Fit camera to object bounding box with optimal initial front-facing perspective
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.30;
        // Apresenta inicialmente a face frontal da plaquinha com leve ângulo heróico (14°)
        const initialX = Math.sin(THREE.MathUtils.degToRad(14)) * cameraZ;
        const initialZ = Math.cos(THREE.MathUtils.degToRad(14)) * cameraZ;
        defaultCameraPos.current.set(initialX, maxDim * 0.06, initialZ);
        camera.position.copy(defaultCameraPos.current);
        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.update();

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Erro ao carregar o modelo 3D:', err);
        setLoadError('Não foi possível carregar o modelo 3D.');
        setLoading(false);
      }
    );

    // 10. Animation Loop: 360° rotation + gentle floating
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Flutuação vertical suave no ar
      if (loadedScene && !prefersReducedMotion) {
        const floatOffset = Math.sin(elapsed * 1.6) * 0.048;
        modelGroup.position.y = floatOffset;

        // Projeção de contato no solo sincronizada com a suspensão no ar
        const groundScale = 1 + floatOffset * 1.4;
        groundMesh.scale.set(groundScale, groundScale, 1);
        groundMat.opacity = Math.max(0.45, 0.85 - floatOffset * 2.0);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 11. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 12. Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      controls.dispose();

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      groundTexture.dispose();
      groundGeo.dispose();
      groundMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[1/1] max-w-[500px] min-h-[260px] xs:min-h-[290px] sm:min-h-[380px] mx-auto flex flex-col items-center justify-center select-none overflow-visible">
      {/* 3D Canvas Mount Point com Fundo 100% Transparente suspenso no espaço */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: loading ? 0 : 1 }}
        aria-label="Plaquinha NFC Google em acrílico azul com base em L. Modelo 3D interativo com rotação de 360 graus."
        role="img"
      />

      {/* Indicador de carregamento minimalista */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 z-10">
          <Loader2 className="w-7 h-7 text-[#00C2FF] animate-spin" />
        </div>
      )}

      {/* Estado de erro */}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <p className="text-xs text-white/50">{loadError}</p>
        </div>
      )}

      {/* Dica de interação tátil no mobile */}
      {!loading && !loadError && (
        <div className="absolute -bottom-3 sm:bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0F2E]/90 border border-white/10 text-[11px] text-[#F7F8FC]/70 shadow-sm backdrop-blur-xs whitespace-nowrap">
            <RotateCcw className="w-3 h-3 text-[#00C2FF]" />
            <span>Gire a plaquinha 360°</span>
          </span>
        </div>
      )}
    </div>
  );
};

