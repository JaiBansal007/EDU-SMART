'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { motion } from 'framer-motion';

type ModelType = 'dna' | 'brain' | 'cell';

interface ModelConfig {
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  animationSpeed: number;
  hoverAnimationSpeed: number;
}

const modelConfigs: Record<ModelType, ModelConfig> = {
  dna: {
    scale: 2,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    animationSpeed: 0.005,
    hoverAnimationSpeed: 0.02,
  },
  brain: {
    scale: 2,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    animationSpeed: 0.003,
    hoverAnimationSpeed: 0.015,
  },
  cell: {
    scale: 2,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    animationSpeed: 0.004,
    hoverAnimationSpeed: 0.018,
  },
};

export default function ThreeDVisualization({ modelType = 'dna' }: { modelType?: ModelType }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoize materials to prevent unnecessary recreations
  const materials = useMemo(() => ({
    dna: {
      backbone: new THREE.MeshPhongMaterial({
        color: 0x4444ff,
        shininess: 100,
        specular: 0x444444,
        emissive: 0x2222ff,
        emissiveIntensity: 0.2,
      }),
      base: (index: number) => new THREE.MeshPhongMaterial({
        color: index % 2 === 0 ? 0xff4444 : 0x44ff44,
        shininess: 100,
        specular: 0x444444,
        emissive: index % 2 === 0 ? 0xff0000 : 0x00ff00,
        emissiveIntensity: 0.2,
      }),
    },
    brain: {
      main: new THREE.MeshPhongMaterial({
        color: 0xffcccc,
        shininess: 30,
        specular: 0x444444,
        emissive: 0x442222,
        emissiveIntensity: 0.2,
      }),
      sulcus: new THREE.MeshPhongMaterial({
        color: 0xcc9999,
        shininess: 30,
        specular: 0x444444,
      }),
    },
    cell: {
      membrane: new THREE.MeshPhongMaterial({
        color: 0x88cc88,
        transparent: true,
        opacity: 0.3,
        shininess: 100,
        specular: 0x444444,
      }),
      nucleus: new THREE.MeshPhongMaterial({
        color: 0x4444ff,
        shininess: 100,
        specular: 0x444444,
        emissive: 0x2222ff,
        emissiveIntensity: 0.2,
      }),
      chloroplast: new THREE.MeshPhongMaterial({
        color: 0x44ff44,
        shininess: 100,
        specular: 0x444444,
        emissive: 0x22ff22,
        emissiveIntensity: 0.2,
      }),
      vacuole: new THREE.MeshPhongMaterial({
        color: 0x88aaff,
        transparent: true,
        opacity: 0.6,
        shininess: 100,
        specular: 0x444444,
      }),
    },
  }), []);

  useEffect(() => {
    if (!containerRef.current || isInitialized) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let model: THREE.Object3D;
    let animationFrameId: number;
    let clock: THREE.Clock;

    try {
      console.log('Initializing 3D scene...');
      
      // Scene setup with improved performance
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      scene.fog = new THREE.Fog(0xf0f0f0, 10, 50);

      console.log('Setting up camera...');
      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      console.log('Creating renderer...');
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      containerRef.current.appendChild(renderer.domElement);

      console.log('Setting up lights...');
      // Enhanced lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      console.log('Setting up controls...');
      // Improved controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.7;
      controls.zoomSpeed = 1.2;
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.enablePan = true;
      controls.autoRotate = !isHovered;
      controls.autoRotateSpeed = 1.0;

      // Initialize clock for smooth animations
      clock = new THREE.Clock();

      console.log('Creating model...');
      const createModel = () => {
        const config = modelConfigs[modelType];
        let model: THREE.Object3D;

        switch (modelType) {
          case 'dna':
            model = createDNA();
            break;
          case 'brain':
            model = createBrain();
            break;
          case 'cell':
            model = createCell();
            break;
          default:
            model = new THREE.Group();
        }

        model.scale.set(config.scale, config.scale, config.scale);
        model.position.set(...config.position);
        model.rotation.set(...config.rotation);
        
        scene.add(model);
        setLoading(false);
        setIsInitialized(true);
        return model;
      };

      const createDNA = () => {
        const group = new THREE.Group();
        
        const createBasePair = (index: number) => {
          const baseGroup = new THREE.Group();
          
          // Create sugar-phosphate backbone with improved geometry
          const backboneGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32);
          const leftBackbone = new THREE.Mesh(backboneGeometry, materials.dna.backbone);
          const rightBackbone = new THREE.Mesh(backboneGeometry, materials.dna.backbone);
          
          leftBackbone.position.set(-0.2, 0, 0);
          rightBackbone.position.set(0.2, 0, 0);
          
          baseGroup.add(leftBackbone);
          baseGroup.add(rightBackbone);

          // Create base pairs with improved geometry
          const baseGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
          const leftBase = new THREE.Mesh(baseGeometry, materials.dna.base(index));
          const rightBase = new THREE.Mesh(baseGeometry, materials.dna.base(index));
          
          leftBase.position.set(-0.1, 0, 0);
          rightBase.position.set(0.1, 0, 0);
          
          baseGroup.add(leftBase);
          baseGroup.add(rightBase);

          // Position and rotate the base pair
          baseGroup.position.y = index * 0.3;
          baseGroup.rotation.z = Math.sin(index * 0.5) * 0.3;

          return baseGroup;
        };

        // Create multiple base pairs with improved distribution
        for (let i = 0; i < 20; i++) {
          group.add(createBasePair(i));
        }

        return group;
      };

      const createBrain = () => {
        const group = new THREE.Group();
        
        const createHemisphere = (side: number) => {
          const hemisphereGroup = new THREE.Group();
          
          // Main hemisphere with improved geometry
          const hemisphereGeometry = new THREE.SphereGeometry(1, 64, 64);
          const hemisphere = new THREE.Mesh(hemisphereGeometry, materials.brain.main);
          hemisphere.scale.set(1, 1.2, 0.8);
          hemisphere.position.x = side * 0.5;
          hemisphereGroup.add(hemisphere);

          // Add sulci with improved distribution
          const createSulcus = (radius: number, position: [number, number, number]) => {
            const sulcusGeometry = new THREE.TorusGeometry(radius, 0.1, 16, 32, Math.PI);
            const sulcus = new THREE.Mesh(sulcusGeometry, materials.brain.sulcus);
            sulcus.position.set(...position);
            sulcus.rotation.x = Math.PI / 2;
            return sulcus;
          };

          // Add multiple sulci with improved distribution
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI;
            const radius = 0.8 - i * 0.1;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            hemisphereGroup.add(createSulcus(radius, [x, y, 0]));
          }

          return hemisphereGroup;
        };

        // Add both hemispheres
        group.add(createHemisphere(-1));
        group.add(createHemisphere(1));

        // Add cerebellum with improved geometry
        const cerebellumGeometry = new THREE.SphereGeometry(0.6, 32, 32);
        const cerebellum = new THREE.Mesh(cerebellumGeometry, materials.brain.main);
        cerebellum.position.y = -0.8;
        cerebellum.scale.set(1.2, 0.6, 0.8);
        group.add(cerebellum);

        return group;
      };

      const createCell = () => {
        const group = new THREE.Group();
        
        // Cell membrane with improved geometry
        const membraneGeometry = new THREE.SphereGeometry(1, 64, 64);
        const membrane = new THREE.Mesh(membraneGeometry, materials.cell.membrane);
        group.add(membrane);

        // Nucleus with improved geometry
        const nucleusGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const nucleus = new THREE.Mesh(nucleusGeometry, materials.cell.nucleus);
        nucleus.position.set(0.2, 0.2, 0);
        group.add(nucleus);

        // Chloroplasts with improved distribution
        const createChloroplast = (position: [number, number, number]) => {
          const chloroplastGeometry = new THREE.SphereGeometry(0.15, 32, 32);
          const chloroplast = new THREE.Mesh(chloroplastGeometry, materials.cell.chloroplast);
          chloroplast.position.set(...position);
          return chloroplast;
        };

        const chloroplastPositions: [number, number, number][] = [
          [-0.5, 0.3, 0.4],
          [0.3, -0.4, 0.5],
          [-0.4, -0.3, -0.4],
          [0.5, 0.4, -0.3]
        ];

        chloroplastPositions.forEach(pos => {
          group.add(createChloroplast(pos));
        });

        // Vacuole with improved geometry
        const vacuoleGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const vacuole = new THREE.Mesh(vacuoleGeometry, materials.cell.vacuole);
        vacuole.position.set(-0.3, -0.2, 0.3);
        group.add(vacuole);

        return group;
      };

      model = createModel();
      console.log('Model created successfully');

      // Enhanced animation loop with improved performance
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();
        
        if (model) {
          const config = modelConfigs[modelType];
          const currentSpeed = isHovered ? config.hoverAnimationSpeed : config.animationSpeed;
          
          // Base rotation
          model.rotation.y += currentSpeed;
          
          // Model-specific animations with improved smoothness
          if (modelType === 'dna') {
            model.children.forEach((basePair, index) => {
              basePair.rotation.z = Math.sin(time + index * 0.2) * 0.3;
              basePair.position.y = index * 0.3 + Math.sin(time * 2 + index * 0.1) * 0.1;
            });
          } else if (modelType === 'brain') {
            const pulse = Math.sin(time * 2) * 0.05;
            model.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
            
            model.children.forEach((hemisphere, index) => {
              hemisphere.children.forEach((sulcus, i) => {
                if (i > 0) {
                  sulcus.rotation.z = Math.sin(time + i * 0.5) * 0.1;
                }
              });
            });
          } else if (modelType === 'cell') {
            // Nucleus movement
            model.children[1].position.x = 0.2 + Math.sin(time) * 0.1;
            model.children[1].position.y = 0.2 + Math.cos(time) * 0.1;
            
            // Chloroplast movement
            model.children.slice(2, 6).forEach((chloroplast, index) => {
              const angle = time + index * Math.PI / 2;
              chloroplast.position.x = Math.cos(angle) * 0.5;
              chloroplast.position.y = Math.sin(angle) * 0.5;
              chloroplast.rotation.z = time * 2;
            });
            
            // Vacuole movement
            model.children[6].position.x = -0.3 + Math.sin(time * 0.5) * 0.1;
            model.children[6].position.z = 0.3 + Math.cos(time * 0.5) * 0.1;
          }
        }
        
        controls.update();
        renderer.render(scene, camera);
      };

      console.log('Starting animation loop...');
      animate();

      // Improved resize handler with debouncing
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        if (!containerRef.current) return;
        
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const width = containerRef.current!.clientWidth;
          const height = containerRef.current!.clientHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }, 250);
      };

      window.addEventListener('resize', handleResize);

      // Enhanced cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        
        scene.clear();
        renderer.dispose();
        controls.dispose();
        
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        // Dispose of all geometries and materials
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      };
    } catch (err) {
      console.error('Detailed error in 3D visualization:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize 3D visualization');
      setLoading(false);
    }
  }, [modelType, isHovered, materials, isInitialized]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full min-h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-white text-sm">Loading 3D Model...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="text-red-500 text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-lg font-semibold mb-2">Error Loading Model</p>
            <p className="text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full rounded-lg overflow-hidden" />
    </motion.div>
  );
} 