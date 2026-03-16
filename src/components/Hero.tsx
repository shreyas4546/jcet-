import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Download, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

interface HeroProps {
  setHighlightWhy?: (val: boolean) => void;
}

export default function Hero({ setHighlightWhy }: HeroProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  
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

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-navy-dark">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <img 
          src="https://picsum.photos/seed/jcet-hero/1920/1080" 
          alt="JCET Campus" 
          className="w-full h-[150%] object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-navy-dark/80" />
      </motion.div>

      {/* Background Gradient / Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white">
              Engineering the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-blue-500">
                Future at JCET
              </span>
            </h1>
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
            <a href="#admissions" className="btn-primary flex items-center gap-2 group">
              Apply Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#brochure" className="btn-secondary flex items-center gap-2">
              <Download size={18} />
              Download Brochure
            </a>
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
              <div className="absolute inset-0 rounded-full border border-neon/20 rotate-45" />
              <div className="absolute inset-0 rounded-full border border-neon/20 -rotate-45" />
              <div className="absolute inset-0 rounded-full border border-neon/20 rotate-90" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-neon/20" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-neon/20" />
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
                className="w-4 h-4 rounded-full bg-neon shadow-[0_0_15px_#00E5FF] relative group focus:outline-none focus:ring-4 focus:ring-neon/50"
                aria-label={`View ${spot.title}`}
              >
                <span className="absolute inset-0 rounded-full bg-neon animate-ping opacity-75" />
              </button>

              {/* Microcard */}
              <AnimatePresence>
                {activeHotspot === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-64 glass-panel p-5 z-30 shadow-2xl border border-white/20"
                  >
                    <h4 className="text-base font-bold text-white mb-2">{spot.title}</h4>
                    <p className="text-sm text-gray-300 mb-4">{spot.desc}</p>
                    <a href="#departments" className="text-xs font-semibold text-neon hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
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
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 group-hover:text-neon transition-colors">
          Discover Why JCET
        </span>
        <div className="w-6 h-10 border-2 border-white/20 group-hover:border-neon/50 rounded-full flex justify-center p-1 transition-colors">
          <motion.div 
            className="w-1 h-2 bg-neon rounded-full" 
            animate={{ y: [0, 16, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
          />
        </div>
      </motion.div>
    </section>
  );
}
