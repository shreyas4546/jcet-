import { motion } from 'motion/react';
import { Cpu, Settings, Building2, Zap, BrainCircuit, Briefcase } from 'lucide-react';

export default function Departments() {
  const departments = [
    { name: 'Computer Science Engineering', icon: <Cpu size={28} />, color: 'text-blue-400' },
    { name: 'Mechanical Engineering', icon: <Settings size={28} />, color: 'text-gray-400' },
    { name: 'Civil Engineering', icon: <Building2 size={28} />, color: 'text-orange-400' },
    { name: 'Electronics Engineering', icon: <Zap size={28} />, color: 'text-warm' },
    { name: 'Artificial Intelligence', icon: <BrainCircuit size={28} />, color: 'text-neon' },
    { name: 'MBA', icon: <Briefcase size={28} />, color: 'text-purple-400' },
  ];

  return (
    <section id="departments" className="py-24 bg-navy-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Academic <span className="text-neon">Departments</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Specialized centers of excellence driving research, innovation, and leadership.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <motion.a
              href={`#dept-${index}`}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 flex flex-col items-center justify-center text-center gap-6 group hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-neon border border-white/10 shadow-xl"
            >
              <div className={`p-5 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors ${dept.color} shadow-inner`}>
                {dept.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">
                {dept.name}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
