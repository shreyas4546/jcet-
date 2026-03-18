import { motion } from 'motion/react';

export default function SplitHeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-black text-white py-24 relative overflow-hidden">
      {/* Glassmorphism background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-400/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
            Engineering the Future at JCET
          </h2>
          <p className="mt-6 text-gray-300 text-lg">
            Innovative learning, advanced labs, and strong placement opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="btn-primary">
              Apply Now
            </button>
            <button className="btn-secondary">
              Download Brochure
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/30 to-transparent rounded-xl transform translate-x-4 translate-y-4 -z-10 blur-sm" />
          <div className="glass-panel p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <img 
              src="https://picsum.photos/seed/jcetcampus/800/600" 
              alt="JCET Campus" 
              className="rounded-lg shadow-2xl w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
