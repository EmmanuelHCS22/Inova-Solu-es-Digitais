import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Rotate3D, Loader2, RotateCcw } from 'lucide-react';

export const HeroPlaque3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'none';
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
    controls.autoRotateSpeed = 2.2; // Smooth 360° continuous rotation
    // Clamping to keep the plaque elegantly in view
    controls.minPolarAngle = Math.PI / 3.6; // ~50°
    controls.maxPolarAngle = Math.PI / 1.72; // ~104°

    controls.addEventListener('start', () => setIsInteracting(true));
    controls.addEventListener('end', () => setIsInteracting(false));

    // 6. Cinematic Studio Lighting
    // Ambient fill: subtle cool tint
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.7);
    scene.add(ambientLight);

    // Key Light: crisp directional white light highlighting the front Google Review artwork
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3.5, 4.5, 5);
    scene.add(keyLight);

    // Fill Light: soft blue-white bounce from front-left
    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 1.2);
    fillLight.position.set(-3.5, 1.5, 3.5);
    scene.add(fillLight);

    // Rim Light 1: Cyan Inova branding accentuating rear-right acrylic edges
    const rimCyan = new THREE.DirectionalLight(0x06b6d4, 3.0);
    rimCyan.position.set(4.5, 3, -4);
    scene.add(rimCyan);

    // Rim Light 2: Purple Inova branding accentuating rear-left acrylic bevels
    const rimPurple = new THREE.DirectionalLight(0x8b5cf6, 3.2);
    rimPurple.position.set(-4.5, 3, -4);
    scene.add(rimPurple);

    // Top highlight point light for the upper acrylic bevel
    const topLight = new THREE.PointLight(0xffffff, 1.5, 8);
    topLight.position.set(0, 4, 1);
    scene.add(topLight);

    // 7. Ground Floating Shadow Plane (Soft dark radial shadow underneath)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
      grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.15)'); // Subtle cyan light dispersion
      grad.addColorStop(0.65, 'rgba(0, 0, 0, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.needsUpdate = true;

    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.7;
    scene.add(shadowMesh);

    // 8. Model container group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 9. Authentic GLTF Loader loading the real GLB model
    const loader = new GLTFLoader();
    let loadedScene: THREE.Object3D | null = null;
    let animationFrameId: number;
    const clock = new THREE.Clock();

    loader.load(
      '/models/placa-google-azul.glb',
      (gltf) => {
        loadedScene = gltf.scene;

        // Preserve geometry and materials while enhancing realistic physical acrylic reflection
        loadedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;

            if (mat) {
              // Printed graphic artwork (Google Review pattern)
              if (mat.map) {
                mat.map.colorSpace = THREE.SRGBColorSpace;
                mat.map.anisotropy = 16;
                mat.map.generateMipmaps = true;
                mat.map.needsUpdate = true;
                mesh.renderOrder = 0;
              }

              // Transparent crystal acrylic body & L-stand
              if (mat.transparent || mat.opacity < 1.0 || mat.name.toLowerCase().includes('acrilico')) {
                mesh.renderOrder = 1;
                mat.depthWrite = false;
                mat.roughness = 0.04; // Glossy reflective acrylic
                mat.metalness = 0.08;
                mat.transparent = true;
                mat.opacity = 0.92;
              }
            }
          }
        });

        // Center model geometry for a balanced 360° spin along the central vertical axis
        const box = new THREE.Box3().setFromObject(loadedScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        loadedScene.position.x = -center.x;
        loadedScene.position.y = -center.y;
        loadedScene.position.z = -center.z;

        modelGroup.add(loadedScene);

        // Adjust shadow plane height directly under the base of the L-stand
        const bottomY = -size.y / 2 - 0.09;
        shadowMesh.position.y = bottomY;

        // Fit camera to object bounding box with optimal viewing angle
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.32;
        defaultCameraPos.current.set(0, maxDim * 0.08, cameraZ);
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

        // Sombra de contato sincronizada com a suspensão no ar
        const shadowScale = 1 + floatOffset * 1.4;
        shadowMesh.scale.set(shadowScale, shadowScale, 1);
        shadowMat.opacity = Math.max(0.45, 0.85 - floatOffset * 2.0);
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

      shadowTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleResetAngle = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[1/1] max-w-[500px] mx-auto flex flex-col items-center justify-center select-none overflow-visible">
      {/* 3D Canvas Mount Point com Fundo 100% Transparente suspenso no espaço */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: loading ? 0 : 1 }}
        aria-label="Plaquinha NFC Google em acrílico azul com base em L. Modelo 3D interativo com rotação de 360 graus."
        role="img"
      />

      {/* Indicador de carregamento */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <Loader2 className="w-7 h-7 text-[#06B6D4] animate-spin" />
          <span className="text-xs font-mono tracking-widest uppercase text-white/60">
            Carregando modelo 3D...
          </span>
        </div>
      )}

      {/* Estado de erro */}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <p className="text-xs text-white/50 font-mono">{loadError}</p>
        </div>
      )}

      {/* Dica discreta e botão de reset — sem cards brancos, sem molduras */}
      {!loading && !loadError && (
        <div className="w-full flex items-center justify-between px-2 pt-2 text-[11px] font-mono text-white/45 tracking-wider">
          <div className="flex items-center gap-1.5">
            <Rotate3D className={`w-3.5 h-3.5 text-[#06B6D4] ${isInteracting ? 'animate-spin' : ''}`} />
            <span>Giro 360° interativo · Arraste para inspecionar</span>
          </div>

          <button
            type="button"
            onClick={handleResetAngle}
            title="Recentrar visão frontal"
            className="flex items-center gap-1 px-2 py-1 rounded text-white/50 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[#06B6D4]"
            aria-label="Recentrar ângulo da plaquinha"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="text-[10px]">Recentrar</span>
          </button>
        </div>
      )}
    </div>
  );
};

