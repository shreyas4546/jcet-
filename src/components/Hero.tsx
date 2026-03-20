import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, RoundedBox, Html, Environment } from '@react-three/drei';
import { motion, Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Shield, GraduationCap, Star, Building } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import * as THREE from 'three';

/* ──────────────────────────────────────────────────────
   Seamless Dark Navy Glass Cards Hero
   Integrated Background · Floating Data Cards
   ────────────────────────────────────────────────────── */

// ─── Individual Glass Card Component ───
interface GlassCardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  delay?: number;
}

function GlassCard({ position, rotation, icon, title, subtitle, delay = 0 }: GlassCardProps) {
  // Highly transparent, frosted glass with strong specular highlights
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 1.0,
        opacity: 1,
        transparent: true,
        roughness: 0.15,
        thickness: 2.5,
        ior: 1.5,
        envMapIntensity: 2.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5} position={position} rotation={rotation}>
      <group>
        {/* The 3D Glass Box */}
        <RoundedBox args={[4.2, 1.5, 0.15]} radius={0.12} smoothness={4} material={material}>
          {/* Internal shadow/depth plane */}
          <mesh position={[0, 0, -0.08]}>
            <planeGeometry args={[3.8, 1.1]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.1} />
          </mesh>
        </RoundedBox>

        {/* The Embedded HTML UI */}
        <Html transform wrapperClass="glass-card-html" distanceFactor={2.5} position={[0, 0, 0.08]} zIndexRange={[100, 0]}>
          <div 
            className="flex items-center gap-5 w-[380px] px-6 py-4 rounded-xl select-none backdrop-blur-sm" 
            style={{ 
              pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-white/20 to-white/5 text-white shadow-inner border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
              {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>{title}</span>
              <span className="text-sm font-semibold text-white/80 uppercase tracking-widest leading-tight">{subtitle}</span>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// ─── Mouse Parallax Group ───
function ParallaxCardsGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    const targetX = (pointer.x * viewport.width * 0.05) / 2;
    const targetY = (pointer.y * viewport.height * 0.05) / 2;

    smoothMouse.current.x += (targetX - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (targetY - smoothMouse.current.y) * 0.05;

    // Subtle tilting toward cursor
    groupRef.current.rotation.y = smoothMouse.current.x * 0.06;
    groupRef.current.rotation.x = -smoothMouse.current.y * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Top Card: Placement */}
      <GlassCard
        position={[-0.2, 2.0, 0]}
        rotation={[-0.05, 0.08, 0.02]}
        icon={<GraduationCap size={32} />}
        title="98.4%"
        subtitle="Placement Rate"
      />
      {/* Middle Card: Rank */}
      <GlassCard
        position={[1.2, 0, 0.8]}
        rotation={[0.02, -0.12, -0.04]}
        icon={<Star size={32} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />}
        title="Top 10"
        subtitle="University Rank"
      />
      {/* Bottom Card: Accreditations */}
      <GlassCard
        position={[-0.6, -2.0, 0]}
        rotation={[0.06, 0.05, 0.03]}
        icon={<Building size={32} className="text-cyan-400" />}
        title="VTU & NAAC"
        subtitle="Accredited Institution"
      />
    </group>
  );
}

// ─── Full 3D Scene ───
function GlassScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={40} />
      
      {/* High-end Studio Lighting */}
      <ambientLight intensity={0.2} color="#ffffff" />
      {/* Main key light */}
      <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" castShadow />
      {/* Fill light from below/left */}
      <directionalLight position={[-10, -5, 5]} intensity={1.0} color="#6366f1" />
      {/* Rim light from behind */}
      <pointLight position={[0, 5, -5]} intensity={5.0} color="#06b6d4" />

      {/* Cinematic Environment Reflections */}
      <Environment preset="studio" />

      <ParallaxCardsGroup />
    </>
  );
}

// ─── Main Hero Component ───
export default function Hero() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  return (
    <section
      id="hero-seamless"
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0A0E17]" // Deep dark navy base
      role="banner"
      aria-label="JCET Homepage Hero"
    >
      {/* ── 1. Seamless Integrated Background ── */}
      <div className="absolute inset-0 z-0 flex justify-end">
        {/* The photographic element is restricted to the right side and strongly masked */}
        <div className="relative w-full lg:w-[60%] h-full">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80&auto=format"
            alt="University campus"
            className="w-full h-full object-cover saturate-[0.2] contrast-[1.2] opacity-40 mix-blend-luminosity"
            loading="eager"
          />
          {/* Complex gradient mask to seamlessly blend the image into the dark navy background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E17] via-[#0A0E17]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-[#0A0E17]/50" />
          <div className="absolute inset-0 bg-[#0A0E17]/30" /> {/* Overall darkening */}
        </div>
      </div>

      {/* ── 2. Split Layout Container ── */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
        
        {/* ── Left Column: Foreground Typography (Exactly Preserved) ── */}
        <motion.div
          className="pt-24 lg:pt-0 max-w-xl relative tracking-tight"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/90 backdrop-blur-md lowercase tracking-wide" style={{ fontVariant: 'small-caps' }}>
              <Shield size={14} className="text-cyan-400" />
              VTU Affiliated
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/90 backdrop-blur-md lowercase tracking-wide" style={{ fontVariant: 'small-caps' }}>
              <Shield size={14} className="text-violet-400" />
              NAAC Accredited
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-display font-bold leading-[1.05] tracking-tight text-white mb-6 drop-shadow-sm">
              Engineering the<br className="hidden md:block" />
              Future at JCET.
            </h1>
          </motion.div>

          {/* Subheadline (Paragraph) */}
          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-10 max-w-md font-sans opacity-90">
              A modern engineering college experience built on innovation, strong placements, and vibrant campus life.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <Link
              to="/admissions"
              className="px-8 py-4 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-500 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              Apply Now
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
              <Download size={18} />
              Download Brochure
            </button>
          </motion.div>
        </motion.div>

        {/* ── Right Column: Fixed 3D Canvas ── */}
        <div className="absolute lg:relative right-0 lg:right-auto inset-y-0 w-[120%] lg:w-full -mr-[20%] lg:mr-0 z-0 lg:z-10 pointer-events-none lg:pointer-events-auto flex items-center justify-center">
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              className="w-full h-full"
            >
              <GlassScene />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
