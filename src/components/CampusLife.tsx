import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { BentoGrid } from './ui/BentoGrid';
import { BentoItem } from './ui/BentoItem';
import { Code, Users, Trophy, Music, Lightbulb } from 'lucide-react';

export default function CampusLife() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const activities = [
    { title: 'VTU State-Level Hackathons', description: 'Annual 24-hour coding challenges hosted by our vibrant IEEE Student Branch.', image: 'https://picsum.photos/seed/hackathon/800/800', className: 'md:col-span-2 md:row-span-2', icon: <Code className="h-4 w-4 text-accent-primary" /> },
    { title: 'Clubs & Societies', description: 'Active IEEE, ISTE, technical squads, and vibrant Kannada cultural forums.', image: 'https://picsum.photos/seed/clubs/800/600', className: 'md:col-span-1 md:row-span-1', icon: <Users className="h-4 w-4 text-accent-pink" /> },
    { title: 'Zonal Athletics', description: 'VTU Zonal champions equipped with state-of-the-art courts and athletic grounds.', image: 'https://picsum.photos/seed/sports/800/600', className: 'md:col-span-1 md:row-span-1', icon: <Trophy className="h-4 w-4 text-accent-warm" /> },
    { title: '"Pratibha" Cultural Fest', description: 'Our flagship annual festival celebrating art, music, and Karnataka heritage.', image: 'https://picsum.photos/seed/cultural/800/600', className: 'md:col-span-1 md:row-span-1', icon: <Music className="h-4 w-4 text-accent-secondary" /> },
    { title: 'Industry Workshops', description: 'Regular skill-building seminars hosted by hub technology leaders from Hubballi IT Park.', image: 'https://picsum.photos/seed/workshops/800/600', className: 'md:col-span-2 md:row-span-1', icon: <Lightbulb className="h-4 w-4 text-accent-primary" /> },
  ];

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-base pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
            Vibrant <span className="text-gradient-multi">Campus Life</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} className="max-w-2xl mx-auto mt-6 text-lg">
            Experience a dynamic environment that fosters creativity, leadership, and holistic development beyond the classroom.
          </motion.p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {activities.map((activity, index) => (
            <BentoItem key={index} title={activity.title} description={activity.description}
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-surface/50 border border-white/[0.04] overflow-hidden">
                <img src={activity.image} alt="" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
              </div>}
              icon={activity.icon} image={activity.image} className={activity.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
