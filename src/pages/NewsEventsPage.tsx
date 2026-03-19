import { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { Newspaper, Megaphone, Award, Calendar, Tag } from 'lucide-react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

type Category = 'All' | 'Announcements' | 'Events' | 'Results' | 'Hackathons';

const newsItems = [
  { id: 1, title: 'TechFest 2026 Registrations Open', cat: 'Events' as Category, date: 'Mar 15, 2026', desc: 'Annual flagship technology festival with 30+ competitions, keynote speakers, and workshops.', featured: true },
  { id: 2, title: 'VTU Results: 95% Pass Rate', cat: 'Results' as Category, date: 'Mar 10, 2026', desc: 'JCET students achieve outstanding results in VTU examinations with university toppers.' },
  { id: 3, title: 'Smart India Hackathon Winners', cat: 'Hackathons' as Category, date: 'Mar 5, 2026', desc: 'Team ByteForce from CSE wins first place at SIH 2026 with their AI healthcare solution.' },
  { id: 4, title: 'New AI Lab Inauguration', cat: 'Announcements' as Category, date: 'Feb 28, 2026', desc: 'State-of-the-art AI and Data Science lab equipped with GPU workstations inaugurated.' },
  { id: 5, title: 'Campus Placement Drive - TCS', cat: 'Announcements' as Category, date: 'Feb 20, 2026', desc: '45 students selected in TCS recruitment drive with packages up to 7 LPA.' },
  { id: 6, title: 'IEEE Conference Paper Accepted', cat: 'Results' as Category, date: 'Feb 15, 2026', desc: 'Two research papers by AIML department accepted at IEEE International Conference.' },
  { id: 7, title: 'CodeJam 2026', cat: 'Hackathons' as Category, date: 'Feb 10, 2026', desc: 'Intra-college coding competition with 200+ participants across all departments.' },
  { id: 8, title: 'Cultural Fest Dates Announced', cat: 'Events' as Category, date: 'Feb 5, 2026', desc: 'Annual cultural festival Prism 2026 scheduled for April 15-17 with major artist performances.' },
];

const categories: Category[] = ['All', 'Announcements', 'Events', 'Results', 'Hackathons'];
const catIcons = { All: Newspaper, Announcements: Megaphone, Events: Calendar, Results: Award, Hackathons: Tag };

export default function NewsEventsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const filtered = activeCategory === 'All' ? newsItems : newsItems.filter(n => n.cat === activeCategory);
  const featured = newsItems.find(n => n.featured);

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent-secondary/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto">
              <Newspaper size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">News & Events</span>
            </motion.div>
            <motion.h1 variants={itemVariants}>
              Stay <span className="text-gradient-cyan">Updated</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg max-w-3xl mx-auto">
              Latest announcements, events, achievements, and opportunities at JCET.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Event */}
      {featured && (
        <section className="section-container -mt-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 border-l-4 border-accent-primary"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold mb-4">
              Featured
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{featured.title}</h2>
            <p className="mb-4 max-w-3xl">{featured.desc}</p>
            <span className="text-sm text-text-muted">{featured.date}</span>
          </motion.div>
        </section>
      )}

      {/* Category Tabs */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => {
              const Icon = catIcons[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-accent-primary text-white'
                      : 'bg-surface/60 text-text-muted hover:text-text-heading hover:bg-surface'
                  }`}
                >
                  <Icon size={14} />
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-6 glass-card-hover"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-secondary/10 text-accent-secondary">
                    {item.cat}
                  </span>
                  <span className="text-xs text-text-muted">{item.date}</span>
                </div>
                <h4 className="text-base font-bold mb-2">{item.title}</h4>
                <p className="text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
