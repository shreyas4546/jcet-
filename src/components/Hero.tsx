import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { motion, Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import * as THREE from 'three';

/* ──────────────────────────────────────────────────────
   Anti-Gravity Immersive Hero – Wireframe Tech Globe
   Full-screen 3D background · Centered UI · Stats Dock
   ────────────────────────────────────────────────────── */

// ─── Wireframe Globe (Primary Centerpiece) ───
function WireframeGlobe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.08;
  });

  const wireframeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3B4FBF',
    emissive: '#1E3A8A',
    emissiveIntensity: 0.6,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  }), []);

  const innerWireframeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#7C3AED',
    emissive: '#5B21B6',
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  const coreMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#06B6D4',
    emissive: '#0891B2',
    emissiveIntensity: 0.8,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  }), []);

  return (
    <group ref={groupRef}>
      {/* Outer shell — primary wireframe icosahedron */}
      <mesh material={wireframeMat}>
        <icosahedronGeometry args={[3.8, 2]} />
      </mesh>

      {/* Middle layer — slightly rotated for visual depth */}
      <mesh material={innerWireframeMat} rotation={[0.4, 0.6, 0]}>
        <icosahedronGeometry args={[3.0, 1]} />
      </mesh>

      {/* Inner core — denser wireframe sphere */}
      <mesh material={coreMat}>
        <sphereGeometry args={[1.8, 24, 24]} />
      </mesh>
    </group>
  );
}

// ─── Orbital Rings ───
function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.06;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.04;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.03;
  });

  const ringMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1E3A8A',
    emissive: '#1E40AF',
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide,
  }), []);

  return (
    <>
      <mesh ref={ring1Ref} rotation={[1.2, 0.3, 0]} material={ringMat}>
        <torusGeometry args={[5.2, 0.02, 8, 120]} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0.8, -0.5, 0.3]} material={ringMat}>
        <torusGeometry args={[5.8, 0.015, 8, 120]} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0.3, 1.0, -0.2]} material={ringMat}>
        <torusGeometry args={[6.4, 0.01, 8, 120]} />
      </mesh>
    </>
  );
}

// ─── Particle Nodes (data-point-like dots scattered on a sphere) ───
function ParticleNodes() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color('#3B82F6');
    const colorB = new THREE.Color('#7C3AED');
    const colorC = new THREE.Color('#06B6D4');
    const palette = [colorA, colorB, colorC];

    for (let i = 0; i < count; i++) {
      // Distribute on a sphere surface (radius 4-7)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ─── Mouse Parallax Group ───
function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    const targetX = (pointer.x * viewport.width * 0.03) / 2;
    const targetY = (pointer.y * viewport.height * 0.03) / 2;

    smoothMouse.current.x += (targetX - smoothMouse.current.x) * 0.04;
    smoothMouse.current.y += (targetY - smoothMouse.current.y) * 0.04;

    groupRef.current.rotation.y = smoothMouse.current.x * 0.06;
    groupRef.current.rotation.x = -smoothMouse.current.y * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Full 3D Scene ───
function AntiGravityScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />

      {/* ── Lighting (dramatic but dark) ── */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 8, 5]} intensity={0.6} color="#ffffff" />

      {/* Accent lights — deep blue and purple rim lighting */}
      <pointLight position={[-6, 4, -8]} intensity={1.8} color="#1E3A8A" distance={35} decay={2} />
      <pointLight position={[7, -3, -6]} intensity={1.4} color="#7C3AED" distance={30} decay={2} />
      <pointLight position={[0, 6, 2]} intensity={0.5} color="#06B6D4" distance={25} decay={2} />

      {/* ── Centerpiece: positioned off-center right, pushed back ── */}
      <ParallaxGroup>
        <group position={[3, 0.5, -4]}>
          <WireframeGlobe />
          <OrbitalRings />
          <ParticleNodes />
        </group>
      </ParallaxGroup>

      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#0B0F1A', 14, 40]} />
    </>
  );
}

// ─── Stats Data ───
const STATS = [
  { value: '98.4%', label: 'Placement Rate', color: 'text-violet-400' },
  { value: '50+', label: 'Lab Facilities', color: 'text-cyan-400' },
  { value: 'Top 10', label: 'University Rank', color: 'text-pink-400' },
];

// ─── Main Hero Component ───
export default function Hero() {
  const { t } = useLanguage();

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
      id="hero-antigravity"
      className="relative w-full h-screen overflow-hidden"
      role="banner"
      aria-label="JCET Homepage Hero"
    >
      {/* ── Three.js Canvas Background ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: '#0B0F1A' }}
          >
            <AntiGravityScene />
          </Canvas>
        </Suspense>
      </div>

      {/* ── Vignette Overlay ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(11,15,26,0.7) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent opacity-60" />
      </div>

      {/* ── Foreground UI ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-[10px] md:text-xs font-semibold text-white/80 backdrop-blur-md">
              <Shield size={12} className="text-cyan-400" />
              VTU Affiliated
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-[10px] md:text-xs font-semibold text-white/80 backdrop-blur-md">
              <Shield size={12} className="text-violet-400" />
              NAAC Accredited
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.08] tracking-tight text-white drop-shadow-2xl">
              {t('hero.title1')}{' '}
              {t('hero.title2')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">
                {t('hero.title3')}
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed text-white/60">
              {t('hero.desc')}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center justify-center pt-2">
            <Link
              to="/admissions"
              className="btn-primary flex items-center gap-2.5 group shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transition-shadow duration-300"
            >
              {t('hero.btnApply')}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="btn-secondary flex items-center gap-2.5 group cursor-pointer backdrop-blur-sm bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.15] transition-all duration-300">
              <Download size={18} />
              {t('hero.btnDownload')}
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 text-[10px] md:text-[11px] text-white/40 uppercase tracking-[0.2em] font-medium pt-2">
            <span>{t('stat.naac')}</span>
            <span className="text-white/15">·</span>
            <span>{t('stat.vtu')}</span>
            <span className="text-white/15">·</span>
            <span>{t('stat.estd')}</span>
          </motion.div>
        </motion.div>

        {/* ── Stats Dock (Bottom) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl"
        >
          <div className="backdrop-blur-md bg-white/[0.07] border border-white/[0.1] rounded-2xl px-6 py-4 md:px-10 md:py-5 flex items-center justify-around gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
