import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { id: 1, name: 'Rahul Sharma', role: 'B.Tech CSE, Final Year', image: 'https://picsum.photos/seed/rahul/200/200', quote: 'JCET has provided me with the perfect platform to explore my passion for coding. The faculty support and the state-of-the-art labs are exceptional.' },
  { id: 2, name: 'Priya Patil', role: 'B.Tech AI, 3rd Year', image: 'https://picsum.photos/seed/priya/200/200', quote: 'The focus on practical learning and industry projects at JCET is what sets it apart. I feel confident and ready for the professional world.' },
  { id: 3, name: 'Amit Kulkarni', role: 'B.Tech Robotics, 2nd Year', image: 'https://picsum.photos/seed/amit/200/200', quote: 'Being part of the Robotics club at JCET has been an incredible experience. We get to work on real-world problems and participate in national competitions.' },
  { id: 4, name: 'Sneha Deshpande', role: 'M.Tech Cybersecurity', image: 'https://picsum.photos/seed/sneha/200/200', quote: 'The research environment here is very encouraging. The guidance from professors has helped me publish my first paper in an international journal.' },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <section className="section-padding bg-surface/30 relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
            What Our <span className="text-gradient-purple">Students Say</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} className="max-w-2xl mx-auto mt-6 text-lg">
            Discover the experiences and success stories of students who have shaped their future at JCET.
          </motion.p>
        </div>

        <div className="relative h-[400px] md:h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex} custom={direction} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute w-full max-w-4xl glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            >
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-accent-primary/20">
                  <img src={TESTIMONIALS[currentIndex].image} alt={TESTIMONIALS[currentIndex].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-accent-primary text-white p-2 rounded-full shadow-lg">
                  <Quote size={16} fill="currentColor" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg md:text-xl text-text-primary italic mb-6 leading-relaxed">
                  "{TESTIMONIALS[currentIndex].quote}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-text-heading">{TESTIMONIALS[currentIndex].name}</h4>
                  <p className="text-accent-secondary text-sm font-medium">{TESTIMONIALS[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
            <button onClick={prevSlide} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-heading border border-white/[0.08] transition-colors pointer-events-auto group cursor-pointer" aria-label="Previous testimonial">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-heading border border-white/[0.08] transition-colors pointer-events-auto group cursor-pointer" aria-label="Next testimonial">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, index) => (
            <button key={index} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${index === currentIndex ? 'w-8 bg-accent-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
