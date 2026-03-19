import { motion, Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, Code, Cpu, Globe, Zap, Database, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/* ──────────────────────────────────────────────
   p22-hero-premium — IIT-level Hero for JCET
   Split layout · Dark premium · Glassmorphism
   ────────────────────────────────────────────── */

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  const floatVariants: Variants = {
    initial: { y: 0 },
    float: { y: [-8, 8, -8], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } },
  };

  return (
    <section
      id="p22-hero-premium"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      role="banner"
      aria-label="JCET Homepage Hero"
    >
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Radial gradient base */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(124,58,237,0.08) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 40%, rgba(6,182,212,0.06) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 40% at 60% 80%, rgba(244,114,182,0.04) 0%, transparent 60%)' }} />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* ── Main Content Grid ── */}
      <div className="section-container w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 pt-32 pb-40 lg:pb-48">

        {/* ════════ LEFT: Copy & CTAs (7 cols) ════════ */}
        <motion.div
          className="lg:col-span-7 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-bold text-accent-primary tracking-[0.15em] uppercase">
              <Sparkles size={12} />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.05] tracking-tight">
              <span className="text-gradient-purple">{t('hero.title1')}</span>
              <br />
              <span className="text-gradient-purple">{t('hero.title2')}</span>
              <br />
              <span className="text-text-heading">{t('hero.title3')}</span>
            </h1>
          </motion.div>

          {/* Supporting Text */}
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl max-w-xl leading-relaxed text-text-muted">
              {t('hero.desc')}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <Link to="/admissions" className="btn-primary flex items-center gap-2.5 group">
              {t('hero.btnApply')}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="btn-secondary flex items-center gap-2.5 group cursor-pointer">
              <Download size={18} />
              {t('hero.btnDownload')}
            </button>
          </motion.div>

          {/* Trust Line */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 text-[11px] text-text-muted uppercase tracking-[0.2em] font-medium pt-2">
            <Shield size={14} className="text-accent-secondary" />
            <span>{t('stat.naac')}</span>
            <span className="text-white/20">·</span>
            <span>{t('stat.vtu')}</span>
            <span className="text-white/20">·</span>
            <span>{t('stat.estd')}</span>
          </motion.div>

          {/* Mini Stats Row */}
          <motion.div variants={itemVariants} className="pt-6 flex gap-10 border-t border-white/[0.06]">
            {[
              { value: '98.4%', label: t('stat.placement'), color: 'text-accent-primary' },
              { value: '50+', label: t('stat.labs'), color: 'text-accent-secondary' },
              { value: 'Top 10', label: t('stat.rank'), color: 'text-accent-pink' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className={`text-2xl lg:text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ════════ RIGHT: Premium Visual (5 cols) ════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.4 }}
          className="hidden lg:flex lg:col-span-5 items-center justify-center"
        >
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="float"
            className="relative w-full max-w-[440px] aspect-square"
          >
            {/* Glow backdrop */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full blur-[100px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)' }}
            />

            {/* Concentric rings */}
            <div className="absolute inset-0 rounded-full border border-accent-primary/15 animate-[spin_50s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-accent-secondary/12 border-dashed animate-[spin_35s_linear_infinite_reverse]" />
            <div className="absolute inset-14 rounded-full border border-accent-pink/8 animate-[spin_45s_linear_infinite]" />
            <div className="absolute inset-20 rounded-full border border-accent-warm/6 animate-[spin_60s_linear_infinite_reverse]" />

            {/* Center Orb */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full flex items-center justify-center overflow-hidden border border-white/[0.1]"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #7C3AED, #4C1D95 40%, #1F2937 80%)',
                boxShadow: '0 0 60px rgba(124, 58, 237, 0.3), 0 0 120px rgba(124, 58, 237, 0.1), inset 0 0 30px rgba(0,0,0,0.4)',
              }}
            >
              <span className="text-4xl font-display font-black text-white tracking-[0.15em] drop-shadow-2xl select-none">
                JCET
              </span>
            </div>

            {/* Orbiting Tech Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              {[
                { Icon: Code, pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', color: 'text-accent-secondary' },
                { Icon: Cpu, pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', color: 'text-accent-pink' },
                { Icon: Globe, pos: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2', color: 'text-accent-primary' },
                { Icon: Zap, pos: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2', color: 'text-accent-warm' },
              ].map(({ Icon, pos, color }) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-11 h-11 glass-card flex items-center justify-center cursor-pointer hover:border-accent-primary/40 hover:scale-110 transition-all duration-300`}
                  style={{ borderRadius: '12px' }}
                >
                  <Icon size={16} className={color} />
                </div>
              ))}
            </motion.div>

            {/* Floating stat badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -left-6 top-1/4 glass-card px-3 py-2 flex items-center gap-2.5"
              style={{ borderRadius: '12px' }}
            >
              <div className="w-8 h-8 rounded-lg bg-accent-secondary/15 flex items-center justify-center">
                <Database size={14} className="text-accent-secondary" />
              </div>
              <div>
                <div className="text-xs font-bold text-text-heading">{t('pill.labs')}</div>
                <div className="text-[9px] text-text-muted uppercase tracking-wider">{t('pill.superlabs')}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute -right-6 bottom-1/4 glass-card px-3 py-2 flex items-center gap-2.5"
              style={{ borderRadius: '12px' }}
            >
              <div className="w-8 h-8 rounded-lg bg-accent-pink/15 flex items-center justify-center">
                <Zap size={14} className="text-accent-pink" />
              </div>
              <div>
                <div className="text-xs font-bold text-text-heading">{t('pill.recruiters')}</div>
                <div className="text-[9px] text-text-muted uppercase tracking-wider">{t('pill.mncs')}</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Mobile visual (stacked, visible < lg) ── */}
      <div className="lg:hidden flex justify-center pb-8 relative z-10">
        <div className="relative w-56 h-56">
          <div className="absolute inset-0 rounded-full border border-accent-primary/15 animate-[spin_50s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-accent-secondary/12 border-dashed animate-[spin_35s_linear_infinite_reverse]" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full flex items-center justify-center border border-white/[0.1]"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #7C3AED, #4C1D95 40%, #1F2937 80%)',
              boxShadow: '0 0 40px rgba(124, 58, 237, 0.25)',
            }}
          >
            <span className="text-2xl font-display font-black text-white tracking-[0.15em] select-none">JCET</span>
          </div>
        </div>
      </div>
    </section>
  );
}
