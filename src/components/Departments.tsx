import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import MagneticCard from './ui/magnetic-card-v1.0.0';

export default function Departments() {
  const departments = [
    { name: 'Computer Science Engineering', description: 'Learn software development, algorithms, and computing systems.', image: 'https://picsum.photos/seed/cse/800/600' },
    { name: 'Artificial Intelligence and Machine Learning', description: 'Explore neural networks, data science, and intelligent systems.', image: 'https://picsum.photos/seed/aiml/800/600' },
    { name: 'Mechanical Engineering', description: 'Design, analyze, and manufacture advanced mechanical systems.', image: 'https://picsum.photos/seed/mech/800/600' },
    { name: 'Civil Engineering', description: 'Build sustainable infrastructure, smart cities, and structural designs.', image: 'https://picsum.photos/seed/civil/800/600' },
    { name: 'Electronics Engineering', description: 'Innovate with microprocessors, embedded systems, and IoT devices.', image: 'https://picsum.photos/seed/ece/800/600' },
    { name: 'MBA', description: 'Develop leadership, management, and entrepreneurial skills.', image: 'https://picsum.photos/seed/mba/800/600' },
  ];

  return (
    <section id="departments" className="section-padding bg-surface/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Academic <span className="text-gradient-purple">Departments</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl mx-auto"
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="h-[400px]"
            >
              <MagneticCard
                title={dept.name}
                subtitle="Department"
                imageSrc={dept.image}
                className="h-full"
              >
                <p className="text-text-muted text-sm mb-4 line-clamp-2">
                  {dept.description}
                </p>
                <Link to="/departments" className="text-accent-primary font-bold text-xs uppercase tracking-widest hover:underline cursor-pointer">
                  Explore More
                </Link>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
