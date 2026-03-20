import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Briefcase, Users, Award, Building2, Handshake, GraduationCap, ArrowRight, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/* ══════════════════════════════════════════════
   PremiumPlacementDashboard
   A data-driven placement dashboard section
   ══════════════════════════════════════════════ */

// ── DATA ──
const KEY_STATS = [
  { label: 'Highest Package', value: 45, prefix: '₹', suffix: ' LPA', icon: TrendingUp, color: '#7C3AED' },
  { label: 'Average Package', value: 12, prefix: '₹', suffix: ' LPA', icon: Briefcase, color: '#06B6D4' },
  { label: 'Placement Rate', value: 98.4, prefix: '', suffix: '%', icon: Users, color: '#10B981' },
  { label: 'Total Offers', value: 1200, prefix: '', suffix: '+', icon: Award, color: '#F59E0B' },
];

const RECRUITERS = [
  { name: 'Infosys', abbr: 'INF' },
  { name: 'TCS', abbr: 'TCS' },
  { name: 'Wipro', abbr: 'WPR' },
  { name: 'Accenture', abbr: 'ACN' },
  { name: 'Capgemini', abbr: 'CAP' },
  { name: 'Cognizant', abbr: 'CTS' },
  { name: 'HCL Tech', abbr: 'HCL' },
  { name: 'Tech Mahindra', abbr: 'TML' },
];

const CHART_DATA = [
  { year: '2020', placed: 320, total: 400 },
  { year: '2021', placed: 380, total: 420 },
  { year: '2022', placed: 450, total: 480 },
  { year: '2023', placed: 520, total: 540 },
  { year: '2024', placed: 610, total: 630 },
  { year: '2025', placed: 720, total: 740 },
];

const HIGHLIGHTS = [
  {
    title: 'Top Recruiters',
    desc: 'Leading MNCs and innovative startups recruit from JCET every year, offering diverse career paths.',
    icon: Building2,
    color: '#7C3AED',
    stat: '120+',
    statLabel: 'Companies',
  },
  {
    title: 'Internship Programs',
    desc: 'Pre-final year students participate in industry internships with leading tech companies.',
    icon: GraduationCap,
    color: '#06B6D4',
    stat: '85%',
    statLabel: 'Conversion',
  },
  {
    title: 'Industry Tie-ups',
    desc: 'Strategic corporate partnerships with IT giants for training, projects, and direct hiring.',
    icon: Handshake,
    color: '#10B981',
    stat: '40+',
    statLabel: 'Partners',
  },
];

// ── ANIMATED COUNTER HOOK ──
function useCountUp(end: number, duration = 2000, startOnView = false) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    if (!startOnView) { start(); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { start(); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [start, startOnView]);

  return { count, ref };
}

