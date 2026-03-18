/**
 * MagneticCard v1.0.0
 * 
 * README:
 * A premium card component that follows the pointer with subtle translation and rotation.
 * 
 * PROPS:
 * - title: string - Main heading of the card.
 * - subtitle?: string - Secondary text.
 * - imageSrc?: string - Optional background or featured image.
 * - className?: string - Additional Tailwind classes.
 * - children?: ReactNode - Slot for additional content.
 * 
 * USAGE:
 * <MagneticCard 
 *   title="Computer Science" 
 *   subtitle="B.Tech Program"
 *   imageSrc="/path/to/image.jpg"
 * />
 * 
 * PERFORMANCE & ACCESSIBILITY:
 * - Uses requestAnimationFrame and LERP for smooth motion.
 * - Respects prefers-reduced-motion (disables transform).
 * - Touch-friendly (disables pointermove transforms).
 * - Includes alt text for images.
 */

import React, { useRef, useEffect, useState } from 'react';

interface MagneticCardProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  className?: string;
  children?: React.ReactNode;
}

const MagneticCard: React.FC<MagneticCardProps> = ({
  title,
  subtitle,
  imageSrc,
  className = '',
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation state
  const pos = useRef({ x: 0, y: 0, rX: 0, rY: 0 });
  const target = useRef({ x: 0, y: 0, rX: 0, rY: 0 });
  const rafId = useRef<number | null>(null);

  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  const update = () => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.08);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.08);
    pos.current.rX = lerp(pos.current.rX, target.current.rX, 0.08);
    pos.current.rY = lerp(pos.current.rY, target.current.rY, 0.08);

    if (cardRef.current) {
      cardRef.current.style.transform = `
        translate3d(${pos.current.x}px, ${pos.current.y}px, 0)
        rotateX(${pos.current.rX}deg)
        rotateY(${pos.current.rY}deg)
      `;
    }

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
    if (window.matchMedia('(pointer: coarse)').matches || 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (cardRef.current) {
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const intensity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--magnetic-intensity') || '1');
      
      // Max translate 12px, max rotate 3deg
      target.current.x = (deltaX / (width / 2)) * (10 * intensity);
      target.current.y = (deltaY / (height / 2)) * (10 * intensity);
      target.current.rX = -(deltaY / (height / 2)) * (3 * intensity);
      target.current.rY = (deltaX / (width / 2)) * (3 * intensity);
      
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
    target.current.rX = 0;
    target.current.rY = 0;
    
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
      className={`magnetic-wrap perspective-1000 ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={cardRef}
        tabIndex={0}
        className="
          magnetic-card-base
          relative w-full h-full rounded-2xl overflow-hidden
          bg-[#0B0F1A] border border-white/10
          transition-shadow duration-500
          hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(6,182,212,0.1)]
          group
        "
        style={{ transformStyle: 'preserve-3d' }}
      >
        {imageSrc && (
          <div className="absolute inset-0 z-0">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/40 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          <div style={{ transform: 'translateZ(20px)' }}>
            {subtitle && (
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
                {subtitle}
              </p>
            )}
            <h3 className="text-2xl font-bold text-white mb-4">
              {title}
            </h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagneticCard;
