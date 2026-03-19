import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleGlobe() {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group>
      {/* Inner dark core to hide backface particles */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.95, 64, 64]} />
        <meshBasicMaterial color="#040814" />
      </mesh>
      
      {/* Particle Sphere */}
      <points ref={pointsRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <pointsMaterial 
          color="#60a5fa" 
          size={0.02} 
          transparent={true}
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Outer subtle wireframe atmosphere */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent={true} opacity={0.05} wireframe={true} />
      </mesh>

      {/* Dynamic orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.005, 16, 100]} />
        <meshBasicMaterial color="#fbbf24" transparent={true} opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.8, 0.005, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent={true} opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function PremiumGlobe() {
  return (
    <div className="w-full h-full relative group">
      {/* Glow behind canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#3b82f6]/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-50" />
      
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.5}
          dampingFactor={0.05}
        />
        <ambientLight intensity={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
          <ParticleGlobe />
        </Float>
      </Canvas>
      
      {/* Absolute positioning overlays can go here if needed in Hero.tsx */}
    </div>
  );
}