// ── STAT CARD ──
function StatCard({ stat, index, isLight }: { stat: typeof KEY_STATS[0]; index: number; isLight: boolean }) {
  const { count, ref } = useCountUp(stat.value, 2000, true);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="relative p-6 md:p-7 rounded-2xl cursor-pointer group transition-all duration-200"
      style={{
        background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(15,23,42,0.4)',
        border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)'}`,
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${stat.color}10, 0 0 30px ${stat.color}08` }}
      />

      <div className="relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
        >
          <Icon size={18} style={{ color: stat.color }} />
        </div>
        <div
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1"
          style={{ color: isLight ? '#1e293b' : '#ffffff' }}
        >
          {stat.prefix}{count}{stat.suffix}
        </div>
        <div
          className="text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.4)' }}
        >
          {stat.label}
        </div>
      </div>

      {/* Removed background number watermark for cleaner data look */}
    </motion.div>
  );
}

// ── MAIN COMPONENT ──
export default function PremiumPlacementDashboard({ hideHeader = false }: { hideHeader?: boolean }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const maxPlaced = Math.max(...CHART_DATA.map(d => d.placed));

  return (
    <section
      id="placement-dashboard"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: isLight
          ? 'linear-gradient(to bottom, #f1f5f9, #e8ecf1, #f1f5f9)'
          : 'linear-gradient(to bottom, #060a14, #0a0f1e, #060a14)',
      }}
      aria-label="Placements & Career Outcomes"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.02)'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.02)'} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Reduced ambient glows for a cleaner data product feel */}
      <div
        className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${isLight ? 'rgba(124,58,237,0.02)' : 'rgba(124,58,237,0.04)'}, transparent 70%)` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        {!hideHeader && (
          <div className="text-center mb-14 md:mb-18">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block font-mono text-xs tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
                style={{
                  color: '#06B6D4',
                  borderColor: isLight ? 'rgba(6,182,212,0.2)' : 'rgba(6,182,212,0.25)',
                  background: isLight ? 'rgba(6,182,212,0.06)' : 'rgba(6,182,212,0.08)',
                }}
              >
                Career Dashboard
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight"
                style={{ color: isLight ? '#1e293b' : '#ffffff' }}
              >
                Placements &{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Career Outcomes
                </span>
              </h2>
              <p
                className="mt-4 max-w-2xl mx-auto text-base md:text-lg"
                style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.5)' }}
              >
                Real numbers. Real results. See why top companies choose JCET graduates.
              </p>
            </motion.div>
          </div>
        )}

        {/* ═══ PART 1 — KEY STATS ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14 md:mb-18">
          {KEY_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isLight={isLight} />
          ))}
        </div>

        {/* ═══ PART 2 — RECRUITER LOGOS ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-14 md:mb-18"
        >
          <h3
            className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-6"
            style={{ color: isLight ? '#94a3b8' : 'rgba(255,255,255,0.3)' }}
          >
            Trusted by Leading Recruiters
          </h3>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div
              className="absolute inset-y-0 left-0 w-16 md:w-24 z-10 pointer-events-none"
              style={{
                background: isLight
                  ? 'linear-gradient(to right, #eef2f6, transparent)'
                  : 'linear-gradient(to right, #070c18, transparent)',
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-16 md:w-24 z-10 pointer-events-none"
              style={{
                background: isLight
                  ? 'linear-gradient(to left, #eef2f6, transparent)'
                  : 'linear-gradient(to left, #070c18, transparent)',
              }}
            />

            {/* Scrolling logos */}
            <div className="flex gap-6 animate-[marquee_25s_linear_infinite]">
              {[...RECRUITERS, ...RECRUITERS, ...RECRUITERS].map((company, i) => (
                <div
                  key={`${company.abbr}-${i}`}
                  className="flex-shrink-0 flex items-center gap-3 px-6 py-3.5 rounded-xl cursor-pointer transition-all duration-200 group"
                  style={{
                    background: isLight ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
                  }}
                >
                  {/* Logo placeholder circle */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all duration-200"
                    style={{
                      background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
                      color: isLight ? '#94a3b8' : 'rgba(255,255,255,0.3)',
                      filter: 'grayscale(100%)',
                    }}
                  >
                    {company.abbr}
                  </div>
                  <span
                    className="font-medium text-xs whitespace-nowrap transition-colors duration-200"
                    style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.3)' }}
                  >
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ═══ PART 3 — PLACEMENT GRAPH ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 md:mb-18 rounded-2xl p-6 md:p-8"
          style={{
            background: isLight ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3
                className="text-lg md:text-xl font-bold"
                style={{ color: isLight ? '#1e293b' : '#ffffff' }}
              >
                Placement Growth
              </h3>
              <p
                className="text-xs mt-1"
                style={{ color: isLight ? '#94a3b8' : 'rgba(255,255,255,0.35)' }}
              >
                Students placed per academic year
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{
                background: 'rgba(16,185,129,0.1)',
                color: '#10B981',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <TrendingUp size={12} />
              +18% YoY
            </div>
          </div>

          {/* Bar Chart (CSS-only) */}
          <div className="flex items-end gap-3 md:gap-6 h-48 md:h-56" role="img" aria-label="Bar chart showing placement growth from 2020 to 2025">
            {CHART_DATA.map((d, i) => {
              const heightPct = (d.placed / maxPlaced) * 100;
              return (
                <motion.div
                  key={d.year}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  {/* Value label */}
                  <span
                    className="text-[10px] md:text-xs font-bold"
                    style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.5)' }}
                  >
                    {d.placed}
                  </span>
                  {/* Bar */}
                  <div
                    className="w-full rounded-t-lg relative overflow-hidden cursor-pointer transition-all duration-200 group"
                    style={{
                      height: `${heightPct}%`,
                      minHeight: '20px',
                      background: isLight
                        ? `linear-gradient(to top, rgba(124,58,237,0.3), rgba(6,182,212,0.3))`
                        : `linear-gradient(to top, rgba(124,58,237,0.5), rgba(6,182,212,0.5))`,
                      border: `1px solid ${isLight ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.2)'}`,
                      borderBottom: 'none',
                    }}
                  >
                    {/* Shine on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to top, rgba(124,58,237,0.6), rgba(6,182,212,0.6))',
                      }}
                    />
                  </div>
                  {/* Year label */}
                  <span
                    className="text-[10px] md:text-xs font-mono font-bold"
                    style={{ color: isLight ? '#94a3b8' : 'rgba(255,255,255,0.3)' }}
                  >
                    {d.year}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Baseline */}
          <div
            className="h-px mt-0"
            style={{ background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}
          />
        </motion.div>

        {/* ═══ PART 4 — HIGHLIGHTS ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-18">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl cursor-pointer group transition-all duration-200 overflow-hidden"
                style={{
                  background: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {/* Accent line top */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(to right, ${h.color}, transparent)` }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${h.color}12`, border: `1px solid ${h.color}25` }}
                  >
                    <Icon size={20} style={{ color: h.color }} />
                  </div>
                  <div className="text-right">
                    <div
                      className="text-xl font-extrabold"
                      style={{ color: h.color }}
                    >
                      {h.stat}
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-wider font-semibold"
                      style={{ color: isLight ? '#94a3b8' : 'rgba(255,255,255,0.3)' }}
                    >
                      {h.statLabel}
                    </div>
                  </div>
                </div>

                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: isLight ? '#1e293b' : '#ffffff' }}
                >
                  {h.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.45)' }}
                >
                  {h.desc}
                </p>

                {/* Hover arrow */}
                <div
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: h.color }}
                >
                  Learn more <ChevronRight size={12} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ PART 5 — CTA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-10 md:py-14 rounded-2xl relative overflow-hidden"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(6,182,212,0.06))'
              : 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.08))',
            border: `1px solid ${isLight ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.15)'}`,
          }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h3
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: isLight ? '#1e293b' : '#ffffff' }}
            >
              Start Your Career with JCET
            </h3>
            <p
              className="text-sm md:text-base mb-6 max-w-lg mx-auto"
              style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.5)' }}
            >
              Join a college where placements aren't just numbers — they're launchpads for careers.
            </p>
            <a
              href="#admissions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                boxShadow: '0 8px 30px rgba(124,58,237,0.3)',
              }}
            >
              Apply Now
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
