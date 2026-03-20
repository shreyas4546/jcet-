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
        {/* Cinematic subtle vignette */}
        <div 
          className="absolute inset-0" 
          style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 10%, rgba(124,58,237,0.04) 0%, transparent 60%)' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
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
          {/* Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-bold text-accent-primary tracking-[0.15em] uppercase">
              <Sparkles size={12} />
              {t('hero.badge')}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-semibold text-text-primary backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:bg-white/10 transition-colors">
              <Shield size={12} className="text-accent-secondary" />
              Affiliated to Visvesvaraya Technological University (VTU)
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
                <div className={`text-xl lg:text-2xl font-bold mb-1 ${stat.color}`}>
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
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.4 }}
           className="hidden lg:flex lg:col-span-5 items-center justify-center relative w-full aspect-[4/5] max-w-lg mx-auto rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl"
        >
          {/* Main Image */}
          <img 
            src="https://picsum.photos/seed/jcetuniversityhero/1200/1500" 
            alt="JCET Campus and Students"
            className="w-full h-full object-cover object-center"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle Dark Gradient Overlays for integration */}
          <div className="absolute inset-0 bg-[#0B0F1A]/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] lg:from-[#0B0F1A]/80 via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-3xl pointer-events-none" />

          {/* Floating Trust Badge */}
          <div className="absolute bottom-8 left-8 right-8 glass-card p-5 rounded-2xl border border-white/[0.08] backdrop-blur-md shadow-2xl">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/20 flex items-center justify-center border border-accent-primary/30">
                   <Globe size={20} className="text-accent-primary" />
                </div>
                <div>
                   <h3 className="text-white font-bold text-sm tracking-wide">Excellence in Education</h3>
                   <p className="text-text-muted text-[11px] uppercase tracking-wider mt-1">Ranked Top 10 in State</p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile visual (stacked, visible < lg) ── */}
      <div className="lg:hidden flex justify-center pb-12 relative z-10 px-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl"
         >
            <img 
               src="https://picsum.photos/seed/jcetuniversityhero/800/600" 
               alt="JCET Campus and Students"
               className="w-full h-full object-cover object-center"
               loading="lazy"
               referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl border border-white/[0.08] backdrop-blur-md flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                  <Globe size={14} className="text-accent-primary" />
               </div>
               <div>
                  <h3 className="text-white font-bold text-xs uppercase tracking-wide">Premium Campus</h3>
               </div>
            </div>
         </motion.div>
      </div>
    </section>
  );
}
