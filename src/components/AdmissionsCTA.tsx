import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';

export default function AdmissionsCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-black border-t border-purple-500/20">
      {/* Background pattern/gradient */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/campus-cta/1920/1080')] opacity-10 mix-blend-overlay bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/80 via-[#111827]/90 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
        >
          Start Your Engineering <br className="hidden md:block" />
          <span className="text-cyan-400">Journey at JCET</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Join a community of innovators, creators, and leaders. Admissions are now open for the upcoming academic year.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 btn-primary flex items-center justify-center gap-2 group">
            Apply Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 btn-secondary flex items-center justify-center gap-2">
            <Download size={20} />
            Download Brochure
          </button>
        </motion.div>
      </div>
    </section>
  );
}
