import { motion } from 'motion/react';
import { Briefcase, TrendingUp, Users } from 'lucide-react';

export default function Placements() {
  const stats = [
    { label: 'Highest Package', value: '24 LPA', icon: <TrendingUp size={24} className="text-accent-primary" /> },
    { label: 'Average Package', value: '6.5 LPA', icon: <Briefcase size={24} className="text-accent-pink" /> },
    { label: 'Placement Rate', value: '98.4%', icon: <Users size={24} className="text-accent-secondary" /> },
  ];

  const companies = ['TCS', 'Infosys', 'Wipro', 'Bosch', 'Capgemini', 'Tech Mahindra', 'Cognizant', 'Cisco', 'IBM'];

  const timeline = [
    { year: '2024', company: 'Cisco', role: 'Network Engineer', package: '24 LPA', student: 'Aarav Sharma' },
    { year: '2024', company: 'Bosch', role: 'Embedded Developer', package: '18 LPA', student: 'Priya Patel' },
    { year: '2024', company: 'Capgemini', role: 'Senior Analyst', package: '12 LPA', student: 'Rahul Verma' },
  ];

  return (
    <section id="placements" className="section-padding relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Stellar <span className="text-gradient-cyan">Placements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg"
          >
            Consistently ranked among the top engineering colleges in North Karnataka for transforming students into highly sought-after industry professionals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="glass-card p-8 text-center glass-card-hover"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-extrabold text-text-heading mb-2">{stat.value}</h3>
              <p className="text-text-muted font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-base to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-base to-transparent z-10" />
            <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-8 text-center lg:text-left">Top Recruiters</h4>
            <div className="flex gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
              {[...companies, ...companies].map((company, index) => (
                <div key={index} className="px-6 py-3 rounded-lg bg-surface/60 border border-white/[0.08] text-text-primary font-bold text-xl flex-shrink-0">
                  {company}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <h4 className="text-sm font-bold text-accent-primary uppercase tracking-widest mb-8">Recent Highlights</h4>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              {timeline.map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-base text-accent-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-accent-primary rounded-full group-hover:scale-150 transition-transform" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 group-hover:border-accent-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold text-text-heading">{item.company}</h5>
                      <span className="text-xs font-bold text-accent-pink bg-accent-pink/10 px-2 py-1 rounded">{item.package}</span>
                    </div>
                    <p className="text-sm text-text-muted">{item.role}</p>
                    <p className="text-xs text-subtle mt-2">{item.student} · Class of {item.year}</p>
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
