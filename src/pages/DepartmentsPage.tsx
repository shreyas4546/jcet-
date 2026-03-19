import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'motion/react';
import { Layers, X, Users, BookOpen, FlaskConical, ArrowRight } from 'lucide-react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const departments = [
  { id: 'cse', name: 'Computer Science & Engineering', abbr: 'CSE', color: '#7C3AED', desc: 'Software development, algorithms, computing systems, and cybersecurity.', faculty: 22, labs: 8, students: 480, highlights: ['AI/ML Specialization', 'Hackathon Champions', 'Industry Projects with TCS, Infosys'] },
  { id: 'aiml', name: 'AI & Machine Learning', abbr: 'AIML', color: '#06B6D4', desc: 'Neural networks, data science, NLP, and intelligent systems.', faculty: 15, labs: 5, students: 240, highlights: ['GPU Computing Lab', 'Published 30+ Papers', 'Partnership with NVIDIA'] },
  { id: 'ece', name: 'Electronics & Communication', abbr: 'ECE', color: '#F472B6', desc: 'Microprocessors, embedded systems, VLSI, and IoT devices.', faculty: 18, labs: 7, students: 240, highlights: ['VLSI Design Center', 'IoT Innovation Lab', 'ISRO Collab Project'] },
  { id: 'mech', name: 'Mechanical Engineering', abbr: 'ME', color: '#F59E0B', desc: 'Thermodynamics, manufacturing, robotics, and automotive engineering.', faculty: 20, labs: 10, students: 480, highlights: ['SAE BAJA Team', 'CNC Manufacturing Lab', '3D Printing Center'] },
  { id: 'civil', name: 'Civil Engineering', abbr: 'CE', color: '#10B981', desc: 'Structural design, smart cities, environmental engineering, and surveying.', faculty: 16, labs: 6, students: 240, highlights: ['Green Building Research', 'Smart City Project', 'Geotechnical Lab'] },
  { id: 'mba', name: 'Master of Business Administration', abbr: 'MBA', color: '#8B5CF6', desc: 'Leadership, strategy, marketing, finance, and entrepreneurship.', faculty: 12, labs: 3, students: 120, highlights: ['Case Study Methodology', 'Industry Mentorship', 'Startup Incubator'] },
];

export default function DepartmentsPage() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const activeDept = departments.find(d => d.id === selectedDept);

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent-primary/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto">
              <Layers size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Departments</span>
            </motion.div>
            <motion.h1 variants={itemVariants}>
              Explore Our <span className="text-gradient-multi">Departments</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg max-w-3xl mx-auto">
              Six centers of excellence, each with specialized labs, dedicated faculty, and industry-aligned curriculum.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Department Explorer Grid */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setSelectedDept(dept.id)}
                className="glass-card p-8 glass-card-hover group relative overflow-hidden"
                role="button"
                tabIndex={0}
                aria-label={`View ${dept.name} details`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedDept(dept.id)}
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: dept.color }} />

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-6" style={{ background: `${dept.color}20`, border: `1px solid ${dept.color}30` }}>
                  <span style={{ color: dept.color }}>{dept.abbr}</span>
                </div>

                <h3 className="text-lg font-bold mb-3 group-hover:text-accent-primary transition-colors">{dept.name}</h3>
                <p className="text-sm mb-6">{dept.desc}</p>

                <div className="flex gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><Users size={12} /> {dept.faculty} Faculty</span>
                  <span className="flex items-center gap-1"><FlaskConical size={12} /> {dept.labs} Labs</span>
                  <span className="flex items-center gap-1"><BookOpen size={12} /> {dept.students} Students</span>
                </div>

                <div className="mt-6 text-accent-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Detail Modal */}
      <AnimatePresence>
        {activeDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-10 max-w-xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDept(null)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/[0.05] text-text-muted hover:text-text-heading transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6" style={{ background: `${activeDept.color}15`, border: `1px solid ${activeDept.color}25`, color: activeDept.color }}>
                {activeDept.abbr}
              </div>

              <h2 className="text-2xl font-bold mb-3">{activeDept.name}</h2>
              <p className="mb-6">{activeDept.desc}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-accent-primary">{activeDept.faculty}</div>
                  <div className="text-xs text-text-muted mt-1">Faculty</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-accent-secondary">{activeDept.labs}</div>
                  <div className="text-xs text-text-muted mt-1">Labs</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-accent-pink">{activeDept.students}</div>
                  <div className="text-xs text-text-muted mt-1">Students</div>
                </div>
              </div>

              <h4 className="font-bold mb-3">Key Highlights</h4>
              <ul className="space-y-2">
                {activeDept.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: activeDept.color }} />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
