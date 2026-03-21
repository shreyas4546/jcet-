import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, CheckCircle, Trophy, Shield } from 'lucide-react';

/* ──────────────────────────────────────────────────────
   Dynamic Unpredictable Background & Floating Stats Hero
   ────────────────────────────────────────────────────── */

const SLIDES = [
  'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1600&q=80&fm=webp', // Architecture / College
  'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80&fm=webp', // Modern college building
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80&fm=webp', // Students in a high-tech lab
  // Graduation (Fixed URL)
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80&fm=webp', // Collaborative coding 
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80&fm=webp', // Robotics workspace
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80&fm=webp', // Developer setup
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80&fm=webp', // Campus tech aesthetic
];

const SLIDE_INTERVALMs = 6000;
const TRANSITION_TYPES = ['deepBlur', 'slowScale', 'slideRight', 'slideUp', 'zoomBurst', 'diagonalWipe', 'irisReveal'];

// Browsers-level caching to prevent blank loading flashes
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

// ─── 7-Variant Framer Motion Dynamic Background Transition Matrix ───
const sliderVariants = {
  initial: (type: string) => {
    switch (type) {
      case 'deepBlur':      return { opacity: 0, scale: 1.05, filter: 'blur(20px)', zIndex: 10 };
      case 'slowScale':     return { opacity: 0, scale: 1.25, zIndex: 10 };
      case 'slideRight':    return { x: '100%', zIndex: 10 };
      case 'slideUp':       return { y: '100%', zIndex: 10 };
      case 'zoomBurst':     return { opacity: 0, scale: 0.6, zIndex: 10 };
      case 'diagonalWipe':  return { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', zIndex: 10 };
      case 'irisReveal':    return { clipPath: 'circle(0% at 50% 50%)', zIndex: 10 };
      default:              return { opacity: 0 };
    }
  },
  animate: (type: string) => {
    switch (type) {
      case 'deepBlur':      return { opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 10, transition: { duration: 1.5, ease: 'easeInOut' } };
      case 'slowScale':     return { opacity: 1, scale: 1, zIndex: 10, transition: { duration: 2.5, ease: 'easeInOut' } };
      case 'slideRight':    return { x: '0%', zIndex: 10, transition: { duration: 1.2, ease: 'easeInOut' } };
      case 'slideUp':       return { y: '0%', zIndex: 10, transition: { duration: 1.2, ease: 'easeInOut' } };
      case 'zoomBurst':     return { opacity: 1, scale: 1, zIndex: 10, transition: { duration: 1.0, ease: 'easeInOut' } };
      case 'diagonalWipe':  return { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', zIndex: 10, transition: { duration: 1.4, ease: 'easeInOut' } };
      case 'irisReveal':    return { clipPath: 'circle(150% at 50% 50%)', zIndex: 10, transition: { duration: 1.8, ease: 'easeInOut' } };
      default:              return { opacity: 1 };
    }
  },
  exit: (type: string) => {
    // The outgoing slide stays rock-solid at opacity 1 & zIndex 0 so
    // the incoming slide always has a perfect backdrop underneath it.
    switch (type) {
      case 'slideRight':   return { x: '-30%', opacity: 1, zIndex: 0, transition: { duration: 1.2, ease: 'easeInOut' } };
      case 'slideUp':      return { y: '-30%', opacity: 1, zIndex: 0, transition: { duration: 1.2, ease: 'easeInOut' } };
      default:             return { opacity: 1, zIndex: 0, transition: { duration: 2.0 } };
    }
  },
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animType, setAnimType] = useState('deepBlur');

  useImagePreloader(SLIDES);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomType = TRANSITION_TYPES[Math.floor(Math.random() * TRANSITION_TYPES.length)];
      setAnimType(randomType);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVALMs);
    return () => clearInterval(timer);
  }, []);

  // ─── Mouse Parallax Setup ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Translate parallax for typography
  const textX = useTransform(smoothX, [-1, 1], [15, -15]);
  const textY = useTransform(smoothY, [-1, 1], [15, -15]);

  // Rotate parallax (3D tilt) for the floating glass dock
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const mx = (e.clientX / innerWidth) * 2 - 1;
    const my = (e.clientY / innerHeight) * 2 - 1;
    mouseX.set(mx);
    mouseY.set(my);
  };

  return (
    <section
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex flex-col justify-center bg-[#0a0f1c]"
      onMouseMove={handleMouseMove}
      style={{ perspective: 1200 }} // Enable 3D perspective for rotateX/Y
    >
      {/* ── Dynamic Unpredictable Background Slider ── */}
      <div className="absolute inset-0 z-0">
        {/* Do NOT use mode="wait". Concurrent execution removes blank gaps natively. */}
        <AnimatePresence custom={animType}>
          <motion.img
            key={currentSlide}
            src={SLIDES[currentSlide]}
            alt="Background Slide"
            custom={animType}
            variants={sliderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // CRITICAL FIX: Ensure all AnimatePresence children are strictly absolute inset-0
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* ── Strict Dark Gradient Overlay ── */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-[#0a0f1c] to-transparent pointer-events-none" />

      {/* ── Left Column Typography (Parallax Enabled) ── */}
      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 mt-12"
        style={{ x: textX, y: textY }}
      >
        <div className="max-w-2xl space-y-8">
          {/* Badges */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-500/50 text-[10px] md:text-xs font-semibold tracking-wider text-slate-300 uppercase backdrop-blur-sm bg-white/5">
              <Shield size={14} className="mr-2 text-violet-400 border-none" />
              VTU Affiliated
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-500/50 text-[10px] md:text-xs font-semibold tracking-wider text-slate-300 uppercase backdrop-blur-sm bg-white/5">
              <Shield size={14} className="mr-2 text-cyan-400 border-none" />
              NAAC Accredited
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-2xl">
            Engineering the <br />
            Future at JCET.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-xl leading-relaxed drop-shadow-md">
            A modern engineering college experience built on innovation, strong placements, and campus life.
          </p>

          {/* Action Area */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/admissions"
              className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-full transition-colors flex items-center gap-2 group shadow-xl shadow-violet-900/50 hover:shadow-violet-900/80"
            >
              Apply Now
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold rounded-full transition-colors flex items-center gap-2 backdrop-blur-md">
              <Download size={20} />
              Download Brochure
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Center Floating Anti-Gravity Stats Dock ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-max"
        style={{ rotateX, rotateY }} // Mouse 3D tilt
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center divide-x divide-white/10 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          <div className="py-4 px-6 md:px-8 flex items-center gap-4 hover:bg-white/20 transition-colors cursor-default">
            <CheckCircle className="text-violet-300" size={24} />
            <div>
              <div className="text-xl font-bold text-white tracking-tight leading-none mb-1">98.4%</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mt-1">Placement Rate</div>
            </div>
          </div>

          <div className="py-4 px-6 md:px-8 flex items-center gap-4 hover:bg-white/20 transition-colors cursor-default">
            <Shield className="text-cyan-300" size={24} />
            <div>
              <div className="text-xl font-bold text-white tracking-tight leading-none mb-1">50+</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mt-1">Research Labs</div>
            </div>
          </div>

          <div className="py-4 px-6 md:px-8 flex items-center gap-4 hover:bg-white/20 transition-colors cursor-default">
            <Trophy className="text-pink-300" size={24} />
            <div>
              <div className="text-xl font-bold text-white tracking-tight leading-none mb-1">Top 10</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mt-1">University Rank</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
