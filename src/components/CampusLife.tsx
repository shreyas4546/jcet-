import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function CampusLife() {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const activities = [
    {
      title: 'Hackathons & Tech Fests',
      description: '24-hour coding challenges and technology showcases.',
      image: 'https://picsum.photos/seed/hackathon/800/800',
      className: 'md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0',
    },
    {
      title: 'Clubs & Societies',
      description: 'Join over 20+ technical and cultural clubs.',
      image: 'https://picsum.photos/seed/clubs/800/600',
      className: 'md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-0',
    },
    {
      title: 'Sports & Athletics',
      description: 'State-of-the-art sports facilities and tournaments.',
      image: 'https://picsum.photos/seed/sports/800/600',
      className: 'md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-0',
    },
    {
      title: 'Cultural Events',
      description: 'Annual fests celebrating art, music, and dance.',
      image: 'https://picsum.photos/seed/cultural/800/600',
      className: 'md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-0',
    },
    {
      title: 'Workshops & Seminars',
      description: 'Hands-on learning with industry experts.',
      image: 'https://picsum.photos/seed/workshops/800/600',
      className: 'md:col-span-2 md:row-span-1 min-h-[250px] md:min-h-0',
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-[#001a38] relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <img 
          src="https://picsum.photos/seed/campus-life-bg/1920/1080" 
          alt="Campus Life Background" 
          className="w-full h-[150%] object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#001a38]/80" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            Vibrant <span className="text-cyan-400">Campus Life</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Experience a dynamic environment that fosters creativity, leadership, and holistic development beyond the classroom.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[280px]">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-cyan-500/20 transition-shadow ${activity.className}`}
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a38] via-[#001a38]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
