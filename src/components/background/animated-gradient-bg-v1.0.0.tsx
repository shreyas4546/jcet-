/**
 * AnimatedGradientBackground v1.0.0
 * 
 * Description: A fixed background component that interpolates gradient colors
 * based on the user's scroll position. Designed for a cinematic, "alive" feel.
 * 
 * Features:
 * - Scroll-reactive gradient shifts.
 * - Framer Motion for smooth transitions.
 * - Respects prefers-reduced-motion.
 * - Optimized for mobile performance.
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

interface Props {
  children: React.ReactNode;
}

const AnimatedGradientBackground: React.FC<Props> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Interpolate colors based on scroll progress
  // 0: Top, 0.5: Middle, 1: Bottom
  const color1 = useTransform(smoothProgress, [0, 0.5, 1], ['#0B0F1A', '#111827', '#000000']);
  const color2 = useTransform(smoothProgress, [0, 0.5, 1], ['#111827', '#000000', '#0B0F1A']);
  const accentOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.05, 0.15, 0.05]);
  const accentScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]);

  // Static gradient for reduced motion
  const staticGradient = 'linear-gradient(180deg, #0B0F1A 0%, #111827 50%, #000000 100%)';

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Layer */}
      <motion.div 
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background: shouldReduceMotion 
            ? staticGradient 
            : `linear-gradient(180deg, ${color1.get()} 0%, ${color2.get()} 100%)`
        }}
      >
        {/* Dynamic Background Update */}
        {!shouldReduceMotion && (
          <motion.div 
            className="absolute inset-0"
            style={{
              background: useTransform(
                [color1, color2],
                ([c1, c2]) => `linear-gradient(180deg, ${c1} 0%, ${c2} 100%)`
              )
            }}
          />
        )}

        {/* Subtle Accent Glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] max-h-[800px] bg-purple-500/20 rounded-full blur-[160px] pointer-events-none"
          style={{
            opacity: shouldReduceMotion ? 0.05 : accentOpacity,
            scale: shouldReduceMotion ? 1 : accentScale,
          }}
        />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradientBackground;
