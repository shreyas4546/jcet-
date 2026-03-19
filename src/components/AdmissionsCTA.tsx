import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';

export default function AdmissionsCTA() {
  return (
    <section className="section-padding relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/campus-cta/1920/1080')] opacity-5 mix-blend-overlay bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-surface/90 to-base" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 section-container text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          Start Your Engineering <br className="hidden md:block" />
          <span className="text-gradient-purple">Journey at JCET</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-xl mb-10 max-w-2xl mx-auto"
        >
          Join a community of innovators, creators, and leaders. Admissions are now open for the upcoming academic year.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/admissions" className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group">
            Apply Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto btn-secondary flex items-center justify-center gap-2 cursor-pointer">
            <Download size={20} />
            Download Brochure
          </button>
        </motion.div>
      </div>
    </section>
  );
}
