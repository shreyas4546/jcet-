import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NewsEvents() {
  const news = [
    {
      id: 1,
      title: 'JCET Hosts National Robotics Symposium 2026',
      date: 'March 15, 2026',
      category: 'Event',
      image: 'https://picsum.photos/seed/symposium/600/400',
      excerpt: 'Over 50 engineering colleges participated in the annual robotics showcase featuring autonomous drones and industrial bots.',
    },
    {
      id: 2,
      title: 'New AI Research Grant Awarded to CS Department',
      date: 'March 10, 2026',
      category: 'Research',
      image: 'https://picsum.photos/seed/grant/600/400',
      excerpt: 'The department secured a $2M grant for developing sustainable AI models for climate change prediction.',
    },
    {
      id: 3,
      title: 'Alumni Meet 2026: Celebrating 25 Years of Excellence',
      date: 'March 05, 2026',
      category: 'Alumni',
      image: 'https://picsum.photos/seed/alumni/600/400',
      excerpt: 'A grand reunion of JCET alumni from across the globe, sharing industry insights and networking.',
    },
  ];

  return (
    <section id="news" className="py-24 bg-navy-light/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              News & <span className="text-neon">Events</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-xl"
            >
              Stay updated with the latest happenings, research breakthroughs, and campus life.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#all-news"
            className="text-neon hover:text-neon-hover font-medium flex items-center gap-2 group"
          >
            View Newsroom
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-panel overflow-hidden group flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 bg-neon text-navy-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <Calendar size={14} />
                  <time dateTime={item.date}>{item.date}</time>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                  {item.excerpt}
                </p>
                <a href={`#news-${item.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-neon transition-colors mt-auto">
                  Read More <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
