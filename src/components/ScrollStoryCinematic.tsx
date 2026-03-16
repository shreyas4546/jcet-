/**
 * ScrollStoryCinematic v1.0.0
 * 
 * Description: A full-screen cinematic scroll storytelling experience.
 * Each scroll step reveals a new message with parallax background movement.
 * 
 * Usage:
 * <ScrollStoryCinematic />
 */

import React from 'react';
import { motion } from 'motion/react';

const STORY_STEPS = [
  {
    id: 1,
    headline: "Welcome to JCET",
    bgImage: "https://picsum.photos/seed/jcet-welcome/1920/1080?blur=2",
  },
  {
    id: 2,
    headline: "Advanced Engineering Labs",
    bgImage: "https://picsum.photos/seed/jcet-labs/1920/1080?blur=1",
  },
  {
    id: 3,
    headline: "Strong Industry Placements",
    bgImage: "https://picsum.photos/seed/jcet-placements/1920/1080?blur=1",
  },
  {
    id: 4,
    headline: "Vibrant Campus Life",
    bgImage: "https://picsum.photos/seed/jcet-campus/1920/1080?blur=1",
  },
  {
    id: 5,
    headline: "Start Your Engineering Journey",
    bgImage: "https://picsum.photos/seed/jcet-journey/1920/1080?blur=2",
  },
];

const ScrollStoryCinematic: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#002752] via-black to-[#001c34]">
      {STORY_STEPS.map((step, index) => (
        <section 
          key={step.id} 
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Parallax Background */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={step.bgImage} 
              alt="" 
              className="w-full h-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            >
              <motion.span 
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                whileInView={{ opacity: 0.6, letterSpacing: '0.3em' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-neon font-mono text-xs md:text-sm font-bold uppercase mb-6 block"
              >
                Chapter 0{index + 1}
              </motion.span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                {step.headline}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-12 h-1 bg-gradient-to-r from-transparent via-neon to-transparent mx-auto rounded-full" 
              />
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-20">
            <div className="w-[1px] h-24 bg-gradient-to-b from-neon to-transparent" />
          </div>
        </section>
      ))}
    </div>
  );
};

export default ScrollStoryCinematic;
