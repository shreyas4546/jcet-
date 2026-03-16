/**
 * README: ScrollStory Component
 * 
 * Description: An aesthetic, scroll-triggered storytelling section for JCET.
 * It pins to the viewport on desktop, allowing users to scroll through stacked panels
 * with smooth Framer Motion transitions. On mobile, it falls back to a sequential stacked layout.
 * 
 * Props: None required by default, but can be extended to accept custom story data.
 * 
 * How to import:
 * ```tsx
 * import ScrollStory from './components/story/scroll-story-v1.0.0';
 * 
 * export default function App() {
 *   return (
 *     <main>
 *       <ScrollStory />
 *     </main>
 *   );
 * }
 * ```
 * 
 * Note: Uses standard <img> tags with loading="lazy" instead of next/image as this is a Vite project.
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ChevronDown, GraduationCap, Lightbulb, Users, Trophy } from 'lucide-react';

const STORY_PANELS = [
  {
    id: 'legacy',
    title: 'A Legacy of Excellence',
    description: 'For over a decade, JCET has been at the forefront of engineering education, nurturing minds that build the future. Our foundation is built on rigorous academics and unwavering dedication.',
    stat: '10+ Years of Trust',
    icon: GraduationCap,
    image: 'https://picsum.photos/seed/jcet-legacy/800/1000?blur=2',
    alt: 'Historic view of JCET main building with students walking'
  },
  {
    id: 'innovation',
    title: 'Innovation Hub',
    description: 'Step into our state-of-the-art laboratories and maker spaces. We provide the tools, technology, and mentorship required to turn abstract ideas into tangible, real-world solutions.',
    stat: '25+ Advanced Labs',
    icon: Lightbulb,
    image: 'https://picsum.photos/seed/jcet-innovation/800/1000',
    alt: 'Students working on robotics in the advanced tech laboratory'
  },
  {
    id: 'culture',
    title: 'Vibrant Campus Life',
    description: 'Education extends beyond the classroom. Our campus is a melting pot of cultures, ideas, and talents, hosting annual tech fests, cultural symposiums, and sports tournaments.',
    stat: '50+ Student Clubs',
    icon: Users,
    image: 'https://picsum.photos/seed/jcet-culture/800/1000',
    alt: 'Large crowd of students enjoying a cultural festival on campus'
  },
  {
    id: 'futures',
    title: 'Shaping Futures',
    description: 'Our dedicated placement cell ensures that every student is industry-ready. With strong corporate tie-ups, JCET alumni are leading innovations in top global tech giants.',
    stat: '95% Placement Rate',
    icon: Trophy,
    image: 'https://picsum.photos/seed/jcet-futures/800/1000',
    alt: 'Happy graduate holding an offer letter in front of the campus'
  }
];

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport to disable pinning
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isMobile) {
      // Map scroll progress (0 to 1) to panel index (0 to length - 1)
      const index = Math.min(
        STORY_PANELS.length - 1,
        Math.floor(latest * STORY_PANELS.length)
      );
      setActiveIndex(index);
    }
  });

  // Desktop Pinned Layout
  if (!isMobile) {
    return (
      <section 
        ref={containerRef} 
        className="relative bg-[#001226]"
        style={{ height: `${STORY_PANELS.length * 100}vh` }}
        aria-label="JCET Story Timeline"
      >
        {/* Live region for accessibility */}
        <div className="sr-only" aria-live="polite">
          Currently viewing: {STORY_PANELS[activeIndex].title}
        </div>

        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-12 gap-8 items-center h-full py-20">
            
            {/* Progress Indicator (Left) */}
            <div className="col-span-1 flex flex-col items-center justify-center h-full relative z-20">
              <div className="absolute top-1/2 bottom-1/2 w-0.5 bg-white/10 -translate-y-1/2 h-1/2" />
              <div className="flex flex-col justify-between h-1/2 relative z-10">
                {STORY_PANELS.map((_, idx) => (
                  <button
                    key={idx}
                    className="group relative flex items-center justify-center focus:outline-none"
                    onClick={() => {
                      // Scroll to specific section
                      const windowHeight = window.innerHeight;
                      window.scrollTo({
                        top: containerRef.current!.offsetTop + (idx * windowHeight),
                        behavior: 'smooth'
                      });
                    }}
                    aria-label={`Go to story panel ${idx + 1}`}
                    aria-current={activeIndex === idx ? 'step' : undefined}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeIndex === idx ? 'bg-[#00E5FF] scale-150 shadow-[0_0_10px_#00E5FF]' : 'bg-white/30 group-hover:bg-white/60'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content (Center) */}
            <div className="col-span-6 relative h-full flex items-center z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="glass-panel p-10 md:p-12 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
                >
                  {React.createElement(STORY_PANELS[activeIndex].icon, { 
                    className: "w-12 h-12 text-[#FFC857] mb-6" 
                  })}
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    {STORY_PANELS[activeIndex].title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                    {STORY_PANELS[activeIndex].description}
                  </p>
                  <div className="inline-block bg-[#002752]/80 border border-[#00E5FF]/30 px-6 py-3 rounded-full">
                    <span className="text-[#00E5FF] font-semibold tracking-wide">
                      {STORY_PANELS[activeIndex].stat}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative Visual (Right) */}
            <div className="col-span-5 relative h-[70vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001226] via-transparent to-transparent z-10 opacity-80" />
                  <img 
                    src={STORY_PANELS[activeIndex].image} 
                    alt={STORY_PANELS[activeIndex].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // Mobile Stacked Layout
  return (
    <section className="py-20 bg-[#001226] px-6 space-y-24" aria-label="JCET Story Timeline">
      {STORY_PANELS.map((panel, idx) => (
        <MobilePanel key={panel.id} panel={panel} index={idx} />
      ))}
    </section>
  );
}

// Sub-component for mobile view to handle individual intersection observers
function MobilePanel({ panel, index }: { panel: typeof STORY_PANELS[0], index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden mb-8 relative border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-[#001226] via-[#001226]/40 to-transparent z-10" />
        <img 
          src={panel.image} 
          alt={panel.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-6 left-6 z-20">
          <div className="inline-block bg-[#002752]/90 backdrop-blur-md border border-[#00E5FF]/30 px-4 py-2 rounded-full">
            <span className="text-[#00E5FF] font-semibold text-sm">
              {panel.stat}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFC857]">
          {React.createElement(panel.icon, { size: 20 })}
        </div>
        <div className="text-[#00E5FF] font-mono text-sm font-bold tracking-widest">
          0{index + 1}
        </div>
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-4">{panel.title}</h3>
      <p className="text-gray-300 leading-relaxed text-lg">{panel.description}</p>
    </motion.div>
  );
}
