import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

export interface ParticleTrailRef {
  spawn: (x: number, y: number) => void;
}

interface ParticleData {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  el: HTMLDivElement | null;
}

export const ParticleTrailV1_3 = forwardRef<ParticleTrailRef, {}>((props, ref) => {
  const MAX_PARTICLES = 18;
  const poolRef = useRef<ParticleData[]>([]);
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  // Initialize pool
  useEffect(() => {
    const colors = ['var(--cursor-color)', 'var(--cursor-accent)', 'var(--cursor-pink)'];
    poolRef.current = Array.from({ length: MAX_PARTICLES }).map(() => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 3, // 2-5px
      el: null,
    }));

    const update = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      poolRef.current.forEach((p) => {
        if (!p.active || !p.el) return;

        p.life -= dt;
        if (p.life <= 0) {
          p.active = false;
          p.el.style.opacity = '0';
          return;
        }

        p.x += p.vx * (dt / 16.66);
        p.y += p.vy * (dt / 16.66);
        
        // Add slight drag
        p.vx *= 0.94;
        p.vy *= 0.94;

        const progress = p.life / p.maxLife;
        const opacity = Math.max(0, progress);

        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        p.el.style.opacity = opacity.toString();
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    spawn: (x: number, y: number) => {
      const pool = poolRef.current;
      // Find inactive particle
      const p = pool.find((p) => !p.active);
      if (!p || !p.el) return;

      p.active = true;
      p.x = x;
      p.y = y;
      
      // Random outward velocity
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 2.8; // Increased speed (was 0.5 + 1.5)
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      
      p.maxLife = 400 + Math.random() * 500; // 400-900ms
      p.life = p.maxLife;

      // Reset DOM state immediately
      p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      p.el.style.opacity = '1';
      p.el.style.width = `${p.size}px`;
      p.el.style.height = `${p.size}px`;
      p.el.style.backgroundColor = p.color;
      p.el.style.marginLeft = `${-p.size / 2}px`;
      p.el.style.marginTop = `${-p.size / 2}px`;
    },
  }));

  return (
    <>
      {Array.from({ length: MAX_PARTICLES }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (poolRef.current[i]) poolRef.current[i].el = el;
          }}
          className="cursor-v1-3-particle"
        />
      ))}
    </>
  );
});

ParticleTrailV1_3.displayName = 'ParticleTrailV1_3';
