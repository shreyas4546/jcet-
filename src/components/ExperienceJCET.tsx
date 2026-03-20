import { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { GraduationCap, Lightbulb, Users, Trophy, Rocket } from 'lucide-react';

/* ══════════════════════════════════════════════
   ExperienceJCET — Hyper Scroll // JCET Edition
   Adapted from CodePen "HYPER SCROLL // BRUTAL MODE"
   Single-pass, responsive, theme-aware
   ══════════════════════════════════════════════ */

interface ItemData {
  el: HTMLDivElement;
  type: 'card' | 'text' | 'star';
  x: number;
  y: number;
  rot: number;
  baseZ: number;
}

const JCET_TEXTS = ['ENGINEERING', 'INNOVATION', 'JCET', 'CAMPUS', 'FUTURE'];

const JCET_CARDS = [
  { title: 'Welcome to JCET', titleKey: 'exp.slide1.title', descKey: 'exp.slide1.desc', dept: 'ALL', tag: 'JCET.EDU.IN' },
  { title: 'Advanced Labs', titleKey: 'exp.slide2.title', descKey: 'exp.slide2.desc', dept: 'R&D', tag: '25+ LABS' },
  { title: 'Industry Placements', titleKey: 'exp.slide3.title', descKey: 'exp.slide3.desc', dept: 'T&P', tag: '95% RATE' },
  { title: 'Campus Life', titleKey: 'exp.slide4.title', descKey: 'exp.slide4.desc', dept: 'STUDENT', tag: '50+ CLUBS' },
  { title: 'Your Journey', titleKey: 'exp.slide5.title', descKey: 'exp.slide5.desc', dept: 'ADMISSIONS', tag: 'APPLY NOW' },
];

const MOBILE_ICONS = [GraduationCap, Lightbulb, Trophy, Users, Rocket];

const CONFIG = {
  itemCount: 10,
  starCount: 150,
  zGap: 1200,
  camSpeed: 2.0,
  colors: ['#7C3AED', '#06B6D4', '#F472B6', '#F59E0B', '#10B981'],
};

/* ── Scoped CSS for imperative DOM elements ── */
const getCSS = (isLight: boolean) => `
  .exp-card {
    width: 320px;
    height: 460px;
    background: ${isLight ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,10,0.4)'};
    border: 1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'};
    position: relative;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 0 0 1px ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.5)'}, 0 20px 50px ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.5)'};
    transition: border-color 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s, background 0.3s;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    cursor: pointer;
  }
  @media (max-width: 640px) {
    .exp-card { width: 260px; height: 380px; padding: 1.5rem; }
  }

  /* Corner bracket decorations */
  .exp-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid transparent;
    transition: width 0.3s cubic-bezier(0.25,0.46,0.45,0.94), height 0.3s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s;
    pointer-events: none;
    z-index: 2;
  }
  .exp-corner-tl {
    top: -1px; left: -1px;
    border-top-color: ${isLight ? 'rgba(30,41,59,0.4)' : 'rgba(255,255,255,0.5)'};
    border-left-color: ${isLight ? 'rgba(30,41,59,0.4)' : 'rgba(255,255,255,0.5)'};
  }
  .exp-corner-br {
    bottom: -1px; right: -1px;
    border-bottom-color: ${isLight ? 'rgba(30,41,59,0.4)' : 'rgba(255,255,255,0.5)'};
    border-right-color: ${isLight ? 'rgba(30,41,59,0.4)' : 'rgba(255,255,255,0.5)'};
  }
  @media (hover: hover) {
    .exp-card:hover .exp-corner { width: 100%; height: 100%; }
    .exp-card:hover .exp-corner-tl {
      border-top-color: var(--card-accent);
      border-left-color: var(--card-accent);
    }
    .exp-card:hover .exp-corner-br {
      border-bottom-color: var(--card-accent);
      border-right-color: var(--card-accent);
    }
  }
`;

export default function ExperienceJCET() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<ItemData[]>([]);
  const stateRef = useRef({ scroll: 0, velocity: 0, targetSpeed: 0, mouseX: 0, mouseY: 0 });
  const rafRef = useRef<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const velRef = useRef<HTMLElement>(null);
  const coordRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isLight = theme === 'light';

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Intersection observer
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0, rootMargin: '200px' }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [isMobile]);

  // Build the 3D world items
  const buildWorld = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;

    world.innerHTML = '';
    const items: ItemData[] = [];

    const textColor = isLight ? '#1e293b' : '#ffffff';
    const strokeColor = isLight ? 'rgba(30,41,59,0.2)' : 'rgba(255,255,255,0.18)';
    const textDim = isLight ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.7)';
    const textFaint = isLight ? 'rgba(30,41,59,0.35)' : 'rgba(255,255,255,0.35)';
    const surface = isLight ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,10,0.4)';
    const border = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)';
    const shadowBase = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.5)';

    for (let i = 0; i < CONFIG.itemCount; i++) {
      const el = document.createElement('div');
      el.style.cssText = 'position:absolute;left:0;top:0;backface-visibility:hidden;transform-origin:center center;display:flex;align-items:center;justify-content:center;';

      const isHeading = i % 2 === 0;

      if (isHeading) {
        // ── OUTLINED BIG TEXT (CodePen style) ──
        const textIndex = Math.floor(i / 2);
        const txt = document.createElement('div');
        txt.className = 'exp-big-text';
        txt.innerText = JCET_TEXTS[textIndex];
        txt.style.cssText = `
          font-size: clamp(60px, 15vw, 240px);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 2px ${strokeColor};
          text-transform: uppercase;
          white-space: nowrap;
          transform: translate(-50%, -50%);
          pointer-events: none;
          letter-spacing: -0.3rem;
          font-family: "Syncopate", "Cabinet Grotesk", ui-sans-serif, system-ui, sans-serif;
          mix-blend-mode: ${isLight ? 'multiply' : 'overlay'};
        `;
        el.appendChild(txt);
        items.push({ el, type: 'text', x: 0, y: 0, rot: 0, baseZ: -i * CONFIG.zGap });
      } else {
        // ── CARD WITH CORNER BRACKETS ──
        const cardIndex = Math.floor(i / 2);
        const cardData = JCET_CARDS[cardIndex];
        const accent = CONFIG.colors[cardIndex % CONFIG.colors.length];
        const randId = String(Math.floor(Math.random() * 9999)).padStart(4, '0');

        const card = document.createElement('div');
        card.className = 'exp-card';
        card.style.setProperty('--card-accent', accent);
        card.innerHTML = `
          <div class="exp-corner exp-corner-tl"></div>
          <div class="exp-corner exp-corner-br"></div>
          <div style="border-bottom:1px solid ${border};padding-bottom:1rem;margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-family:'JetBrains Mono',monospace;color:${accent};font-size:0.8rem;">ID-${randId}</span>
            <div style="width:10px;height:10px;background:${accent};border-radius:2px;"></div>
          </div>
          <h2 style="font-size:2.2rem;line-height:0.95;margin:0;text-transform:uppercase;font-weight:800;color:${textColor};font-family:'Syncopate','Cabinet Grotesk',ui-sans-serif,system-ui,sans-serif;mix-blend-mode:${isLight ? 'normal' : 'hard-light'};">${t(cardData.titleKey)}</h2>
          <p style="font-size:0.85rem;color:${textDim};margin:0.5rem 0 0;line-height:1.6;font-family:'Inter','JetBrains Mono',system-ui,sans-serif;">${t(cardData.descKey)}</p>
          <div style="margin-top:auto;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:${textFaint};display:flex;justify-content:space-between;padding-top:1rem;">
            <span>DEPT: ${cardData.dept}</span>
            <span>${cardData.tag}</span>
          </div>
          <div style="position:absolute;bottom:2rem;right:2rem;font-size:4rem;opacity:${isLight ? '0.06' : '0.12'};font-weight:900;color:${accent};font-family:'Syncopate',system-ui,sans-serif;">${String(cardIndex + 1).padStart(2, '0')}</div>
        `;

        // Hover effects
        card.addEventListener('mouseenter', () => {
          card.style.borderColor = accent;
          card.style.boxShadow = `0 0 30px ${accent}33`;
          card.style.background = isLight ? 'rgba(255,255,255,0.85)' : 'rgba(20,20,20,0.8)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.borderColor = border;
          card.style.boxShadow = `0 0 0 1px ${shadowBase}, 0 20px 50px ${shadowBase}`;
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

    // ── STARS ──
    for (let i = 0; i < CONFIG.starCount; i++) {
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;width:2px;height:2px;background:${textColor};transform:translate(-50%,-50%);border-radius:50%;opacity:${isLight ? '0.15' : '1'}`;
      world.appendChild(el);
      items.push({
        el, type: 'star',
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * (CONFIG.itemCount * CONFIG.zGap),
        rot: 0,
      });
    }

    itemsRef.current = items;
  }, [t, theme, isLight]);

  useEffect(() => {
    if (!isMobile) {
      buildWorld();
    }
  }, [buildWorld, isMobile]);

  // Mouse tracking
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Core render function
  const render = useCallback(() => {
    const viewport = viewportRef.current;
    const world = worldRef.current;
    if (!viewport || !world) return;
    const s = stateRef.current;

    // Camera tilt based on mouse + velocity
    const tiltX = s.mouseY * 5 - s.velocity * 0.3;
    const tiltY = s.mouseX * 5;
    world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    // Dynamic perspective (warp effect on speed)
    const baseFov = 1000;
    const fov = baseFov - Math.min(Math.abs(s.velocity) * 10, 500);
    viewport.style.perspective = `${fov}px`;

    // HUD updates
    if (velRef.current) velRef.current.innerText = Math.abs(s.velocity).toFixed(2);
    if (coordRef.current) coordRef.current.innerText = s.scroll.toFixed(0);

    const cameraZ = s.scroll * CONFIG.camSpeed;

    itemsRef.current.forEach((item) => {
      let relZ = item.baseZ + cameraZ;
      let alpha = 1;

      if (item.type !== 'star') {
        // ── SINGLE PASS (no modulo wrapping) ──
        if (relZ < -3000) alpha = 0;
        else if (relZ < -2000) alpha = (relZ + 3000) / 1000;
        if (relZ > 200) alpha = 1 - (relZ - 200) / 400;
      } else {
        // Stars loop for continuous background ambiance
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
            // RGB split effect on fast scroll (CodePen style)
            if (Math.abs(s.velocity) > 1) {
              const offset = s.velocity * 2;
              textEl.style.textShadow = `${offset}px 0 rgba(124,58,237,0.8), ${-offset}px 0 rgba(6,182,212,0.8)`;
            } else {
              textEl.style.textShadow = 'none';
            }
          }
        } else {
          // Card floating
          const now = performance.now() * 0.001;
          const float = Math.sin(now + item.x) * 10;
          trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
        }

        item.el.style.transform = trans;
      }
    });
  }, []);

  // RAF loop
  useEffect(() => {
    if (!isActive || isMobile) return;

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
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, isMobile, render]);

  // ── MOBILE FALLBACK ──
  if (isMobile) {
    return (
      <section className="py-16 md:py-24 bg-base transition-colors duration-500 px-5" aria-label="Experience JCET">
        <div className="max-w-md mx-auto space-y-12">
          {JCET_CARDS.map((card, i) => {
            const accent = CONFIG.colors[i % CONFIG.colors.length];
            const Icon = MOBILE_ICONS[i];
            return (
              <motion.div
                key={card.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="cursor-pointer"
              >
                {/* Big text label */}
                <div
                  className="text-[clamp(28px,10vw,56px)] font-black uppercase tracking-tighter leading-none mb-4"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: `1.5px ${isLight ? 'rgba(30,41,59,0.15)' : 'rgba(255,255,255,0.12)'}`,
                    fontFamily: '"Syncopate", system-ui, sans-serif',
                  }}
                >
                  {JCET_TEXTS[i]}
                </div>

                {/* Card */}
                <div
                  className="relative p-6 rounded border transition-colors duration-200"
                  style={{
                    background: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(10,10,10,0.4)',
                    borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded flex items-center justify-center"
                      style={{ background: `${accent}20`, border: `1px solid ${accent}40` }}
                    >
                      <Icon size={18} style={{ color: accent }} />
                    </div>
                    <span
                      className="text-xs font-mono font-bold tracking-widest"
                      style={{ color: accent }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-bold mb-3 text-text"
                    style={{ fontFamily: '"Syncopate", system-ui, sans-serif' }}
                  >
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {t(card.descKey)}
                  </p>
                  <div
                    className="flex justify-between text-[0.65rem] font-mono tracking-wider"
                    style={{ color: isLight ? 'rgba(30,41,59,0.35)' : 'rgba(255,255,255,0.35)' }}
                  >
                    <span>DEPT: {card.dept}</span>
                    <span>{card.tag}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }

  // ── DESKTOP 3D EXPERIENCE ──
  return (
    <section
      ref={sectionRef}
      className="relative bg-base transition-colors duration-500"
      style={{ height: '800vh' }}
      aria-label="Experience JCET"
    >
      {/* Scoped CSS for imperative cards */}
      <style>{getCSS(isLight)}</style>

      <div className="sticky top-0 w-full h-screen" style={{ overflow: 'hidden' }}>

        {/* ── POST-PROCESSING OVERLAYS ── */}

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-[10]"
          style={{
            background: isLight
              ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.03) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2) 100%)',
            backgroundSize: '100% 4px',
          }}
          aria-hidden="true"
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[11]"
          style={{
            background: isLight
              ? 'radial-gradient(circle, transparent 40%, rgba(248,250,252,0.8) 120%)'
              : 'radial-gradient(circle, transparent 40%, #000 120%)',
          }}
          aria-hidden="true"
        />

        {/* Noise */}
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
          style={{ inset: '2rem', color: isLight ? 'rgba(30,41,59,0.45)' : 'rgba(255,255,255,0.4)' }}
          aria-hidden="true"
        >
          {/* Top bar */}
          <div className="flex justify-between items-center">
            <span>SYS.READY</span>
            <div className={`flex-1 h-px mx-4 relative ${isLight ? 'bg-black/10' : 'bg-white/20'}`}>
              <div className="absolute right-0 -top-[2px] w-[5px] h-[5px] bg-[#7C3AED]" />
            </div>
            <span>JCET // <strong className="text-[#00E5FF]">EXPERIENCE</strong></span>
          </div>

          {/* Left velocity readout */}
          <div
            className={`self-start mt-auto mb-auto ${isLight ? 'text-slate-900/35' : 'text-white/30'}`}
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            SCROLL VELOCITY // <strong ref={velRef} className="text-[#00E5FF]">0.00</strong>
          </div>

          {/* Bottom bar */}
          <div className="flex justify-between items-center">
            <span>COORD: <strong ref={coordRef} className="text-[#00E5FF]">000</strong></span>
            <div className={`flex-1 h-px mx-4 relative ${isLight ? 'bg-black/10' : 'bg-white/20'}`}>
              <div className="absolute right-0 -top-[2px] w-[5px] h-[5px] bg-[#7C3AED]" />
            </div>
            <span>VER 2.0 [JCET]</span>
          </div>
        </div>

        {/* ── 3D VIEWPORT ── */}
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
