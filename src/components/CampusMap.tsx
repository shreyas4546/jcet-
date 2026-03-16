import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, ExternalLink, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

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
  const [mapLinks, setMapLinks] = useState<any[]>([]);

  const fetchMapInfo = async (locationName: string) => {
    setLoadingMapInfo(true);
    setMapInfo(null);
    setMapLinks([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Tell me about ${locationName} at Jain College of Engineering and Technology (JCET), Hubballi. What can you find there? Keep it brief (2-3 sentences).`,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: 15.3647, // Approximate Hubballi lat
                longitude: 75.1240 // Approximate Hubballi lng
              }
            }
          }
        }
      });
      setMapInfo(response.text || 'Information not available.');
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const links = chunks.map(chunk => chunk.maps?.uri).filter(Boolean);
        setMapLinks(links);
      }
    } catch (error) {
      console.error('Error fetching map info:', error);
      setMapInfo('Failed to load real-time information.');
    } finally {
      setLoadingMapInfo(false);
    }
  };

  const handleViewMore = (spot: typeof HOTSPOTS[0]) => {
    fetchMapInfo(spot.name);
  };

  return (
    <section className="py-20 bg-navy-dark relative overflow-hidden" id="campus-map">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Explore Our Campus
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Discover laboratories, classrooms, sports facilities, and innovation spaces at JCET.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-navy/50 rounded-2xl border border-glass-border overflow-hidden shadow-2xl"
        >
          {/* Map Image */}
          <img 
            src="https://picsum.photos/seed/jcetcampus/1920/1080?blur=2" 
            alt="JCET Campus Map showing various buildings and facilities" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />

          {/* Hotspots */}
          {HOTSPOTS.map((spot) => (
            <div 
              key={spot.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: spot.top, left: spot.left }}
            >
              <button
                className="relative group focus:outline-none focus:ring-4 focus:ring-neon rounded-full p-2"
                onClick={() => {
                  setActiveSpot(spot);
                  setMapInfo(null);
                  setMapLinks([]);
                }}
                aria-label={`View details for ${spot.name}`}
                aria-expanded={activeSpot?.id === spot.id}
              >
                <div className="absolute inset-0 bg-neon rounded-full animate-ping opacity-75"></div>
                <div className="relative w-4 h-4 bg-neon rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,229,255,0.8)] transition-transform group-hover:scale-125"></div>
              </button>
            </div>
          ))}

          {/* Popup Card */}
          <AnimatePresence>
            {activeSpot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 glass-panel p-6 z-20"
              >
                <button 
                  onClick={() => setActiveSpot(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-neon rounded-full p-1 transition-colors"
                  aria-label="Close popup"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-neon/20 rounded-lg text-neon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeSpot.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">{activeSpot.desc}</p>
                  </div>
                </div>

                {mapInfo ? (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-semibold text-neon uppercase tracking-wider mb-2">AI Insights (Google Maps)</h4>
                    <p className="text-sm text-gray-200">{mapInfo}</p>
                    {mapLinks.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {mapLinks.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neon"
                          >
                            View on Maps <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => handleViewMore(activeSpot)}
                    disabled={loadingMapInfo}
                    className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-neon disabled:opacity-50"
                  >
                    {loadingMapInfo ? (
                      <><Loader2 size={16} className="animate-spin" /> Fetching Info...</>
                    ) : (
                      'View more'
                    )}
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
