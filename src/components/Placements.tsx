import { motion } from 'motion/react';
import { Briefcase, TrendingUp, Users } from 'lucide-react';

export default function Placements() {
  const stats = [
    { label: 'Highest Package', value: '45 LPA', icon: <TrendingUp size={24} className="text-neon" /> },
    { label: 'Average Package', value: '12 LPA', icon: <Briefcase size={24} className="text-warm" /> },
    { label: 'Placement Rate', value: '98%', icon: <Users size={24} className="text-blue-400" /> },
  ];

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'SpaceX'
  ];

  const timeline = [
    { year: '2025', company: 'Google', role: 'Software Engineer', package: '45 LPA', student: 'Aarav Sharma' },
    { year: '2025', company: 'Microsoft', role: 'Data Scientist', package: '42 LPA', student: 'Priya Patel' },
    { year: '2024', company: 'Amazon', role: 'SDE II', package: '38 LPA', student: 'Rahul Verma' },
  ];

  return (
    <section id="placements" className="py-24 bg-navy-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Stellar <span className="text-neon">Placements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Our students are recruited by the world's leading technology companies.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
              className="glass-panel p-8 text-center group hover:border-neon/50 transition-colors"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Timeline & Marquee */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Marquee */}
          <div className="lg:col-span-6 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-navy-dark to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-navy-dark to-transparent z-10" />
            
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8 text-center lg:text-left">Top Recruiters</h4>
            
            <div className="flex gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
              {/* Duplicate for seamless loop */}
              {[...companies, ...companies].map((company, index) => (
                <div key={index} className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-bold text-xl flex-shrink-0">
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="lg:col-span-6">
            <h4 className="text-sm font-bold text-neon uppercase tracking-widest mb-8">Recent Highlights</h4>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-navy-dark text-neon shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-neon rounded-full group-hover:scale-150 transition-transform" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 group-hover:border-neon/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold text-white">{item.company}</h5>
                      <span className="text-xs font-bold text-warm bg-warm/10 px-2 py-1 rounded">{item.package}</span>
                    </div>
                    <p className="text-sm text-gray-300">{item.role}</p>
                    <p className="text-xs text-gray-500 mt-2">{item.student} • Class of {item.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
