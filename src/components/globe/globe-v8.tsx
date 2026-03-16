import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';

// Hotspot data
const HOTSPOTS = [
  { id: 'cse', position: [1.2, 0.8, 1.5], title: 'CSE', desc: 'Computer Science Engineering' },
  { id: 'me', position: [-1.5, 0.5, 1.2], title: 'ME', desc: 'Mechanical Engineering' },
  { id: 'civil', position: [0.5, -1.2, 1.5], title: 'Civil', desc: 'Civil Engineering' },
  { id: 'ece', position: [1.5, -0.5, -1.0], title: 'ECE', desc: 'Electronics Engineering' },
  { id: 'aiml', position: [-1.0, 1.5, -0.5], title: 'AIML', desc: 'Artificial Intelligence' },
  { id: 'mba', position: [0, 0, 2.0], title: 'MBA', desc: 'Master of Business Admin' },
];

function GlobeModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Slowly rotate the globe unless hovered
  useFrame((state, delta) => {
    if (groupRef.current && !isHovered) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Stylized low-poly sphere fallback since we don't have a real GLTF URL */}
      <Sphere args={[2, 32, 32]}>
        <MeshDistortMaterial 
          color="#002752" 
          emissive="#00E5FF" 
          emissiveIntensity={0.2} 
          wireframe 
          distort={0.2} 
          speed={1.5} 
        />
      </Sphere>
      
      {/* Hotspots */}
      {HOTSPOTS.map((spot) => (
        <Hotspot key={spot.id} {...spot} />
      ))}
    </group>
  );
}

function Hotspot({ position, title, desc }: any) {
  const [active, setActive] = useState(false);

  return (
    <group position={position as [number, number, number]}>
      <mesh 
        onClick={(e) => { e.stopPropagation(); setActive(!active); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>
      
      <Html center zIndexRange={[100, 0]}>
        <div className="relative">
          <button 
            className="w-4 h-4 rounded-full bg-[#00E5FF] animate-pulse focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002752]"
            onClick={() => setActive(!active)}
            aria-label={`View ${title} details`}
            aria-expanded={active}
          />
          <AnimatePresence>
            {active && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 w-48 bg-[#002752]/90 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-xl text-white pointer-events-auto"
              >
                <h4 className="font-bold text-[#00E5FF] text-sm">{title}</h4>
                <p className="text-xs text-gray-300 mt-1 mb-2 leading-tight">{desc}</p>
                <a href="#departments" className="text-[10px] uppercase tracking-wider font-bold text-white hover:text-[#00E5FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF] rounded px-1 -ml-1 inline-block">View Dept →</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Html>
    </group>
  );
}

export default function GlobeCanvas() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-[500px] lg:h-[600px] relative cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />
        <GlobeModel isHovered={isHovered} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      
      {/* Hidden list for screen readers and SEO */}
      <div className="sr-only">
        <h3>Departments</h3>
        <ul>
          {HOTSPOTS.map(spot => (
            <li key={spot.id}>{spot.desc} ({spot.title})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
