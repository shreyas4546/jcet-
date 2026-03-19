import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, ExternalLink, Loader2 } from 'lucide-react';

const HOTSPOTS = [
  { id: 'main', name: 'Main Academic Block', desc: 'The heart of JCET housing administrative offices and core classrooms.', top: '40%', left: '50%' },
  { id: 'cse', name: 'Computer Science Lab', desc: 'State-of-the-art computing facilities with high-speed internet and modern software.', top: '30%', left: '60%' },
  { id: 'mech', name: 'Mechanical Workshop', desc: 'Fully equipped workshop for hands-on mechanical engineering practice.', top: '60%', left: '30%' },
  { id: 'library', name: 'Library', desc: 'Central library with digital learning resources and research journals.', top: '45%', left: '70%' },
  { id: 'sports', name: 'Sports Complex', desc: 'Indoor and outdoor sports facilities for overall student development.', top: '75%', left: '80%' },
  { id: 'auditorium', name: 'Auditorium', desc: 'Large seating capacity hall for seminars, cultural events, and guest lectures.', top: '20%', left: '40%' },
  { id: 'hostel', name: 'Hostel', desc: 'Comfortable and secure residential facilities for students.', top: '80%', left: '20%' },
];

export default function CampusMap() {
  const [activeSpot, setActiveSpot] = useState<typeof HOTSPOTS[0] | null>(null);
  const [loadingMapInfo, setLoadingMapInfo] = useState(false);
  const [mapInfo, setMapInfo] = useState<string | null>(null);

  const handleViewMore = async (spot: typeof HOTSPOTS[0]) => {
    setLoadingMapInfo(true);
    setMapInfo(null);
    try {
      // Simplified — removed Gemini API call to prevent crashes if API key is missing
      await new Promise(r => setTimeout(r, 1000));
      setMapInfo(`${spot.name} is one of JCET's premier facilities, offering students world-class infrastructure and resources for academic excellence.`);
    } catch {
      setMapInfo('Information not available at this time.');
    } finally {
      setLoadingMapInfo(false);
    }
  };

  return (
    <section className="section-padding bg-surface/30 relative overflow-hidden" id="campus-map">
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
            Explore Our <span className="text-gradient-cyan">Campus</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} className="max-w-2xl mx-auto">
            Discover laboratories, classrooms, sports facilities, and innovation spaces at JCET.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] glass-card overflow-hidden shadow-2xl"
        >
          <img src="https://picsum.photos/seed/jcetcampus/1920/1080?blur=2" alt="JCET Campus Map showing various buildings and facilities" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" loading="lazy" />

          {HOTSPOTS.map((spot) => (
            <div key={spot.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ top: spot.top, left: spot.left }}>
              <button className="relative group focus:outline-none focus:ring-4 focus:ring-accent-primary rounded-full p-2 cursor-pointer"
                onClick={() => { setActiveSpot(spot); setMapInfo(null); }}
                aria-label={`View details for ${spot.name}`} aria-expanded={activeSpot?.id === spot.id}
              >
                <div className="absolute inset-0 bg-accent-primary rounded-full animate-ping opacity-75" />
                <div className="relative w-4 h-4 bg-accent-primary rounded-full border-2 border-white shadow-[0_0_10px_rgba(124,58,237,0.8)] transition-transform group-hover:scale-125" />
              </button>
            </div>
          ))}

          <AnimatePresence>
            {activeSpot && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 glass-card p-6 z-20"
              >
                <button onClick={() => setActiveSpot(null)} className="absolute top-4 right-4 text-text-muted hover:text-text-heading transition-colors cursor-pointer rounded-full p-1" aria-label="Close popup">
                  <X size={20} />
                </button>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-accent-primary/20 rounded-lg text-accent-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-heading">{activeSpot.name}</h3>
                    <p className="text-sm text-text-muted mt-1">{activeSpot.desc}</p>
                  </div>
                </div>

                {mapInfo ? (
                  <div className="mt-4 pt-4 border-t border-white/[0.08]">
                    <h4 className="text-xs font-semibold text-accent-primary uppercase tracking-wider mb-2">More Info</h4>
                    <p className="text-sm text-text-primary">{mapInfo}</p>
                  </div>
                ) : (
                  <button onClick={() => handleViewMore(activeSpot)} disabled={loadingMapInfo}
                    className="mt-4 w-full bg-white/[0.05] hover:bg-white/10 text-text-primary font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loadingMapInfo ? (<><Loader2 size={16} className="animate-spin" /> Fetching Info...</>) : 'View more'}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
