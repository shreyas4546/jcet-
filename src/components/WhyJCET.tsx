import { motion } from 'motion/react';
import { Lightbulb, Trophy, Users } from 'lucide-react';

export default function WhyJCET() {
  const features = [
    {
      icon: <Lightbulb size={32} className="text-accent-primary" />,
      title: 'Innovation First',
      description: 'Our curriculum is designed around hands-on projects, industry partnerships, and cutting-edge research facilities.',
    },
    {
      icon: <Trophy size={32} className="text-accent-pink" />,
      title: 'Global Recognition',
      description: 'Ranked among top engineering institutions globally, ensuring your degree carries weight anywhere in the world.',
    },
    {
      icon: <Users size={32} className="text-accent-secondary" />,
      title: 'Expert Faculty',
      description: 'Learn from industry veterans and renowned researchers who bring real-world experience into the classroom.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-surface/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="section-badge mx-auto">
              <Lightbulb size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Why JCET</span>
            </div>
            <h2>
              Why Choose <span className="text-gradient-purple">JCET</span>?
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl mx-auto"
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
              className="glass-card p-8 glass-card-hover group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
