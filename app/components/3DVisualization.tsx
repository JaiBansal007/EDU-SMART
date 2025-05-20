'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';

type ModelType = 'dna' | 'brain' | 'cell';

interface ModelConfig {
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

const modelConfigs: Record<ModelType, ModelConfig> = {
  dna: {
    scale: 2,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  brain: {
    scale: 2,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  cell: {
    scale: 2,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
};

export default function ThreeDVisualization({ modelType = 'dna' }: { modelType?: ModelType }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let model: THREE.Object3D;
    let animationFrameId: number;

    try {
      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Enhanced lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      // Controls with enhanced settings
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.7;
      controls.zoomSpeed = 1.2;
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.enablePan = true;

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
        return model;
      };

      const createDNA = () => {
        const group = new THREE.Group();
        
        // Create base pairs
        const createBasePair = (index: number) => {
          const baseGroup = new THREE.Group();
          
          // Create sugar-phosphate backbone
          const backboneGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32);
          const backboneMaterial = new THREE.MeshPhongMaterial({
            color: 0x4444ff,
            shininess: 100,
            specular: 0x444444,
            emissive: 0x2222ff,
            emissiveIntensity: 0.2
          });

          const leftBackbone = new THREE.Mesh(backboneGeometry, backboneMaterial);
          const rightBackbone = new THREE.Mesh(backboneGeometry, backboneMaterial);
          
          leftBackbone.position.set(-0.2, 0, 0);
          rightBackbone.position.set(0.2, 0, 0);
          
          baseGroup.add(leftBackbone);
          baseGroup.add(rightBackbone);

          // Create base pairs (A-T, G-C)
          const baseGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
          const baseMaterial = new THREE.MeshPhongMaterial({
            color: index % 2 === 0 ? 0xff4444 : 0x44ff44,
            shininess: 100,
            specular: 0x444444,
            emissive: index % 2 === 0 ? 0xff0000 : 0x00ff00,
            emissiveIntensity: 0.2
          });

          const leftBase = new THREE.Mesh(baseGeometry, baseMaterial);
          const rightBase = new THREE.Mesh(baseGeometry, baseMaterial);
          
          leftBase.position.set(-0.1, 0, 0);
          rightBase.position.set(0.1, 0, 0);
          
          baseGroup.add(leftBase);
          baseGroup.add(rightBase);

          // Position and rotate the base pair
          baseGroup.position.y = index * 0.3;
          baseGroup.rotation.z = Math.sin(index * 0.5) * 0.3;

          return baseGroup;
        };

        // Create multiple base pairs
        for (let i = 0; i < 20; i++) {
          group.add(createBasePair(i));
        }

        return group;
      };

      const createBrain = () => {
        const group = new THREE.Group();
        
        // Create brain hemispheres
        const createHemisphere = (side: number) => {
          const hemisphereGroup = new THREE.Group();
          
          // Main hemisphere
          const hemisphereGeometry = new THREE.SphereGeometry(1, 64, 64);
          const hemisphereMaterial = new THREE.MeshPhongMaterial({
            color: 0xffcccc,
            shininess: 30,
            specular: 0x444444,
            emissive: 0x442222,
            emissiveIntensity: 0.2
          });
          
          const hemisphere = new THREE.Mesh(hemisphereGeometry, hemisphereMaterial);
          hemisphere.scale.set(1, 1.2, 0.8);
          hemisphere.position.x = side * 0.5;
          hemisphereGroup.add(hemisphere);

          // Add sulci (brain folds)
          const createSulcus = (radius: number, position: [number, number, number]) => {
            const sulcusGeometry = new THREE.TorusGeometry(radius, 0.1, 16, 32, Math.PI);
            const sulcusMaterial = new THREE.MeshPhongMaterial({
              color: 0xcc9999,
              shininess: 30,
              specular: 0x444444
            });
            
            const sulcus = new THREE.Mesh(sulcusGeometry, sulcusMaterial);
            sulcus.position.set(...position);
            sulcus.rotation.x = Math.PI / 2;
            return sulcus;
          };

          // Add multiple sulci
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
        group.add(createHemisphere(-1)); // Left hemisphere
        group.add(createHemisphere(1));  // Right hemisphere

        // Add cerebellum
        const cerebellumGeometry = new THREE.SphereGeometry(0.6, 32, 32);
        const cerebellumMaterial = new THREE.MeshPhongMaterial({
          color: 0xffcccc,
          shininess: 30,
          specular: 0x444444,
          emissive: 0x442222,
          emissiveIntensity: 0.2
        });
        
        const cerebellum = new THREE.Mesh(cerebellumGeometry, cerebellumMaterial);
        cerebellum.position.y = -0.8;
        cerebellum.scale.set(1.2, 0.6, 0.8);
        group.add(cerebellum);

        return group;
      };

      const createCell = () => {
        const group = new THREE.Group();
        
        // Cell membrane
        const membraneGeometry = new THREE.SphereGeometry(1, 64, 64);
        const membraneMaterial = new THREE.MeshPhongMaterial({
          color: 0x88cc88,
          transparent: true,
          opacity: 0.3,
          shininess: 100,
          specular: 0x444444
        });
        
        const membrane = new THREE.Mesh(membraneGeometry, membraneMaterial);
        group.add(membrane);

        // Nucleus
        const nucleusGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const nucleusMaterial = new THREE.MeshPhongMaterial({
          color: 0x4444ff,
          shininess: 100,
          specular: 0x444444,
          emissive: 0x2222ff,
          emissiveIntensity: 0.2
        });
        
        const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
        nucleus.position.set(0.2, 0.2, 0);
        group.add(nucleus);

        // Chloroplasts
        const createChloroplast = (position: [number, number, number]) => {
          const chloroplastGeometry = new THREE.SphereGeometry(0.15, 32, 32);
          const chloroplastMaterial = new THREE.MeshPhongMaterial({
            color: 0x44ff44,
            shininess: 100,
            specular: 0x444444,
            emissive: 0x22ff22,
            emissiveIntensity: 0.2
          });
          
          const chloroplast = new THREE.Mesh(chloroplastGeometry, chloroplastMaterial);
          chloroplast.position.set(...position);
          return chloroplast;
        };

        // Add multiple chloroplasts
        const chloroplastPositions: [number, number, number][] = [
          [-0.5, 0.3, 0.4],
          [0.3, -0.4, 0.5],
          [-0.4, -0.3, -0.4],
          [0.5, 0.4, -0.3]
        ];

        chloroplastPositions.forEach(pos => {
          group.add(createChloroplast(pos));
        });

        // Vacuole
        const vacuoleGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const vacuoleMaterial = new THREE.MeshPhongMaterial({
          color: 0x88aaff,
          transparent: true,
          opacity: 0.6,
          shininess: 100,
          specular: 0x444444
        });
        
        const vacuole = new THREE.Mesh(vacuoleGeometry, vacuoleMaterial);
        vacuole.position.set(-0.3, -0.2, 0.3);
        group.add(vacuole);

        return group;
      };

      model = createModel();

      // Animation loop with enhanced controls
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        if (model) {
          // Base rotation
          model.rotation.y += isHovered ? 0.02 : 0.005;
          
          // Model-specific animations
          if (modelType === 'dna') {
            // DNA unwinding animation
            model.children.forEach((basePair, index) => {
              const time = Date.now() * 0.001;
              basePair.rotation.z = Math.sin(time + index * 0.2) * 0.3;
              basePair.position.y = index * 0.3 + Math.sin(time * 2 + index * 0.1) * 0.1;
            });
          } else if (modelType === 'brain') {
            // Brain pulse animation
            const time = Date.now() * 0.001;
            const pulse = Math.sin(time * 2) * 0.05;
            model.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
            
            // Subtle movement of sulci
            model.children.forEach((hemisphere, index) => {
              hemisphere.children.forEach((sulcus, i) => {
                if (i > 0) { // Skip the main hemisphere mesh
                  sulcus.rotation.z = Math.sin(time + i * 0.5) * 0.1;
                }
              });
            });
          } else if (modelType === 'cell') {
            // Cell organelle movement
            const time = Date.now() * 0.001;
            
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

      animate();

      // Enhanced resize handler
      const handleResize = () => {
        if (!containerRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        scene.clear();
        renderer.dispose();
        controls.dispose();
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    } catch (err) {
      console.error('Error initializing 3D visualization:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize 3D visualization');
      setLoading(false);
    }
  }, [modelType, isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full min-h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="text-red-500 text-center p-4">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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