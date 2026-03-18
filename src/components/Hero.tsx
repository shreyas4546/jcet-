import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Download, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import MagneticButton from './ui/magnetic-button-v1.0.0';
import { ABExperiment, ABVariant, useABTest } from './ABTesting';

interface HeroProps {
  setHighlightWhy?: (val: boolean) => void;
}

export default function Hero({ setHighlightWhy }: HeroProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { trackEvent } = useABTest();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const hotspots = [
    { id: 1, x: '25%', y: '25%', title: 'Computer Science Engineering', desc: 'Master software development, algorithms, and computing systems.' },
    { id: 2, x: '70%', y: '35%', title: 'Mechanical Engineering', desc: 'Design, analyze, and manufacture advanced mechanical systems.' },
    { id: 3, x: '40%', y: '50%', title: 'Civil Engineering', desc: 'Build the sustainable infrastructure of tomorrow.' },
    { id: 4, x: '80%', y: '65%', title: 'Electronics Engineering', desc: 'Innovate in circuits, communication, and embedded systems.' },
    { id: 5, x: '30%', y: '75%', title: 'Artificial Intelligence', desc: 'Pioneer the future of machine learning and neural networks.' },
    { id: 6, x: '60%', y: '85%', title: 'MBA', desc: 'Develop leadership and strategic management skills.' },
  ];

  const handleApplyNow = () => {
    trackEvent('hero_headline_experiment', 'apply_now_click');
    document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-black">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <img 
          src="https://picsum.photos/seed/jcet-hero/1920/1080" 
          alt="JCET Campus" 
          className="w-full h-[150%] object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1A]/90 via-[#111827]/80 to-black/90" />
      </motion.div>

      {/* Background Gradient / Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ABExperiment id="hero_headline_experiment">
              <ABVariant name="original">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
                  Engineering the <br />
                  Future at JCET
                </h1>
              </ABVariant>
              <ABVariant name="journey">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
                  Your Journey to <br />
                  Excellence
                </h1>
              </ABVariant>
            </ABExperiment>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
              Innovative learning, advanced labs, and strong placements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={handleApplyNow} className="btn-primary flex items-center gap-2">
              Apply Now
              <ArrowRight size={18} />
            </button>
            
            <button onClick={() => console.log('Download brochure')} className="btn-secondary flex items-center gap-2">
              <Download size={18} />
              Download Brochure
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive Globe */}
        <div className="lg:col-span-6 relative h-[600px] flex items-center justify-center">
          
          {/* Stylized 3D Globe Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/10 relative animate-[spin_60s_linear_infinite] [transform-style:preserve-3d]">
              {/* Grid lines to simulate globe */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 rotate-45" />
              <div className="absolute inset-0 rounded-full border border-purple-500/20 -rotate-45" />
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 rotate-90" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-purple-500/20" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-cyan-500/20" />
            </div>
          </motion.div>

          {/* Interactive Hotspots */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute z-20"
              style={{ left: spot.x, top: spot.y }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                className={`w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] relative group focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transition-transform ${activeHotspot === spot.id ? 'scale-125' : 'hover:scale-125'}`}
                aria-label={`View ${spot.title}`}
              >
                <span className={`absolute inset-0 rounded-full bg-cyan-400 opacity-75 ${activeHotspot === spot.id ? 'animate-ping' : 'group-hover:animate-ping'}`} />
              </button>

              {/* Microcard */}
              <AnimatePresence>
                {activeHotspot === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-64 glass-panel p-5 z-30"
                  >
                    <h4 className="text-base font-bold text-white mb-2">{spot.title}</h4>
                    <p className="text-sm text-gray-300 mb-4">{spot.desc}</p>
                    <a href="#departments" className="text-xs font-semibold text-cyan-400 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
                      View Department <ChevronRight size={14} />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

        </div>
      </div>

      {/* Interactive Scroll Indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group"
        onMouseEnter={() => setHighlightWhy?.(true)}
        onMouseLeave={() => setHighlightWhy?.(false)}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 group-hover:text-cyan-400 transition-colors">
          Discover Why JCET
        </span>
        <div className="w-6 h-10 border-2 border-white/20 group-hover:border-cyan-400/50 rounded-full flex justify-center p-1 transition-colors">
          <motion.div 
            className="w-1 h-2 bg-cyan-400 rounded-full" 
            animate={{ y: [0, 16, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
          />
        </div>
      </motion.div>
    </section>
  );
}
