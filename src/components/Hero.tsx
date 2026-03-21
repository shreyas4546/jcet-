import { useRef, useMemo, Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, RoundedBox, Html, Environment } from '@react-three/drei';
import { motion, Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Shield, Trophy, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import * as THREE from 'three';

/* ──────────────────────────────────────────────────────
   Premium Glass Cards Hero + Cinematic Slider
   ────────────────────────────────────────────────────── */

// ─── Background Slide Images ───
// Using w=1280, q=50, fm=webp for maximum performance and instant loading
const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=50&fm=webp',
    alt: 'University campus aerial view',
  },
  {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1280&q=50&fm=webp',
    alt: 'Engineering students in laboratory',
  },
  {
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=50&fm=webp',
    alt: 'Students graduating at university',
  },
  {
    src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=50&fm=webp',
    alt: 'University campus building at dusk',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1280&q=50&fm=webp',
    alt: 'Students collaborating in modern workspace',
  },
];

const SLIDE_DURATION = 6000;

// ─── Preload hook ───
function useImagePreloader(urls: string[]) {
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [urls]);
}

// ─── Individual Glass Card Component ───
interface GlassCardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  accentColor: string;
}

function GlassCard({ position, rotation, icon, label, sublabel, accentColor }: GlassCardProps) {
  const [showHtml, setShowHtml] = useState(false);

  useEffect(() => {
    // Delay HTML rendering natively to prevent flashing before Canvas mounts
    const timer = setTimeout(() => setShowHtml(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 1, // Frosted glass effect
        roughness: 0.2,
        thickness: 2,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={position} rotation={rotation}>
      <group>
        <RoundedBox args={[3.8, 1.4, 0.15]} radius={0.1} smoothness={4} material={material}>
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[3.2, 1.0]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.15} />
          </mesh>
        </RoundedBox>

        <Html 
          transform 
          wrapperClass="glass-card-html" 
          distanceFactor={2.5} 
          position={[0, 0, 0.08]}
          style={{ opacity: showHtml ? 1 : 0, transition: 'opacity 0.8s ease-in-out' }}
        >
          <div className="flex items-center gap-4 w-[340px] px-6 py-4 rounded-xl select-none" style={{ pointerEvents: 'none' }}>
            <div className={`p-3 rounded-xl bg-white/10 ${accentColor.replace('text-', 'text-').replace(' ', '')} shadow-inner border border-white/20`} style={{ color: accentColor }}>
              {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">{label}</span>
              <span className="text-sm font-medium text-white/70 uppercase tracking-widest">{sublabel}</span>
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

    smoothMouse.current.x += (targetX - smoothMouse.current.x) * 0.04;
    smoothMouse.current.y += (targetY - smoothMouse.current.y) * 0.04;

    groupRef.current.rotation.y = smoothMouse.current.x * 0.08;
    groupRef.current.rotation.x = -smoothMouse.current.y * 0.06;
  });

  return (
    <group ref={groupRef}>
      <GlassCard position={[0, 1.8, 0]} rotation={[-0.05, 0.1, 0.02]} icon={<CheckCircle size={28} />} label="98.4% Placement Rate" sublabel="Industry Ready" accentColor="#A78BFA" />
      <GlassCard position={[0.8, 0, 0.5]} rotation={[0.02, -0.15, -0.05]} icon={<Trophy size={28} />} label="Top 10 University Rank" sublabel="Academic Excellence" accentColor="#22D3EE" />
      <GlassCard position={[-0.5, -1.8, 0]} rotation={[0.08, 0.05, 0.03]} icon={<Shield size={28} />} label="VTU & NAAC Accredited" sublabel="Recognized Institution" accentColor="#F472B6" />
    </group>
  );
}

// ─── Full 3D Scene ───
function GlassScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7C3AED" />
      <Environment preset="city" />
      <ParallaxCardsGroup />
    </>
  );
}

// ─── Main Hero Component ───
export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const urls = useMemo(() => SLIDES.map(s => s.src), []);
  useImagePreloader(urls);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  return (
    <section
      id="hero-glass"
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-slate-950"
      role="banner"
      aria-label="JCET Homepage Hero"
    >
      {/* ── 1. Photo Slider Background (all images stacked, CSS crossfade) ── */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              transitionDuration: '1500ms',
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0,
            }}
            aria-hidden={index !== currentSlide}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 w-full h-full object-cover ${
                index === currentSlide ? 'animate-ken-burns' : ''
              }`}
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* ── 2. Heavy CSS Gradient Overlay ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/40 pointer-events-none" />

      {/* ── 3. Split Layout Container ── */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
        
        {/* ── Left Column: Foreground Typography ── */}
        <motion.div
          className="pt-24 lg:pt-0 max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-[10px] md:text-xs font-semibold text-white backdrop-blur-md">
              <Shield size={12} className="text-cyan-400" /> VTU Affiliated
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-[10px] md:text-xs font-semibold text-white backdrop-blur-md">
              <Shield size={12} className="text-violet-400" /> NAAC Accredited
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg mb-6">
              Engineering the<br className="hidden md:block" /> Future at JCET.
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-10 max-w-lg font-sans">
              A modern engineering college experience built on innovation, strong placements, and campus life.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <Link
              to="/admissions"
              className="px-8 py-4 bg-white text-slate-950 font-bold rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-[1.02] hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 group"
            >
              Apply Now <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
              <Download size={18} /> Download Brochure
            </button>
          </motion.div>
        </motion.div>

        {/* ── Right Column: 3D Canvas ── */}
        <div className="absolute lg:relative right-0 lg:right-auto inset-y-0 w-full lg:w-[120%] lg:-ml-[10%] z-[-1] lg:z-10 opacity-60 lg:opacity-100 pointer-events-none lg:pointer-events-auto flex items-center justify-center">
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              camera={{ position: [0, 0, 5], fov: 45 }}
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
