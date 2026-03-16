import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { id: 1, src: 'https://picsum.photos/seed/campus1/800/600', alt: 'Main Campus Building', span: 'col-span-2 row-span-2' },
    { id: 2, src: 'https://picsum.photos/seed/lab1/400/300', alt: 'Robotics Laboratory', span: 'col-span-1 row-span-1' },
    { id: 3, src: 'https://picsum.photos/seed/library/400/300', alt: 'Central Library', span: 'col-span-1 row-span-1' },
    { id: 4, src: 'https://picsum.photos/seed/sports/800/300', alt: 'Sports Complex', span: 'col-span-2 row-span-1' },
    { id: 5, src: 'https://picsum.photos/seed/event/400/600', alt: 'Annual Tech Fest', span: 'col-span-1 row-span-2' },
    { id: 6, src: 'https://picsum.photos/seed/class/400/300', alt: 'Smart Classroom', span: 'col-span-1 row-span-1' },
    { id: 7, src: 'https://picsum.photos/seed/cafe/400/300', alt: 'Student Cafeteria', span: 'col-span-1 row-span-1' },
  ];

  return (
    <section className="py-24 bg-navy-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Campus <span className="text-neon">Life</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Experience the vibrant atmosphere and state-of-the-art facilities at JCET.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${img.span}`}
              onClick={() => setSelectedImage(img.src)}
              role="button"
              aria-label={`View larger image of ${img.alt}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(img.src);
                }
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                  <Maximize2 size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-navy-dark/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden z-10 shadow-2xl border border-white/10"
              role="dialog"
              aria-modal="true"
              aria-label="Image lightbox"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-3 text-white/70 hover:text-white bg-navy-dark/50 hover:bg-navy-dark/80 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neon z-20"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[90vh] bg-navy-dark"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
