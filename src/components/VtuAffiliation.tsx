import { motion } from 'motion/react';
import { ExternalLink, ShieldCheck, GraduationCap } from 'lucide-react';

export default function VtuAffiliation() {
  return (
    <section className="py-16 relative overflow-hidden bg-base border-t border-white/[0.04]">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" 
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)' }} 
        />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-accent-primary/5" />
      </div>

      <div className="section-container relative z-10 w-full max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 md:gap-12"
          style={{
            background: 'rgba(17, 24, 39, 0.6)', /* surface with opacity */
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Left Emblem */}
          <div className="flex-shrink-0 relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-surface border border-white/[0.06] flex items-center justify-center shadow-2xl relative z-10">
              <ShieldCheck size={40} className="text-accent-secondary" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-accent-primary/20 border border-accent-primary/30 flex items-center justify-center backdrop-blur-md">
                <GraduationCap size={16} className="text-accent-primary" />
              </div>
            </div>
            {/* Soft shadow glow */}
            <div className="absolute inset-0 bg-accent-secondary/20 blur-2xl rounded-full scale-150 -z-10" />
          </div>

          {/* Right Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-heading mb-3 tracking-tight">
              About VTU <span className="text-gradient-cyan">Affiliation</span>
            </h2>
            <p className="text-text-muted text-base md:text-lg max-w-2xl leading-relaxed mb-6">
              Jain College of Engineering and Technology (JCET) is proudly affiliated with <strong>Visvesvaraya Technological University (VTU)</strong>, one of the leading technical universities in Karnataka. We uphold the highest academic standards and robust technical curriculum prescribed by the university.
            </p>
            
            <a 
              href="https://vtu.ac.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] text-sm font-semibold text-text-primary hover:bg-white/[0.03] hover:border-white/[0.15] transition-all duration-300 group cursor-pointer"
            >
              Visit Official VTU Website
              <ExternalLink size={16} className="text-accent-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
