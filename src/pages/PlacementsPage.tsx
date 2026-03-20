import { motion, Variants } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import PremiumPlacementDashboard from '../components/PremiumPlacementDashboard';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function PlacementsPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent-warm/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto" style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}>
              <TrendingUp size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Placements</span>
            </motion.div>
            <motion.h1 variants={itemVariants}>
              Career <span className="text-gradient-warm">Launchpad</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg max-w-3xl mx-auto">
              Our dedicated placement cell ensures every JCET graduate is industry-ready with strong corporate partnerships and mentorship programs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Dashboard Integration */}
      <PremiumPlacementDashboard hideHeader />
    </div>
  );
}
