import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, ChevronRight, Building2, Monitor, Wrench, BookOpen, Home, Trophy, Theater } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/* ══════════════════════════════════════════════
   PremiumCampusMap — Interactive Campus Explorer
   id: p26-campus-map-premium
   ══════════════════════════════════════════════ */

const HOTSPOTS = [
  {
    id: 'academic',
    name: 'Academic Block',
    desc: 'The heart of JCET — housing administrative offices, core classrooms, and faculty chambers.',
    icon: Building2,
    color: '#7C3AED',
    top: 38,
    left: 48,
  },
  {
    id: 'cse-lab',
    name: 'Computer Science Lab',
    desc: 'State-of-the-art computing labs with high-performance workstations and cloud-connected infrastructure.',
    icon: Monitor,
    color: '#06B6D4',
    top: 28,
    left: 68,
  },
  {
    id: 'library',
    name: 'Library',
    desc: 'Central library with digital learning resources, research journals, and reading halls.',
    icon: BookOpen,
    color: '#10B981',
    top: 32,
    left: 34,
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    desc: 'Indoor and outdoor sports facilities including cricket, basketball, and athletics.',
    icon: Trophy,
    color: '#EF4444',
    top: 74,
    left: 44,
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    desc: 'Multi-purpose hall for seminars, cultural events, and guest lectures.',
    icon: Theater,
    color: '#8B5CF6',
    top: 48,
    left: 80,
  },
];

