import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Programs() {
  const programs = [
    {
      title: 'B.Tech in Artificial Intelligence',
      duration: '4 Years',
      desc: 'Master machine learning, neural networks, and advanced AI systems.',
      image: 'https://picsum.photos/seed/ai/600/400?blur=2',
    },
    {
      title: 'B.Tech in Computer Science',
      duration: '4 Years',
      desc: 'Core software engineering, algorithms, and full-stack development.',
      image: 'https://picsum.photos/seed/cs/600/400?blur=2',
    },
    {
      title: 'B.Tech in Robotics',
      duration: '4 Years',
      desc: 'Design and build autonomous systems and industrial robots.',
      image: 'https://picsum.photos/seed/robotics/600/400?blur=2',
    },
    {
      title: 'M.Tech in Cybersecurity',
      duration: '2 Years',
      desc: 'Advanced threat detection, cryptography, and network defense.',
      image: 'https://picsum.photos/seed/cyber/600/400?blur=2',
    },
  ];

  return (
    <section id="academics" className="py-24 bg-navy-light/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Academic <span className="text-neon">Programs</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-xl"
            >
              Explore our industry-aligned undergraduate and postgraduate programs designed for the future.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#all-programs"
            className="text-neon hover:text-neon-hover font-medium flex items-center gap-2 group"
          >
            View All Programs
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[320px] md:min-w-[400px] glass-panel overflow-hidden group snap-center flex-shrink-0 relative"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-navy-dark/40 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={program.image}
                  alt={program.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-navy-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-warm">
                  {program.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon transition-colors">
                  {program.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                  {program.desc}
                </p>
                <button className="text-sm font-semibold text-white flex items-center gap-2 group/btn">
                  Learn More
                  <ChevronRight size={16} className="text-neon group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
