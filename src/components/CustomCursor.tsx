import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const particleIdCounter = useRef(0);
  const lastParticleTime = useRef(0);

  useEffect(() => {
    // Check if it's a touch device (no hover capability)
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouchDevice(true); // Disable effect for reduced motion
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Add particles
      const now = Date.now();
      if (now - lastParticleTime.current > 40) { // Limit particle creation rate
        lastParticleTime.current = now;
        const newParticle: Particle = {
          id: particleIdCounter.current++,
          x: e.clientX,
          y: e.clientY,
          color: Math.random() > 0.5 ? 'bg-purple-400' : 'bg-cyan-400',
        };

        setParticles((prev) => {
          const newParticles = [...prev, newParticle];
          if (newParticles.length > 25) {
            return newParticles.slice(newParticles.length - 25);
          }
          return newParticles;
        });

        // Remove particle after animation
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 800);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Main Cursor */}
      <motion.div
        className={`absolute top-0 left-0 rounded-full transition-colors duration-300 ${
          isHovering ? 'bg-purple-400 blur-md' : 'bg-cyan-400 blur-sm'
        }`}
        animate={{
          x: mousePos.x - (isHovering ? 16 : 8),
          y: mousePos.y - (isHovering ? 16 : 8),
          width: isHovering ? 32 : 16,
          height: isHovering ? 32 : 16,
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.15,
        }}
      />
      
      {/* Core Cursor Dot */}
      <motion.div
        className={`absolute top-0 left-0 rounded-full bg-white transition-colors duration-300`}
        animate={{
          x: mousePos.x - 2,
          y: mousePos.y - 2,
          width: 4,
          height: 4,
          opacity: isHovering ? 0 : 1
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.1,
        }}
      />

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.7, scale: 1, x: particle.x - 2, y: particle.y - 2 }}
            animate={{ opacity: 0, scale: 0, y: particle.y + 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-full ${particle.color}`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
