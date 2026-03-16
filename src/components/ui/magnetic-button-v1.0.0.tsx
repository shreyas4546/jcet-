/**
 * MagneticButton v1.0.0
 * 
 * README:
 * A lightweight, accessible button component that subtly follows the pointer.
 * 
 * PROPS:
 * - children: ReactNode - The content of the button.
 * - className?: string - Additional Tailwind classes for the button.
 * - onClick?: () => void - Click handler.
 * - ariaLabel?: string - Accessibility label.
 * 
 * USAGE:
 * <MagneticButton onClick={() => console.log('clicked')}>
 *   Explore Programs
 * </MagneticButton>
 * 
 * PERFORMANCE & ACCESSIBILITY:
 * - Uses requestAnimationFrame and LERP for smooth 60fps motion.
 * - Respects prefers-reduced-motion.
 * - Disables motion on touch devices.
 * - Provides clear focus states for keyboard navigation.
 */

import React, { useRef, useEffect, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  ariaLabel,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation state
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  const update = () => {
    // Smoothly interpolate current position toward target
    pos.current.x = lerp(pos.current.x, target.current.x, 0.1);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.1);

    if (triggerRef.current) {
      triggerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }

    // Continue loop if we haven't reached target or if still hovering
    const distance = Math.sqrt(
      Math.pow(target.current.x - pos.current.x, 2) + 
      Math.pow(target.current.y - pos.current.y, 2)
    );

    if (distance > 0.01 || isHovered) {
      rafId.current = requestAnimationFrame(update);
    } else {
      rafId.current = null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Disable on touch devices or if reduced motion is preferred
    if (window.matchMedia('(pointer: coarse)').matches || 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (triggerRef.current) {
      const { left, top, width, height } = triggerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate distance from center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Max translate 12px
      const intensity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--magnetic-intensity') || '1');
      const maxTranslate = 12 * intensity;
      
      target.current.x = (deltaX / (width / 2)) * maxTranslate;
      target.current.y = (deltaY / (height / 2)) * maxTranslate;
      
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(update);
      }
    }
  };

  const handlePointerEnter = () => setIsHovered(true);
  
  const handlePointerLeave = () => {
    setIsHovered(false);
    target.current.x = 0;
    target.current.y = 0;
    
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(update);
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div 
      className="magnetic-wrap"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        ref={triggerRef}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`
          magnetic-button-base
          relative px-6 py-3 rounded-lg font-semibold text-white
          bg-navy-dark border border-white/10
          transition-all duration-300
          hover:border-neon hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]
          active:scale-95
          ${className}
        `}
        style={{ 
          backgroundColor: '#0A0F1E',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        {children}
      </button>
      
      {/* Optional Framer Motion Variant Snippet (Commented)
      /*
      import { motion } from 'framer-motion';
      <motion.div
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.div>
      */}
    </div>
  );
};

export default MagneticButton;
