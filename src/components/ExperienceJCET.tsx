import { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

/* ──────────────────────────────────────────────
   ExperienceJCET — Hyper Scroll // Brutal Mode (Finite)
   Adapted to JCET palette & React (One Loop, Filled 3D Text)
   Includes Dark & Light Mode Support via ThemeContext
   ────────────────────────────────────────────── */

interface ItemData {
  el: HTMLDivElement;
  type: 'card' | 'text' | 'star';
  x: number;
  y: number;
  rot: number;
  baseZ: number;
}

const JCET_TEXTS = [
  'ENGINEERING',
  'CAMPUS',
  'JCET',
  'PLACEMENTS',
  'TECHNOLOGY',
];

const JCET_CARD_DATA = [
  { title: 'Welcome to JCET', titleKey: 'exp.slide1.title', descKey: 'exp.slide1.desc' },
  { title: 'Advanced Labs', titleKey: 'exp.slide2.title', descKey: 'exp.slide2.desc' },
  { title: 'Industry Placements', titleKey: 'exp.slide3.title', descKey: 'exp.slide3.desc' },
  { title: 'Campus Life', titleKey: 'exp.slide4.title', descKey: 'exp.slide4.desc' },
  { title: 'Start Journey', titleKey: 'exp.slide5.title', descKey: 'exp.slide5.desc' },
];

const CONFIG = {
  itemCount: 10,
  starCount: 150,
  zGap: 1400,
  camSpeed: 1.8,
  colors: ['#7C3AED', '#06B6D4', '#F472B6', '#F59E0B'],
};

export default function ExperienceJCET() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<ItemData[]>([]);
  const stateRef = useRef({ scroll: 0, velocity: 0, targetSpeed: 0, mouseX: 0, mouseY: 0 });
  const rafRef = useRef<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const velRef = useRef<HTMLElement>(null);
  const coordRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Reduced motion detection
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  // Intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0, rootMargin: '200px' }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Build the 3D world items
  const buildWorld = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;

    // Clear existing for theme switches
    world.innerHTML = '';
    const items: ItemData[] = [];

    const isLight = theme === 'light';
    const textBase = isLight ? '#1e293b' : '#ffffff';
    const textDim = isLight ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.7)';
    const textFaint = isLight ? 'rgba(30,41,59,0.4)' : 'rgba(255,255,255,0.4)';
    const surface = isLight ? 'rgba(255,255,255,0.6)' : 'rgba(17,24,39,0.5)';
    const border = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
    const shadowBase = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.5)';
    
    // 3D text styling depends heavily on theme
    const solidTextShadow = isLight 
      ? `0 1px 0 #cbd5e1, 0 2px 0 #94a3b8, 0 3px 0 #64748b, 0 4px 0 #475569, 0 5px 0 #334155, 0 10px 20px rgba(0,0,0,0.15)`
      : `0 1px 0 #cbd5e1, 0 2px 0 #94a3b8, 0 3px 0 #64748b, 0 4px 0 #475569, 0 5px 0 #334155, 0 6px 0 #1e293b, 0 10px 20px rgba(0,0,0,0.8)`;

    for (let i = 0; i < CONFIG.itemCount; i++) {
      const el = document.createElement('div');
      el.className = 'exp-item';
      el.style.cssText = 'position:absolute;left:0;top:0;backface-visibility:hidden;transform-origin:center center;display:flex;align-items:center;justify-content:center;';

      const isHeading = i % 2 === 0;

      if (isHeading) {
        const textIndex = Math.floor(i / 2);
        const txt = document.createElement('div');
        txt.className = 'exp-big-text';
        txt.innerText = JCET_TEXTS[textIndex];
        
        txt.style.cssText = `
          font-size: 16vw;
          font-weight: 900;
          color: ${textBase};
          text-transform: uppercase;
          white-space: nowrap;
          transform: translate(-50%, -50%);
          pointer-events: none;
          letter-spacing: -0.2rem;
          font-family: "Cabinet Grotesque", ui-sans-serif, system-ui, sans-serif;
          text-shadow: ${solidTextShadow};
        `;
        el.appendChild(txt);
        items.push({ el, type: 'text', x: 0, y: 0, rot: 0, baseZ: -i * CONFIG.zGap });
      } else {
        const cardIndex = Math.floor(i / 2);
        const cardData = JCET_CARD_DATA[cardIndex];
        const accent = CONFIG.colors[i % CONFIG.colors.length];
        const randId = String(Math.floor(Math.random() * 9999)).padStart(4, '0');

        const card = document.createElement('div');
        card.className = 'exp-card';
        card.style.cssText = `width:320px;height:460px;background:${surface};border:1px solid ${border};position:relative;padding:2rem;display:flex;flex-direction:column;justify-content:space-between;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 0 0 1px ${shadowBase},0 20px 50px ${shadowBase};transition:border-color 0.3s,box-shadow 0.3s, background 0.3s;transform:translate(-50%,-50%);border-radius:12px;cursor:pointer;`;
        card.innerHTML = `
          <div style="border-bottom:1px solid ${border};padding-bottom:1rem;margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-family:'JetBrains Mono',monospace;color:${accent};font-size:0.8rem;">ID-${randId}</span>
            <div style="width:10px;height:10px;background:${accent};border-radius:2px;"></div>
          </div>
          <h2 style="font-size:2.2rem;line-height:0.95;margin:0;text-transform:uppercase;font-weight:800;color:${textBase};font-family:'Cabinet Grotesque',ui-sans-serif,system-ui,sans-serif;">${cardData.title}</h2>
          <p style="font-size:0.85rem;color:${textDim};margin:0.5rem 0 0;line-height:1.5;font-family:'Inter',system-ui,sans-serif;">${t(cardData.descKey)}</p>
          <div style="margin-top:auto;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:${textFaint};display:flex;justify-content:space-between;padding-top:1rem;">
            <span>DEPT: CSE</span>
            <span>JCET.EDU.IN</span>
          </div>
          <div style="position:absolute;bottom:2rem;right:2rem;font-size:4rem;opacity:${isLight ? '0.1' : '0.2'};font-weight:900;color:${accent};font-family:'Cabinet Grotesque',system-ui,sans-serif;">${String(cardIndex + 1).padStart(2, '0')}</div>
        `;

        card.addEventListener('mouseenter', () => {
          card.style.borderColor = accent;
          card.style.boxShadow = `0 0 30px ${accent}44`;
          card.style.background = isLight ? 'rgba(255,255,255,0.9)' : 'rgba(17,24,39,0.7)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.borderColor = border;
          card.style.boxShadow = `0 0 0 1px ${shadowBase},0 20px 50px ${shadowBase}`;
          card.style.background = surface;
        });

        el.appendChild(card);

        const angle = (i / CONFIG.itemCount) * Math.PI * 6;
        const x = Math.cos(angle) * (window.innerWidth * 0.25);
        const y = Math.sin(angle) * (window.innerHeight * 0.25);
        const rot = (Math.random() - 0.5) * 20;

        items.push({ el, type: 'card', x, y, rot, baseZ: -i * CONFIG.zGap });
      }

      world.appendChild(el);
    }

    // Stars
    for (let i = 0; i < CONFIG.starCount; i++) {
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;width:2px;height:2px;background:${textBase};transform:translate(-50%,-50%);border-radius:50%;opacity:${isLight ? '0.2' : '1'}`;
      world.appendChild(el);
      items.push({
        el,
        type: 'star',
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * (CONFIG.itemCount * CONFIG.zGap),
        rot: 0,
      });
    }

    itemsRef.current = items;
  }, [t, theme]);

  // Handle building world when theme or language changes
  useEffect(() => {
    buildWorld();
  }, [buildWorld]);

  // Mouse tracking
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // RAF loop
  useEffect(() => {
    if (!isActive || reduceMotion) return;

    const tick = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const rawScroll = Math.max(0, -rect.top);
        const newSpeed = rawScroll - stateRef.current.scroll;
        stateRef.current.targetSpeed = newSpeed;
        stateRef.current.scroll = rawScroll;
      }

      stateRef.current.velocity += (stateRef.current.targetSpeed - stateRef.current.velocity) * 0.1;

      render();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, reduceMotion]);

  // Core render function
  const render = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const world = worldRef.current;
    if (!world) return;
    const s = stateRef.current;

    const tiltX = s.mouseY * 5 - s.velocity * 0.3;
    const tiltY = s.mouseX * 5;
    world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    const baseFov = 1000;
    const fov = baseFov - Math.min(Math.abs(s.velocity) * 8, 500);
    viewport.style.perspective = `${fov}px`;

    if (velRef.current) velRef.current.innerText = Math.abs(s.velocity).toFixed(2);
    if (coordRef.current) coordRef.current.innerText = s.scroll.toFixed(0);

    const cameraZ = s.scroll * CONFIG.camSpeed;
    const isLight = document.documentElement.classList.contains('light');

    itemsRef.current.forEach((item) => {
      let relZ = item.baseZ + cameraZ;
      let alpha = 1;

      if (item.type !== 'star') {
        if (relZ < -3000) alpha = 0;
        else if (relZ < -2000) alpha = (relZ + 3000) / 1000;
        if (relZ > 200) alpha = 1 - (relZ - 200) / 400;
      } else {
        const starLoop = CONFIG.itemCount * CONFIG.zGap;
        relZ = ((relZ % starLoop) + starLoop) % starLoop;
        if (relZ > 500) relZ -= starLoop;
        if (relZ < -3000) alpha = 0;
        else if (relZ < -2000) alpha = (relZ + 3000) / 1000;
        if (relZ > 100) alpha = 1 - (relZ - 100) / 400;
      }

      if (alpha < 0) alpha = 0;
      item.el.style.opacity = `${alpha}`;

      if (alpha > 0) {
        let trans = `translate3d(${item.x}px, ${item.y}px, ${relZ}px)`;

        if (item.type === 'star') {
          const stretch = Math.max(1, Math.min(1 + Math.abs(s.velocity) * 0.1, 8));
          trans += ` scale3d(1, 1, ${stretch})`;
        } else if (item.type === 'text') {
          trans += ` rotateZ(${item.rot}deg)`;
          const textEl = item.el.firstChild as HTMLElement;
          if (textEl) {
            const solidTextShadow = isLight 
              ? `0 1px 0 #cbd5e1, 0 2px 0 #94a3b8, 0 3px 0 #64748b, 0 4px 0 #475569, 0 5px 0 #334155, 0 10px 20px rgba(0,0,0,0.15)`
              : `0 1px 0 #cbd5e1, 0 2px 0 #94a3b8, 0 3px 0 #64748b, 0 4px 0 #475569, 0 5px 0 #334155, 0 6px 0 #1e293b, 0 10px 20px rgba(0,0,0,0.8)`;

            if (Math.abs(s.velocity) > 1) {
              const offset = s.velocity * 1.5;
              textEl.style.textShadow = `${offset}px 0 rgba(124,58,237,0.8), ${-offset}px 0 rgba(6,182,212,0.8), ${solidTextShadow}`;
            } else {
              textEl.style.textShadow = solidTextShadow;
            }
          }
        } else {
          const now = performance.now() * 0.001;
          const float = Math.sin(now + item.x) * 10;
          trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
        }

        item.el.style.transform = trans;
      }
    });
  }, []);

  if (reduceMotion) {
    return (
      <section className="bg-base transition-colors duration-500" aria-label="Experience JCET">
        {JCET_CARD_DATA.map((slide, i) => (
          <div key={i} className="min-h-[50vh] flex items-center justify-center px-6">
            <div className="text-center max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6" style={{ color: CONFIG.colors[i % CONFIG.colors.length] }}>
                {t(slide.titleKey)}
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">{t(slide.descKey)}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  const isLight = theme === 'light';

  return (
    <section
      ref={sectionRef}
      className="relative bg-base transition-colors duration-500"
      style={{ height: '800vh' }}
      aria-label="Experience JCET"
    >
      <div className="sticky top-0 w-full h-screen" style={{ overflow: 'hidden' }}>

        {/* ── Post-processing overlays ── */}
        <div
          className="absolute inset-0 pointer-events-none z-[10]"
          style={{
            background: isLight 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2) 100%)',
            backgroundSize: '100% 4px',
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 pointer-events-none z-[11]"
          style={{ background: isLight ? 'radial-gradient(circle, transparent 40%, #f8fafc 120%)' : 'radial-gradient(circle, transparent 40%, #0B0F1A 120%)' }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 pointer-events-none z-[12] mix-blend-overlay"
          style={{
            opacity: isLight ? 0.03 : 0.07,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* ── HUD ── */}
        <div
          className="absolute z-[20] pointer-events-none flex flex-col justify-between font-mono text-[10px] uppercase"
          style={{ inset: '2rem', color: isLight ? 'rgba(30,41,59,0.5)' : 'rgba(255,255,255,0.4)' }}
          aria-hidden="true"
        >
          <div className="flex justify-between items-center">
            <span>SYS.READY</span>
            <div className={`flex-1 h-px mx-4 relative ${isLight ? 'bg-black/10' : 'bg-white/20'}`}>
              <div className="absolute right-0 -top-[2px] w-[5px] h-[5px] bg-accent-primary" />
            </div>
            <span>JCET // <strong className="text-accent-secondary">EXPERIENCE</strong></span>
          </div>

          <div className={`self-start mt-auto mb-auto ${isLight ? 'text-slate-900/40' : 'text-white/30'}`} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            SCROLL VELOCITY // <strong ref={velRef} className="text-accent-secondary">0.00</strong>
          </div>

          <div className="flex justify-between items-center">
            <span>COORD: <strong ref={coordRef} className="text-accent-secondary">000</strong></span>
            <div className={`flex-1 h-px mx-4 relative ${isLight ? 'bg-black/10' : 'bg-white/20'}`}>
              <div className="absolute right-0 -top-[2px] w-[5px] h-[5px] bg-accent-primary" />
            </div>
            <span>VER 2.0 [JCET]</span>
          </div>
        </div>

        {/* ── 3D Viewport ── */}
        <div
          ref={viewportRef}
          className="absolute inset-0 z-[1] overflow-hidden bg-transparent"
          style={{ perspective: '1000px' }}
        >
          <div
            ref={worldRef}
            className="absolute top-1/2 left-1/2 will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>
      </div>
    </section>
  );
}
