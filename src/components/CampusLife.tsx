import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { BentoGrid } from './ui/BentoGrid';
import { BentoItem } from './ui/BentoItem';
import { Code, Users, Trophy, Music, Lightbulb } from 'lucide-react';

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
      className: 'md:col-span-2 md:row-span-2',
      icon: <Code className="h-4 w-4 text-cyan-400" />,
    },
    {
      title: 'Clubs & Societies',
      description: 'Join over 20+ technical and cultural clubs.',
      image: 'https://picsum.photos/seed/clubs/800/600',
      className: 'md:col-span-1 md:row-span-1',
      icon: <Users className="h-4 w-4 text-pink-400" />,
    },
    {
      title: 'Sports & Athletics',
      description: 'State-of-the-art sports facilities and tournaments.',
      image: 'https://picsum.photos/seed/sports/800/600',
      className: 'md:col-span-1 md:row-span-1',
      icon: <Trophy className="h-4 w-4 text-blue-400" />,
    },
    {
      title: 'Cultural Events',
      description: 'Annual fests celebrating art, music, and dance.',
      image: 'https://picsum.photos/seed/cultural/800/600',
      className: 'md:col-span-1 md:row-span-1',
      icon: <Music className="h-4 w-4 text-purple-400" />,
    },
    {
      title: 'Workshops & Seminars',
      description: 'Hands-on learning with industry experts.',
      image: 'https://picsum.photos/seed/workshops/800/600',
      className: 'md:col-span-2 md:row-span-1',
      icon: <Lightbulb className="h-4 w-4 text-yellow-400" />,
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-black relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <img 
          src="https://picsum.photos/seed/campus-life-bg/1920/1080" 
          alt="Campus Life Background" 
          className="w-full h-[150%] object-cover opacity-5"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#0B0F1A]/80" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            Vibrant <span className="text-cyan-400">Campus Life</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Experience a dynamic environment that fosters creativity, leadership, and holistic development beyond the classroom.
          </motion.p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {activities.map((activity, index) => (
            <BentoItem
              key={index}
              title={activity.title}
              description={activity.description}
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-white/5 to-white/10" />}
              icon={activity.icon}
              image={activity.image}
              className={activity.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
