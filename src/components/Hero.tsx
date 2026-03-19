import { motion, Variants } from 'motion/react';
import { ArrowRight, Download, Sparkles, Code, Cpu, Globe } from 'lucide-react';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-pink/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Copy & CTAs */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="section-badge">
              <Sparkles size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Admissions Open 2026</span>
            </div>

            <h1 className="mb-6">
              Shape Your{' '}
              <span className="text-gradient-purple">Future</span>
              <br />
              at JCET.
            </h1>

            <p className="text-lg md:text-xl max-w-xl">
              An elite engineering institution where rigorous academics meet cutting-edge
              industry integration. Empowering innovators since 2010 in the heart of Hubballi.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <a href="/admissions" className="btn-primary flex items-center gap-2 group">
              Apply Now
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button className="btn-secondary flex items-center gap-2 group cursor-pointer">
              Download Brochure
              <Download size={18} className="transition-colors" />
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={itemVariants} className="pt-8 flex gap-10 border-t border-white/[0.06]">
            {[
              { value: '98.4%', label: 'Placement Rate' },
              { value: '50+', label: 'Lab Facilities' },
              { value: 'Top 10', label: 'University Rank', accent: true },
            ].map((stat) => (
              <div key={stat.label}>
                <div className={`text-2xl font-bold mb-1 ${stat.accent ? 'text-accent-primary' : 'text-text-heading'}`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Campus Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border border-accent-primary/20 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-accent-secondary/15 animate-[spin_25s_linear_infinite_reverse] border-dashed" />
            <div className="absolute inset-10 rounded-full border border-accent-pink/10 animate-[spin_35s_linear_infinite]" />

            {/* Center orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full flex items-center justify-center overflow-hidden border border-white/[0.08]"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #7C3AED, #1F2937 70%)',
                boxShadow: '0 0 80px rgba(124, 58, 237, 0.25), inset 0 0 40px rgba(0,0,0,0.3)',
              }}
            >
              <div className="text-5xl font-display font-black text-white tracking-widest drop-shadow-2xl z-10">
                JCET
              </div>
            </div>

            {/* Orbiting icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              {[
                { Icon: Code, pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
                { Icon: Cpu, pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
                { Icon: Globe, pos: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2' },
              ].map(({ Icon, pos }) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-12 h-12 glass-card flex items-center justify-center cursor-pointer hover:border-accent-primary/40 hover:scale-110 transition-all duration-300`}
                  style={{ borderRadius: '14px' }}
                >
                  <Icon size={18} className="text-accent-secondary" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
