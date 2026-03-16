import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, Mail } from 'lucide-react';

export default function Faculty() {
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const facultyList = [
    {
      id: 1,
      name: 'Dr. Sarah Jenkins',
      role: 'Head of AI Research',
      image: 'https://picsum.photos/seed/sarah/400/400',
      bio: 'Former lead researcher at DeepMind. Specializes in reinforcement learning and neural architectures.',
      publications: 45,
    },
    {
      id: 2,
      name: 'Prof. Alan Turing',
      role: 'Professor of Computer Science',
      image: 'https://picsum.photos/seed/alan/400/400',
      bio: 'Pioneer in theoretical computer science. Focuses on algorithms and computational complexity.',
      publications: 120,
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      role: 'Director of Robotics Lab',
      image: 'https://picsum.photos/seed/emily/400/400',
      bio: 'Expert in autonomous systems and human-robot interaction. Leads the advanced robotics initiative.',
      publications: 32,
    },
    {
      id: 4,
      name: 'Dr. Marcus Webb',
      role: 'Cybersecurity Lead',
      image: 'https://picsum.photos/seed/marcus/400/400',
      bio: 'Former national security consultant. Teaches advanced cryptography and network defense.',
      publications: 28,
    },
  ];

  return (
    <section className="py-24 bg-navy-light/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              World-Class <span className="text-neon">Faculty</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-gray-400 max-w-xl"
            >
              Learn from industry veterans and renowned researchers who bring real-world experience into the classroom.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyList.map((faculty, index) => (
            <motion.button
              key={faculty.id}
              onClick={() => setSelectedFaculty(faculty)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="glass-panel p-6 text-left group hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon"
              aria-label={`View profile of ${faculty.name}`}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-neon transition-colors">
                <img src={faculty.image} alt={faculty.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon transition-colors">{faculty.name}</h3>
              <p className="text-sm text-gray-400">{faculty.role}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedFaculty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFaculty(null)}
              className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-navy-light border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-navy-dark/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neon"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              
              <div className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <img src={selectedFaculty.image} alt={selectedFaculty.name} referrerPolicy="no-referrer" className="w-24 h-24 rounded-full object-cover border-2 border-neon" />
                  <div>
                    <h2 id="modal-title" className="text-2xl font-bold text-white mb-1">{selectedFaculty.name}</h2>
                    <p className="text-neon font-medium text-sm">{selectedFaculty.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedFaculty.bio}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="text-sm">
                    <span className="text-gray-400">Publications: </span>
                    <span className="text-white font-bold">{selectedFaculty.publications}+</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-neon transition-colors" aria-label="LinkedIn Profile">
                      <Linkedin size={18} />
                    </a>
                    <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-neon transition-colors" aria-label="Email Contact">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
