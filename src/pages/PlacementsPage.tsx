import { motion, Variants } from 'motion/react';
import { TrendingUp, Building2, Trophy, IndianRupee } from 'lucide-react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const recruiters = [
  'TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'Accenture',
  'Capgemini', 'Tech Mahindra', 'L&T', 'Bosch', 'Samsung', 'JSW',
  'Byju\'s', 'Mindtree', 'Mphasis', 'Quest Global',
];

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

      {/* Stats Dashboard */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, value: '98.4%', label: 'Placement Rate', color: '#7C3AED' },
              { icon: IndianRupee, value: '12 LPA', label: 'Highest Package', color: '#F59E0B' },
              { icon: TrendingUp, value: '4.5 LPA', label: 'Average Package', color: '#06B6D4' },
              { icon: Building2, value: '100+', label: 'Recruiters', color: '#F472B6' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <stat.icon size={28} className="mx-auto mb-4" style={{ color: stat.color }} />
                <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-sm text-text-muted uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="section-padding bg-surface/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2>Top <span className="text-gradient-purple">Recruiters</span></h2>
            <p className="mt-4 max-w-2xl mx-auto">Leading companies from IT, manufacturing, and consulting regularly hire from JCET.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {recruiters.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="glass-card p-4 flex items-center justify-center text-center glass-card-hover"
              >
                <span className="text-sm font-medium text-text-muted">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2>Placement <span className="text-gradient-cyan">Highlights</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Pre-Placement Training', desc: 'Aptitude, coding, and soft skills training beginning from 5th semester. Mock interviews with industry experts.', accent: 'border-accent-primary/30' },
              { title: 'Industry Connect', desc: 'Regular industry visits, guest lectures, and live project collaborations with top tech companies.', accent: 'border-accent-secondary/30' },
              { title: 'Entrepreneurship Cell', desc: 'Startup incubation program with mentorship, funding support, and workspace for student ventures.', accent: 'border-accent-warm/30' },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`glass-card p-8 border-l-4 ${card.accent}`}
              >
                <h4 className="text-lg font-bold mb-3">{card.title}</h4>
                <p className="text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