export default function PremiumCampusMap() {
  const [activeSpot, setActiveSpot] = useState<typeof HOTSPOTS[0] | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Close popup on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSpot(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Close popup on click outside the map container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mapContainerRef.current && !mapContainerRef.current.contains(e.target as Node)) {
        setActiveSpot(null);
      }
    };
    if (activeSpot) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeSpot]);

  return (
    <section
      id="p26-campus-map-premium"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: isLight
          ? 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)'
          : 'linear-gradient(to bottom, #060a14, #0B1120, #060a14)',
      }}
      aria-label="Explore Our Campus"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Removed ambient glow to reduce noise */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span
              className="inline-block font-mono text-xs tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full border"
              style={{
                color: '#7C3AED',
                borderColor: isLight ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.3)',
                background: isLight ? 'rgba(124,58,237,0.06)' : 'rgba(124,58,237,0.1)',
              }}
            >
              Campus Tour
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight"
              style={{ color: isLight ? '#1e293b' : '#ffffff' }}
            >
              Explore Our{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Campus
              </span>
            </h2>
            <p
              className="mt-4 max-w-2xl mx-auto text-base md:text-lg"
              style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.55)' }}
            >
              Click on any location marker to discover our world-class facilities and infrastructure.
            </p>
          </motion.div>
        </div>

        {/* Map Container */}
        <motion.div
          ref={mapContainerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: isLight
              ? '0 25px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)'
              : '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          {/* Map Image */}
          <div className="relative w-full aspect-[16/10] md:aspect-[21/9]">
            <img
              src="/images/campus-map.png"
              alt="JCET Campus aerial illustration showing Academic Block, Computer Science Lab, Mechanical Workshop, Library, Hostel, Sports Complex, and Auditorium"
              className="w-full h-full object-cover"
              loading="lazy"
              style={{
                opacity: isLight ? 0.85 : 0.7,
                filter: isLight ? 'brightness(1.1) saturate(0.9)' : 'none',
              }}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isLight
                  ? 'linear-gradient(to top, rgba(241,245,249,0.6) 0%, transparent 30%), linear-gradient(to bottom, rgba(241,245,249,0.3) 0%, transparent 20%)'
                  : 'linear-gradient(to top, rgba(6,10,20,0.7) 0%, transparent 30%), linear-gradient(to bottom, rgba(6,10,20,0.4) 0%, transparent 20%)',
              }}
            />

            {/* Hotspot Markers */}
            {HOTSPOTS.map((spot, idx) => {
              const isSelected = activeSpot?.id === spot.id;
              const Icon = spot.icon;
              return (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.08, ease: 'backOut' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
                >
                  <button
                    className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full cursor-pointer"
                    style={{ ['--ring-color' as string]: spot.color, focusVisibleRingColor: spot.color } as React.CSSProperties}
                    onClick={() => setActiveSpot(isSelected ? null : spot)}
                    aria-label={`View details for ${spot.name}`}
                    aria-expanded={isSelected}
                  >
                    {/* Pulse ring */}
                    <span
                      className="absolute inset-[-6px] rounded-full animate-ping"
                      style={{
                        background: spot.color,
                        opacity: isSelected ? 0 : 0.2,
                        animationDuration: '2.5s',
                      }}
                    />
                    {/* Outer glow */}
                    <span
                      className="absolute inset-[-4px] rounded-full transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${spot.color}40, transparent)`,
                        opacity: isSelected ? 1 : 0,
                      }}
                    />
                    {/* Marker body */}
                    <span
                      className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-all duration-200"
                      style={{
                        background: isSelected
                          ? spot.color
                          : isLight
                            ? 'rgba(255,255,255,0.9)'
                            : 'rgba(15,20,35,0.85)',
                        border: `2px solid ${spot.color}`,
                        boxShadow: `0 0 16px ${spot.color}55, 0 4px 12px rgba(0,0,0,0.3)`,
                        transform: isSelected ? 'scale(1.15)' : undefined,
                      }}
                    >
                      <Icon
                        size={16}
                        style={{ color: isSelected ? '#fff' : spot.color }}
                        className="transition-colors duration-200"
                      />
                    </span>
                    {/* Label on hover (desktop) */}
                    <span
                      className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      style={{
                        background: isLight ? 'rgba(30,41,59,0.9)' : 'rgba(0,0,0,0.85)',
                        color: '#fff',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {spot.name}
                    </span>
                  </button>
                </motion.div>
              );
            })}

            {/* Popup Card */}
            <AnimatePresence>
              {activeSpot && (
                <motion.div
                  key={activeSpot.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-[320px] z-30 rounded-2xl p-4 md:p-5"
                  style={{
                    background: isLight
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(12,16,30,0.7)',
                    backdropFilter: 'blur(16px) saturate(1.2)',
                    WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
                    border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isLight
                      ? '0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)'
                      : '0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveSpot(null)}
                    className="absolute top-3 right-3 p-1 rounded-lg transition-colors duration-200 cursor-pointer"
                    style={{
                      color: isLight ? '#94a3b8' : 'rgba(255,255,255,0.4)',
                      background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
                    }}
                    aria-label="Close popup"
                  >
                    <X size={14} />
                  </button>

                  {/* Content */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${activeSpot.color}18`,
                        border: `1px solid ${activeSpot.color}30`,
                      }}
                    >
                      {(() => {
                        const Icon = activeSpot.icon;
                        return <Icon size={20} style={{ color: activeSpot.color }} />;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg font-bold tracking-tight"
                        style={{ color: isLight ? '#1e293b' : '#ffffff' }}
                      >
                        {activeSpot.name}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mt-1.5"
                        style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.55)' }}
                      >
                        {activeSpot.desc}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-4 h-px"
                    style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }}
                  />

                  {/* View More button */}
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer group"
                    style={{
                      background: `${activeSpot.color}15`,
                      color: activeSpot.color,
                      border: `1px solid ${activeSpot.color}25`,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = `${activeSpot.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = `${activeSpot.color}15`;
                    }}
                  >
                    View More
                    <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '25+', label: 'Acres Campus' },
            { value: '40+', label: 'Labs & Workshops' },
            { value: '500+', label: 'Hostel Capacity' },
            { value: '7', label: 'Key Facilities' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-4 px-3 rounded-xl cursor-pointer transition-colors duration-200"
              style={{
                background: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
              }}
            >
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs md:text-sm font-medium mt-1 tracking-wide"
                style={{ color: isLight ? '#64748b' : 'rgba(255,255,255,0.45)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
