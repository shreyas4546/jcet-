import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import MagneticCard from './ui/magnetic-card-v1.0.0';
import { useLanguage } from '../contexts/LanguageContext';

export default function Departments() {
  const { t } = useLanguage();

  const departments = [
    { name: t('dept.cse.name'), description: t('dept.cse.desc'), image: 'https://picsum.photos/seed/cse/800/600' },
    { name: t('dept.aiml.name'), description: t('dept.aiml.desc'), image: 'https://picsum.photos/seed/aiml/800/600' },
    { name: t('dept.mech.name'), description: t('dept.mech.desc'), image: 'https://picsum.photos/seed/mech/800/600' },
    { name: t('dept.civil.name'), description: t('dept.civil.desc'), image: 'https://picsum.photos/seed/civil/800/600' },
    { name: t('dept.ece.name'), description: t('dept.ece.desc'), image: 'https://picsum.photos/seed/ece/800/600' },
    { name: t('dept.mba.name'), description: t('dept.mba.desc'), image: 'https://picsum.photos/seed/mba/800/600' },
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
            {t('dept.title')} <span className="text-gradient-purple">{t('dept.highlight')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg"
          >
            {t('dept.desc')}
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
                subtitle={t('dept.card.subtitle')}
                imageSrc={dept.image}
                className="h-full"
              >
                <p className="text-text-muted text-sm mb-4 line-clamp-2">
                  {dept.description}
                </p>
                <Link to="/departments" className="text-accent-primary font-bold text-xs uppercase tracking-widest hover:underline cursor-pointer">
                  {t('dept.explore')}
                </Link>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
