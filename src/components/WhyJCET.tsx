import { motion } from 'motion/react';
import { Lightbulb, Trophy, Users } from 'lucide-react';

interface WhyJCETProps {
  isHighlighted?: boolean;
}

export default function WhyJCET({ isHighlighted }: WhyJCETProps) {
  const features = [
    {
      icon: <Lightbulb size={32} className="text-neon" />,
      title: 'Innovation First',
      description: 'Our curriculum is designed around hands-on projects, industry partnerships, and cutting-edge research facilities.',
    },
    {
      icon: <Trophy size={32} className="text-warm" />,
      title: 'Global Recognition',
      description: 'Ranked among top engineering institutions globally, ensuring your degree carries weight anywhere in the world.',
    },
    {
      icon: <Users size={32} className="text-blue-400" />,
      title: 'Expert Faculty',
      description: 'Learn from industry veterans and renowned researchers who bring real-world experience into the classroom.',
    },
  ];

  return (
    <section id="about" className={`py-24 relative transition-all duration-700 ${isHighlighted ? 'bg-navy-dark/80 shadow-[0_0_50px_rgba(0,229,255,0.1)]' : 'bg-navy-dark'}`}>
      {/* Highlight Overlay */}
      <div className={`absolute inset-0 bg-neon/5 transition-opacity duration-700 pointer-events-none ${isHighlighted ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent transition-opacity duration-700 ${isHighlighted ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent transition-opacity duration-700 ${isHighlighted ? 'opacity-100' : 'opacity-0'}`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Choose <span className="text-neon">JCET</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We don't just teach engineering; we cultivate innovators. Discover what makes our approach unique.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="glass-panel p-8 glass-panel-hover group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
