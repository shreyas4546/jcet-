import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/cursor-v1.1.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  createdAt: number;
}

interface CustomCursorProps {
  debug?: boolean;
}

export default function CustomCursorV1_1({ debug = false }: CustomCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [diagnosticInfo, setDiagnosticInfo] = useState<string>('');

  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const particleId = useRef(0);
  const lastParticleTime = useRef(0);

  useEffect(() => {
    setMounted(true);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    setIsReducedMotion(reducedMotion);
    setIsTouch(coarsePointer);

    // Transform Search Utility & Diagnostics
    const runDiagnostics = () => {
      let info = '--- CURSOR DIAGNOSTICS ---\n';
      info += `isReducedMotion: ${reducedMotion}\n`;
      info += `isCoarsePointer: ${coarsePointer}\n`;

      const hasLenis = 'Lenis' in window;
      const scrollWrapper = document.querySelector('[data-scroll-container], #smooth-wrapper');
      info += `Smooth Scroll (Lenis): ${hasLenis}\n`;
      info += `Smooth Scroll (Wrapper): ${!!scrollWrapper}\n`;

      if (cursorRef.current) {
        const style = window.getComputedStyle(cursorRef.current);
        info += `Cursor DOM: exists\n`;
        info += `  opacity: ${style.opacity}\n`;
        info += `  display: ${style.display}\n`;
        info += `  z-index: ${style.zIndex}\n`;
        info += `  pointer-events: ${style.pointerEvents}\n`;

        // Check ancestors
        let current = cursorRef.current.parentElement;
        const transforms = [];
        while (current) {
          const pStyle = window.getComputedStyle(current);
          if (pStyle.transform && pStyle.transform !== 'none') {
            transforms.push(`${current.nodeName} (${current.className}): ${pStyle.transform}`);
          }
          current = current.parentElement;
        }
        if (transforms.length > 0) {
          info += `Ancestor Transforms Found:\n  ${transforms.join('\n  ')}\n`;
          info += `-> FIX APPLIED: Cursor is portaled to document.body to escape transforms.\n`;
        } else {
          info += `Ancestor Transforms: None\n`;
        }
      }

      info += `RAF: Running OK\n`;

      console.info(info);
      if (debug) setDiagnosticInfo(info);
    };

    // Delay diagnostics slightly to ensure DOM is ready
    setTimeout(runDiagnostics, 500);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .interactive');
      setHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    const update = () => {
      if (!reducedMotion) {
        // Lerp
        currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.2;
        currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.2;
      } else {
        // Direct
        currentPos.current.x = mousePos.current.x;
        currentPos.current.y = mousePos.current.y;
      }

      if (cursorRef.current) {
        cursorRef.current.style.setProperty('--x', `${currentPos.current.x}px`);
        cursorRef.current.style.setProperty('--y', `${currentPos.current.y}px`);
      }

      // Particles
      if (!reducedMotion && !coarsePointer) {
        const now = Date.now();
        if (now - lastParticleTime.current > 50 && (Math.abs(mousePos.current.x - currentPos.current.x) > 1 || Math.abs(mousePos.current.y - currentPos.current.y) > 1)) {
          lastParticleTime.current = now;
          setParticles(prev => {
            const newP = {
              id: particleId.current++,
              x: currentPos.current.x,
              y: currentPos.current.y,
              color: Math.random() > 0.5 ? 'bg-purple-400' : 'bg-cyan-400',
              createdAt: now
            };
            const next = [...prev, newP];
            return next.length > 20 ? next.slice(next.length - 20) : next;
          });
        }
      }

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [debug]);

  // Particle cleanup loop
  useEffect(() => {
    if (isReducedMotion || isTouch) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(p => now - p.createdAt < 600));
    }, 100);
    return () => clearInterval(interval);
  }, [isReducedMotion, isTouch]);

  if (!mounted || isTouch) return null;

  const cursorContent = (
    <div ref={cursorRef} className="custom-cursor-root">
      <div className={`custom-cursor-halo ${hovering ? 'hovering' : ''}`} />
      <div className={`custom-cursor-core ${hovering ? 'hovering' : ''}`} />

      {!isReducedMotion && particles.map(p => {
        const age = Date.now() - p.createdAt;
        const progress = Math.min(age / 600, 1);
        const scale = 1 - Math.pow(progress, 2); // Ease out
        const opacity = 1 - progress;
        return (
          <div
            key={p.id}
            className={`custom-cursor-particle ${p.color}`}
            style={{
              '--px': `${p.x}px`,
              '--py': `${p.y}px`,
              '--scale': scale,
              '--opacity': opacity
            } as React.CSSProperties}
          />
        );
      })}

      {debug && diagnosticInfo && (
        <div className="custom-cursor-debug">
          {diagnosticInfo}
        </div>
      )}
    </div>
  );

  return createPortal(cursorContent, document.body);
}
