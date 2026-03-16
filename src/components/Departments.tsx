import { motion } from 'motion/react';

export default function Departments() {
  const departments = [
    {
      name: 'Computer Science Engineering',
      description: 'Learn software development, algorithms, and computing systems.',
      image: 'https://picsum.photos/seed/cse/800/600',
    },
    {
      name: 'Artificial Intelligence and Machine Learning',
      description: 'Explore neural networks, data science, and intelligent systems.',
      image: 'https://picsum.photos/seed/aiml/800/600',
    },
    {
      name: 'Mechanical Engineering',
      description: 'Design, analyze, and manufacture advanced mechanical systems.',
      image: 'https://picsum.photos/seed/mech/800/600',
    },
    {
      name: 'Civil Engineering',
      description: 'Build sustainable infrastructure, smart cities, and structural designs.',
      image: 'https://picsum.photos/seed/civil/800/600',
    },
    {
      name: 'Electronics Engineering',
      description: 'Innovate with microprocessors, embedded systems, and IoT devices.',
      image: 'https://picsum.photos/seed/ece/800/600',
    },
    {
      name: 'MBA',
      description: 'Develop leadership, management, and entrepreneurial skills.',
      image: 'https://picsum.photos/seed/mba/800/600',
    },
  ];

  return (
    <section id="departments" className="py-24 bg-navy-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            Academic <span className="text-cyan-400">Departments</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Specialized centers of excellence driving research, innovation, and leadership.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a38] to-transparent opacity-80" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">
                  {dept.description}
                </p>
                <button className="w-full bg-white/10 hover:bg-cyan-500 hover:text-navy-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
                  View Department
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
