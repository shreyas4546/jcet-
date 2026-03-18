import { motion } from 'motion/react';
import { Play, FileText } from 'lucide-react';

export default function StudentSpotlight() {
  const spotlights = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'B.Tech AI, Class of 2026',
      quote: '"JCET gave me the platform to build my own autonomous drone startup."',
      thumbnail: 'https://picsum.photos/seed/priya/400/600',
      videoUrl: '#',
    },
    {
      id: 2,
      name: 'Rahul Desai',
      role: 'M.Tech Cybersecurity',
      quote: '"The cybersecurity labs here are exactly what you find in top tech firms."',
      thumbnail: 'https://picsum.photos/seed/rahul/400/600',
      videoUrl: '#',
    },
    {
      id: 3,
      name: 'Ananya Gupta',
      role: 'B.Tech Robotics',
      quote: '"Winning the national robotics championship was a dream come true."',
      thumbnail: 'https://picsum.photos/seed/ananya/400/600',
      videoUrl: '#',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Student <span className="text-cyan-400">Spotlight</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Hear directly from our students about their journey, projects, and life at JCET.
          </motion.p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {spotlights.map((spotlight, index) => (
            <motion.div
              key={spotlight.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="min-w-[280px] md:min-w-[340px] h-[480px] rounded-2xl overflow-hidden relative group snap-center flex-shrink-0 cursor-pointer"
            >
              {/* Thumbnail */}
              <img
                src={spotlight.thumbnail}
                alt={`Video thumbnail of ${spotlight.name}`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-400/90 rounded-full flex items-center justify-center text-[#0B0F1A] shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform duration-300 z-10">
                <Play size={24} className="ml-1" fill="currentColor" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="text-lg font-bold text-white mb-2 italic leading-tight">
                  {spotlight.quote}
                </p>
                <h3 className="text-cyan-400 font-bold text-sm">{spotlight.name}</h3>
                <p className="text-xs text-gray-400 mb-4">{spotlight.role}</p>
                
                {/* Transcript Link */}
                <a
                  href="#transcript"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-xs font-medium text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors backdrop-blur-sm"
                  aria-label={`Read transcript for ${spotlight.name}'s video`}
                >
                  <FileText size={14} /> Read Transcript
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
