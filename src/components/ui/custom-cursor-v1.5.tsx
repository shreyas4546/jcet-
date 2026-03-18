import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/cursor-v1.5.css';

function lerp(start: number, end: number, amt: number) {
  return start + (end - start) * amt;
}

interface CustomCursorProps {
  debug?: boolean;
}

/**
 * CustomCursorV1_5
 * Version 1.5: Removed mouse trail (particle effect) as requested.
 * Maintains core cursor and halo with inertia.
 */
export default function CustomCursorV1_5({ debug = false }: CustomCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<string>('');

  const cursorRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  const requestRef = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: -100, y: -100 });
  const corePos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const rafRunning = useRef(false);

  useEffect(() => {
    setMounted(true);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    setIsReducedMotion(reducedMotion);
    setIsTouch(coarsePointer);

    // Diagnostics Utility
    const runDiagnostics = () => {
      let info = '--- CURSOR V1.5 DIAGNOSTICS ---\n';
      info += `isReducedMotion: ${reducedMotion}\n`;
      info += `isCoarsePointer: ${coarsePointer}\n`;
      info += `RAF Running: ${rafRunning.current}\n`;
      info += `Trail Effect: REMOVED\n`;
      
      if (cursorRef.current) {
        const style = window.getComputedStyle(cursorRef.current);
        info += `Cursor DOM: exists\n`;
        info += `  opacity: ${style.opacity}\n`;
        info += `  display: ${style.display}\n`;
        info += `  z-index: ${style.zIndex}\n`;
        info += `  pointer-events: ${style.pointerEvents}\n`;
        info += `  position: ${style.position}\n`;
        info += `  visibility: ${style.visibility}\n`;

        // Ancestor Transform Check
        let parent = cursorRef.current.parentElement;
        let transforms: string[] = [];
        while (parent) {
          const parentStyle = window.getComputedStyle(parent);
          if (parentStyle.transform !== 'none') {
            transforms.push(`${parent.nodeName}: ${parentStyle.transform}`);
          }
          parent = parent.parentElement;
        }
        if (transforms.length > 0) {
          info += `Ancestor Transforms Detected:\n  ${transforms.join('\n  ')}\n`;
        } else {
          info += `No ancestor transforms detected.\n`;
        }
      } else {
        info += `Cursor DOM: NOT FOUND\n`;
      }

      const hasLenis = 'Lenis' in window || !!document.querySelector('.lenis');
      info += `Lenis/SmoothScroll detected: ${hasLenis}\n`;

      console.info(info);
      if (debug) setDiagnosticInfo(info);
    };

    const diagTimeout = setTimeout(runDiagnostics, 1000);

    if (coarsePointer) {
      return; // Do not attach listeners or rAF on touch
    }

    if (!reducedMotion) {
      document.body.classList.add('custom-cursor-active');
    }

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
      rafRunning.current = true;

      const lerpCore = reducedMotion ? 1 : 0.18;
      const lerpHalo = reducedMotion ? 1 : 0.08;

      corePos.current.x = lerp(corePos.current.x, mousePos.current.x, lerpCore);
      corePos.current.y = lerp(corePos.current.y, mousePos.current.y, lerpCore);

      haloPos.current.x = lerp(haloPos.current.x, mousePos.current.x, lerpHalo);
      haloPos.current.y = lerp(haloPos.current.y, mousePos.current.y, lerpHalo);

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

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      clearTimeout(diagTimeout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('custom-cursor-active');
      rafRunning.current = false;
    };
  }, [debug]);

  if (!mounted || isTouch) return null;

  const cursorContent = (
    <div 
      ref={cursorRef} 
      className="cursor-v1-5-root"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'transform, opacity',
        opacity: 1,
        display: 'block',
        visibility: 'visible'
      }}
    >
      <div ref={haloRef} className="cursor-v1-5-halo" />
      {!isReducedMotion && <div ref={coreRef} className="cursor-v1-5-core" />}
      
      {debug && diagnosticInfo && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.85)',
          color: '#0f0',
          padding: '12px',
          fontFamily: 'monospace',
          fontSize: '11px',
          zIndex: 9999999,
          pointerEvents: 'none',
          whiteSpace: 'pre',
          border: '1px solid #0f0',
          borderRadius: '4px',
          boxShadow: '0 0 10px rgba(0,255,0,0.2)'
        }}>
          {diagnosticInfo}
        </div>
      )}
    </div>
  );

  return createPortal(cursorContent, document.body);
}
