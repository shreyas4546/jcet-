import { motion, Variants } from 'motion/react';
import { Target, BookOpen, Users, Award, History, Eye, Heart } from 'lucide-react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const milestones = [
  { year: '2010', title: 'Foundation', desc: 'JCET established under Jain Group of Institutions with a vision for engineering excellence.' },
  { year: '2013', title: 'NBA Accreditation', desc: 'Received National Board of Accreditation for flagship engineering programs.' },
  { year: '2016', title: 'Research Center', desc: 'Launched dedicated R&D centers for AI, IoT, and Sustainable Engineering.' },
  { year: '2019', title: 'Industry Collab', desc: 'Partnered with 50+ industry leaders for internships and live project training.' },
  { year: '2022', title: 'Top 10 Ranking', desc: 'Ranked among Top 10 engineering colleges in Karnataka by VTU.' },
  { year: '2025', title: 'Global Outreach', desc: 'International exchange programs with 10+ universities worldwide.' },
];

export default function AboutPage() {
  return (
    <div className="pt-28">
      {/* Hero Banner */}
      <section className="section-padding bg-gradient-to-b from-accent-primary/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto">
              <BookOpen size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Our Story</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="mb-6">
              Building <span className="text-gradient-purple">Tomorrow&apos;s</span> Engineers
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-3xl mx-auto">
              For over a decade, Jain College of Engineering and Technology has been a beacon of academic
              excellence, innovation, and industry relevance in the heart of Hubballi, Karnataka.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding">
        <div className="section-container grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To produce competent engineers who are industry-ready, ethically sound, and socially responsible through quality education and research.', color: 'text-accent-primary' },
            { icon: Eye, title: 'Our Vision', desc: 'To be a globally recognized center of excellence in engineering education, fostering innovation and creating leaders who shape the future.', color: 'text-accent-secondary' },
            { icon: Heart, title: 'Our Values', desc: 'Integrity, innovation, inclusivity, and impact. We believe in nurturing the whole student — mind, skills, and character.', color: 'text-accent-pink' },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="glass-card p-8 glass-card-hover"
            >
              <item.icon size={32} className={`${item.color} mb-4`} />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-surface/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">
              <History size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Our Journey</span>
            </div>
            <h2>A Decade of <span className="text-gradient-cyan">Excellence</span></h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/[0.08]" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                    <span className="text-accent-primary font-bold text-sm">{m.year}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{m.title}</h4>
                    <p className="text-sm">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding">
        <div className="section-container text-center">
          <div className="section-badge mx-auto">
            <Users size={14} />
            <span className="tracking-widest uppercase text-xs font-bold">Leadership</span>
          </div>
          <h2 className="mb-6">Guided by <span className="text-gradient-warm">Visionaries</span></h2>
          <p className="max-w-2xl mx-auto mb-12">Our leadership combines decades of academic expertise with a forward-thinking approach to engineering education.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Rajesh Jain', role: 'Chairman', img: 'https://picsum.photos/seed/chair/300/300' },
              { name: 'Dr. Meera Sharma', role: 'Principal', img: 'https://picsum.photos/seed/principal/300/300' },
              { name: 'Prof. Anil Kumar', role: 'Dean of Academics', img: 'https://picsum.photos/seed/dean/300/300' },
              { name: 'Dr. Priya Nayak', role: 'Dean of Placement', img: 'https://picsum.photos/seed/placement/300/300' },
            ].map((person) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 glass-card-hover text-center"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-accent-primary/20">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h4 className="text-base font-bold">{person.name}</h4>
                <p className="text-sm text-accent-secondary">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-surface/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto">
              <Award size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Achievements</span>
            </div>
            <h2>Numbers That <span className="text-gradient-multi">Speak</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '3000+', label: 'Students' },
              { value: '150+', label: 'Faculty Members' },
              { value: '50+', label: 'Research Papers/Year' },
              { value: '200+', label: 'Industry Partners' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-8"
              >
                <div className="text-3xl font-bold text-accent-primary mb-2">{stat.value}</div>
                <div className="text-sm text-text-muted uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
