import { motion, Variants } from 'motion/react';
import { Heart, Music, Trophy, Code, Palette, Dumbbell, Home as HomeIcon } from 'lucide-react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const clubs = [
  { name: 'Coding Club', desc: 'Weekly hackathons, competitive programming, and open-source projects.', icon: Code, color: '#7C3AED' },
  { name: 'Cultural Society', desc: 'Dance, drama, music, and literary events throughout the year.', icon: Music, color: '#F472B6' },
  { name: 'Sports Committee', desc: 'Cricket, football, basketball, and athletics at inter-college levels.', icon: Trophy, color: '#F59E0B' },
  { name: 'Art & Design', desc: 'Photography, digital art, poster design, and creative workshops.', icon: Palette, color: '#06B6D4' },
  { name: 'Fitness Club', desc: 'Gym sessions, yoga, martial arts, and wellness programs.', icon: Dumbbell, color: '#10B981' },
  { name: 'Hostel Life', desc: 'Separate hostels for boys and girls with modern amenities and security.', icon: HomeIcon, color: '#8B5CF6' },
];

const events = [
  { name: 'TechFest', desc: 'Annual flagship tech festival with 20+ events, workshops, and keynotes from industry leaders.', img: 'https://picsum.photos/seed/techfest/600/400' },
  { name: 'Culturals', desc: 'A grand celebration of art, dance, music, and drama performed by 500+ students.', img: 'https://picsum.photos/seed/culturals/600/400' },
  { name: 'Sports Meet', desc: 'Inter-department sports tournament spanning 15+ disciplines over a week.', img: 'https://picsum.photos/seed/sports/600/400' },
  { name: 'Hackathon 48', desc: '48-hour coding marathon with real-world problem statements from industry sponsors.', img: 'https://picsum.photos/seed/hackathon/600/400' },
];

export default function CampusLifePage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent-pink/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto" style={{ borderColor: 'rgba(244,114,182,0.2)', background: 'rgba(244,114,182,0.1)', color: '#F472B6' }}>
              <Heart size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Campus Life</span>
            </motion.div>
            <motion.h1 variants={itemVariants}>
              Life at <span className="text-gradient-multi">JCET</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg max-w-3xl mx-auto">
              Education extends beyond the classroom. Our campus is a melting pot of cultures, ideas, and talents.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2>Clubs & <span className="text-gradient-purple">Societies</span></h2>
            <p className="mt-4 max-w-2xl mx-auto">50+ student-run clubs covering technology, arts, sports, and community service.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club, i) => (
              <motion.div
                key={club.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-8 glass-card-hover"
              >
                <club.icon size={28} style={{ color: club.color }} className="mb-4" />
                <h4 className="text-lg font-bold mb-2">{club.name}</h4>
                <p className="text-sm">{club.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Showcase */}
      <section className="section-padding bg-surface/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2>Signature <span className="text-gradient-warm">Events</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card overflow-hidden glass-card-hover group"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={event.img} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-2">{event.name}</h4>
                  <p className="text-sm">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
