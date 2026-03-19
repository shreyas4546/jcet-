import { motion, Variants } from 'motion/react';
import { GraduationCap, BookOpen, FlaskConical, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const programs = [
  {
    category: 'Undergraduate (B.E.)',
    items: [
      { name: 'Computer Science & Engineering', duration: '4 Years', seats: 120 },
      { name: 'AI & Machine Learning', duration: '4 Years', seats: 60 },
      { name: 'Electronics & Communication', duration: '4 Years', seats: 60 },
      { name: 'Mechanical Engineering', duration: '4 Years', seats: 120 },
      { name: 'Civil Engineering', duration: '4 Years', seats: 60 },
    ],
  },
  {
    category: 'Postgraduate (M.Tech)',
    items: [
      { name: 'Computer Science', duration: '2 Years', seats: 24 },
      { name: 'VLSI Design', duration: '2 Years', seats: 18 },
      { name: 'Structural Engineering', duration: '2 Years', seats: 18 },
    ],
  },
  {
    category: 'Management (MBA)',
    items: [
      { name: 'Master of Business Administration', duration: '2 Years', seats: 60 },
    ],
  },
];

export default function AcademicsPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent-secondary/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto">
              <GraduationCap size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Academics</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="mb-6">
              World-Class <span className="text-gradient-cyan">Programs</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-3xl mx-auto">
              Choose from a range of undergraduate, postgraduate, and management programs designed to
              prepare you for the demands of a rapidly evolving technological landscape.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <div className="section-container space-y-16">
          {programs.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <BookOpen size={24} className="text-accent-secondary" />
                {group.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((prog) => (
                  <div key={prog.name} className="glass-card p-6 glass-card-hover group">
                    <h4 className="text-base font-bold mb-3 group-hover:text-accent-primary transition-colors">{prog.name}</h4>
                    <div className="flex gap-4 text-sm text-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-accent-secondary" />
                        {prog.duration}
                      </span>
                      <span>{prog.seats} Seats</span>
                    </div>
                    <Link to="/admissions" className="text-accent-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                      Apply <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research & Innovation */}
      <section className="section-padding bg-surface/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">
              <FlaskConical size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Research</span>
            </div>
            <h2>Innovation <span className="text-gradient-purple">Hub</span></h2>
            <p className="max-w-2xl mx-auto mt-4">Our research centers focus on emerging technologies that define the future.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI & Data Science Lab', desc: 'Machine learning, NLP, and computer vision research with GPU clusters and real-world datasets.', accent: 'border-accent-primary/30' },
              { title: 'IoT Innovation Center', desc: 'Smart campus technology, embedded systems, and connected device ecosystems.', accent: 'border-accent-secondary/30' },
              { title: 'Green Energy Research', desc: 'Sustainable engineering solutions for solar, wind, and energy-efficient building design.', accent: 'border-accent-warm/30' },
            ].map((lab) => (
              <motion.div
                key={lab.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`glass-card p-8 border-l-4 ${lab.accent}`}
              >
                <h4 className="text-lg font-bold mb-3">{lab.title}</h4>
                <p className="text-sm">{lab.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
