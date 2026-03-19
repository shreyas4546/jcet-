import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'motion/react';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

type GalleryCategory = 'All' | 'Campus' | 'Events' | 'Labs' | 'Sports';

const images = [
  { id: 1, src: 'https://picsum.photos/seed/campus1/800/600', alt: 'JCET main building front view', cat: 'Campus' as GalleryCategory },
  { id: 2, src: 'https://picsum.photos/seed/event1/800/600', alt: 'TechFest 2025 inauguration ceremony', cat: 'Events' as GalleryCategory },
  { id: 3, src: 'https://picsum.photos/seed/lab1/800/600', alt: 'Computer science lab with students', cat: 'Labs' as GalleryCategory },
  { id: 4, src: 'https://picsum.photos/seed/sport1/800/600', alt: 'Cricket match at campus grounds', cat: 'Sports' as GalleryCategory },
  { id: 5, src: 'https://picsum.photos/seed/campus2/800/600', alt: 'Library interior with reading area', cat: 'Campus' as GalleryCategory },
  { id: 6, src: 'https://picsum.photos/seed/event2/800/600', alt: 'Cultural fest dance performance', cat: 'Events' as GalleryCategory },
  { id: 7, src: 'https://picsum.photos/seed/lab2/800/600', alt: 'Robotics lab workshop session', cat: 'Labs' as GalleryCategory },
  { id: 8, src: 'https://picsum.photos/seed/campus3/800/600', alt: 'Campus aerial view', cat: 'Campus' as GalleryCategory },
  { id: 9, src: 'https://picsum.photos/seed/sport2/800/600', alt: 'Basketball tournament finals', cat: 'Sports' as GalleryCategory },
  { id: 10, src: 'https://picsum.photos/seed/event3/800/600', alt: 'Hackathon 48 winners celebration', cat: 'Events' as GalleryCategory },
  { id: 11, src: 'https://picsum.photos/seed/lab3/800/600', alt: 'Electronics lab with oscilloscope', cat: 'Labs' as GalleryCategory },
  { id: 12, src: 'https://picsum.photos/seed/campus4/800/600', alt: 'Auditorium during convocation', cat: 'Campus' as GalleryCategory },
];

const categories: GalleryCategory[] = ['All', 'Campus', 'Events', 'Labs', 'Sports'];

export default function GalleryPage() {
  const [activeCat, setActiveCat] = useState<GalleryCategory>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = activeCat === 'All' ? images : images.filter(i => i.cat === activeCat);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const navigate = (dir: 1 | -1) => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + dir + filtered.length) % filtered.length);
  };

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent-primary/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto">
              <Image size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Gallery</span>
            </motion.div>
            <motion.h1 variants={itemVariants}>
              Campus <span className="text-gradient-purple">Gallery</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg max-w-3xl mx-auto">
              A visual tour of JCET — our campus, events, labs, and student life.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCat === cat
                    ? 'bg-accent-primary text-white'
                    : 'bg-surface/60 text-text-muted hover:text-text-heading hover:bg-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="break-inside-avoid glass-card overflow-hidden glass-card-hover group"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.alt}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                <div className="overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-accent-secondary font-medium">{img.cat}</span>
                  <p className="text-sm mt-1 text-text-muted">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer" aria-label="Close">
              <X size={24} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} className="absolute left-6 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer" aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(1); }} className="absolute right-6 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer" aria-label="Next">
              <ChevronRight size={24} />
            </button>

            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
