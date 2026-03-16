import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NewsEvents() {
  const events = [
    {
      id: 1,
      title: 'Annual Hackathon 2026: Code the Future',
      date: 'April 12, 2026',
      category: 'Hackathon',
      image: 'https://picsum.photos/seed/hackathon-event/800/600',
      excerpt: 'Join 500+ students in a 48-hour coding marathon to build innovative solutions for real-world problems.',
    },
    {
      id: 2,
      title: 'Advanced AI & Machine Learning Workshop',
      date: 'April 18, 2026',
      category: 'Workshop',
      image: 'https://picsum.photos/seed/ai-workshop/800/600',
      excerpt: 'A hands-on workshop led by industry experts covering neural networks, deep learning, and generative AI.',
    },
    {
      id: 3,
      title: 'Mega Campus Recruitment Drive',
      date: 'May 05, 2026',
      category: 'Placement',
      image: 'https://picsum.photos/seed/recruitment/800/600',
      excerpt: 'Top tech companies including Google, Microsoft, and Amazon are visiting campus for the annual placement drive.',
    },
  ];

  return (
    <section id="news-events" className="py-24 bg-navy-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            News & <span className="text-cyan-400">Events</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Stay updated with the latest happenings, workshops, and recruitment drives on campus.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a38] to-transparent opacity-60" />
                <div className="absolute top-4 right-4 z-20 bg-cyan-500 text-navy-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {event.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-cyan-400 mb-3 font-medium">
                  <Calendar size={16} />
                  <time dateTime={event.date}>{event.date}</time>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                  {event.excerpt}
                </p>
                
                <button className="w-full bg-white/10 hover:bg-cyan-500 hover:text-navy-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group/btn">
                  Read More
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
