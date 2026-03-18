import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/cursor-v1.3.css';
import { ParticleTrailV1_3, ParticleTrailRef } from './particle-trail-v1.3';

function lerp(start: number, end: number, amt: number) {
  return start + (end - start) * amt;
}

interface CustomCursorProps {
  debug?: boolean;
}

export default function CustomCursorV1_3({ debug = false }: CustomCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<string>('');

  const cursorRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const particleTrailRef = useRef<ParticleTrailRef>(null);

  const requestRef = useRef<number>();
  const mousePos = useRef({ x: -100, y: -100 });
  const corePos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });
  const lastParticleTime = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    setMounted(true);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    setIsReducedMotion(reducedMotion);
    setIsTouch(coarsePointer);

    // Diagnostics
    const runDiagnostics = () => {
      let info = '--- CURSOR V1.3 DIAGNOSTICS ---\n';
      info += `isReducedMotion: ${reducedMotion}\n`;
      info += `isCoarsePointer: ${coarsePointer}\n`;
      
      if (cursorRef.current) {
        const style = window.getComputedStyle(cursorRef.current);
        info += `Cursor DOM: exists\n`;
        info += `  opacity: ${style.opacity}\n`;
        info += `  display: ${style.display}\n`;
        info += `  z-index: ${style.zIndex}\n`;
        info += `  pointer-events: ${style.pointerEvents}\n`;
        info += `  position: ${style.position}\n`;
      } else {
        info += `Cursor DOM: NOT FOUND\n`;
      }

      const hasLenis = 'Lenis' in window;
      info += `Lenis detected: ${hasLenis}\n`;

      console.info(info);
      if (debug) setDiagnosticInfo(info);
    };

    setTimeout(runDiagnostics, 1000);

    if (coarsePointer || reducedMotion) {
      return; // Do not attach listeners or rAF
    }

    document.body.classList.add('custom-cursor-active');

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-hover, [data-cursor="hover"]');
      isHovering.current = !!interactive;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    const update = () => {
      // Lerp positions
      corePos.current.x = lerp(corePos.current.x, mousePos.current.x, 0.18);
      corePos.current.y = lerp(corePos.current.y, mousePos.current.y, 0.18);

      haloPos.current.x = lerp(haloPos.current.x, mousePos.current.x, 0.08);
      haloPos.current.y = lerp(haloPos.current.y, mousePos.current.y, 0.08);

      // Apply transforms
      if (coreRef.current) {
        const scale = isHovering.current ? 1.35 : 1;
        coreRef.current.style.transform = `translate3d(${corePos.current.x}px, ${corePos.current.y}px, 0) scale(${scale})`;
      }
      if (haloRef.current) {
        const scale = isHovering.current ? 1.2 : 1;
        haloRef.current.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0) scale(${scale})`;
        if (isHovering.current) {
          haloRef.current.classList.add('hovering');
        } else {
          haloRef.current.classList.remove('hovering');
        }
      }

      // Spawn particles
      const now = Date.now();
      if (now - lastParticleTime.current >= 30) {
        const dx = mousePos.current.x - corePos.current.x;
        const dy = mousePos.current.y - corePos.current.y;
        // Only spawn if moving
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          lastParticleTime.current = now;
          particleTrailRef.current?.spawn(corePos.current.x, corePos.current.y);
        }
      }

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!mounted || isTouch || isReducedMotion) return null;

  const cursorContent = (
    <div ref={cursorRef} className="cursor-v1-3-root">
      <div ref={haloRef} className="cursor-v1-3-halo" />
      <div ref={coreRef} className="cursor-v1-3-core" />
      <ParticleTrailV1_3 ref={particleTrailRef} />
      
      {debug && diagnosticInfo && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: '#0f0',
          padding: '10px',
          fontFamily: 'monospace',
          fontSize: '10px',
          zIndex: 9999999,
          pointerEvents: 'none',
          whiteSpace: 'pre'
        }}>
          {diagnosticInfo}
        </div>
      )}
    </div>
  );

  return createPortal(cursorContent, document.body);
}
