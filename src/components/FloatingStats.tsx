import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function FloatingStats() {
  return (
    <div className="relative z-40 -mt-8 section-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="glass-card px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto"
      >
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-accent-primary mb-1">
            <Counter end={95} suffix="%" />
          </h3>
          <p className="text-text-muted font-medium uppercase tracking-wider text-xs">Placements</p>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-accent-secondary mb-1">
            <Counter end={120} suffix="+" />
          </h3>
          <p className="text-text-muted font-medium uppercase tracking-wider text-xs">Recruiters</p>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-accent-pink mb-1">
            <Counter end={3500} suffix="+" />
          </h3>
          <p className="text-text-muted font-medium uppercase tracking-wider text-xs">Students</p>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-accent-warm mb-1">
            <Counter end={40} suffix="+" />
          </h3>
          <p className="text-text-muted font-medium uppercase tracking-wider text-xs">Labs</p>
        </div>
      </motion.div>
    </div>
  );
}
