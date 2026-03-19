import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const IMAGES = [
  { id: 1, src: 'https://picsum.photos/seed/campus1/1200/800', alt: 'Main Campus Building' },
  { id: 2, src: 'https://picsum.photos/seed/lab1/1200/800', alt: 'Robotics Laboratory' },
  { id: 3, src: 'https://picsum.photos/seed/library/1200/800', alt: 'Central Library' },
  { id: 4, src: 'https://picsum.photos/seed/sports/1200/800', alt: 'Sports Complex' },
  { id: 5, src: 'https://picsum.photos/seed/event/1200/800', alt: 'Annual Tech Fest' },
  { id: 6, src: 'https://picsum.photos/seed/class/1200/800', alt: 'Smart Classroom' },
  { id: 7, src: 'https://picsum.photos/seed/cafe/1200/800', alt: 'Student Cafeteria' },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextSlide = useCallback(() => { setDirection(1); setCurrentIndex((prev) => (prev + 1) % IMAGES.length); }, []);
  const prevSlide = useCallback(() => { setDirection(-1); setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length); }, []);
  const goToSlide = (index: number) => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
  };

  return (
    <section className="section-padding bg-surface/30 relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
            Campus <span className="text-gradient-multi">Gallery</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} className="max-w-2xl mx-auto">
            Take a virtual tour through our world-class facilities and vibrant campus life.
          </motion.p>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden glass-card border-white/[0.08] shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div key={currentIndex} custom={direction} variants={variants}
                initial="enter" animate="center" exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={1}
                onDragEnd={(_, info) => { if (info.offset.x > 100) prevSlide(); else if (info.offset.x < -100) nextSlide(); }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <img src={IMAGES[currentIndex].src} alt={IMAGES[currentIndex].alt} className="w-full h-full object-cover select-none" referrerPolicy="no-referrer" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={`info-${currentIndex}`} transition={{ delay: 0.2 }}>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{IMAGES[currentIndex].alt}</h3>
                    <button onClick={() => setIsLightboxOpen(true)} className="flex items-center gap-2 text-accent-secondary text-sm font-medium hover:underline cursor-pointer">
                      <Maximize2 size={16} /> View Fullscreen
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button onClick={prevSlide} className="p-3 rounded-full bg-base/50 backdrop-blur-md text-text-heading border border-white/[0.08] hover:bg-accent-primary hover:text-white transition-all pointer-events-auto cursor-pointer" aria-label="Previous image">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="p-3 rounded-full bg-base/50 backdrop-blur-md text-text-heading border border-white/[0.08] hover:bg-accent-primary hover:text-white transition-all pointer-events-auto cursor-pointer" aria-label="Next image">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3 overflow-x-auto pb-4 hide-scrollbar px-4">
            {IMAGES.map((img, index) => (
              <button key={img.id} onClick={() => goToSlide(index)}
                className={`relative shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  index === currentIndex ? 'border-accent-primary scale-110 glow-purple' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.src} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsLightboxOpen(false)} className="absolute inset-0 bg-base/98 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-7xl max-h-[90vh] z-10">
              <button onClick={() => setIsLightboxOpen(false)} className="absolute -top-12 right-0 p-2 text-text-muted hover:text-text-heading transition-colors cursor-pointer" aria-label="Close fullscreen">
                <X size={32} />
              </button>
              <img src={IMAGES[currentIndex].src} alt={IMAGES[currentIndex].alt} referrerPolicy="no-referrer" className="w-full h-full object-contain max-h-[85vh] rounded-xl shadow-2xl" loading="lazy" />
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold">{IMAGES[currentIndex].alt}</h3>
                <p className="text-text-muted text-sm mt-1">Image {currentIndex + 1} of {IMAGES.length}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
