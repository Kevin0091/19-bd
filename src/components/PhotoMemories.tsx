import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { PhotoMemory, PersonalizationData } from '../types';

interface PhotoMemoriesProps {
  data: PersonalizationData;
}

export const PhotoMemories: React.FC<PhotoMemoriesProps> = ({ data }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  return (
    <section id="photo-memories-section" className="relative py-28 px-4 sm:px-8 border-t border-white/[0.05] overflow-hidden">
      <div className="max-w-6xl mx-auto mb-16">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium block mb-2">
          Chapter 03 · Visual Artistry
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ea] font-light tracking-tight mb-4">
          The Gallery
        </h2>
        <p className="text-xs sm:text-sm text-[#8e909a] font-sans max-w-xl">
          A collection of your artworks and drawings. Click any piece to inspect the delicate details in full view.
        </p>
      </div>

      {/* Asymmetrical, overlapping editorial gallery */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-center">
          {data.photoMemories.map((item, index) => {
            // Varied responsive spans for an editorial asymmetrical collage
            const colSpanClass =
              index === 0
                ? 'lg:col-span-5'
                : index === 1
                ? 'lg:col-span-7'
                : index === 2
                ? 'lg:col-span-7'
                : index === 3
                ? 'lg:col-span-5'
                : 'lg:col-span-6 lg:mx-auto';

            return (
              <motion.div
                key={item.id}
                id={`photo-tile-${item.code}`}
                style={{ rotate: `${item.rotation}deg` }}
                whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedPhoto(item)}
                className={`relative group rounded-3xl bg-[#13141b] border border-white/[0.08] p-3.5 sm:p-4 shadow-xl transition-all cursor-pointer ${colSpanClass}`}
              >
                {/* Image Container with responsive aspect ratio */}
                <div className="relative overflow-hidden rounded-2xl bg-[#090a0d] w-full aspect-[3/4]">
                  <img
                    src={item.sampleImgUrl}
                    alt={item.caption}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 blur-0 scale-100 group-hover:scale-105"
                  />

                  {/* Asset Tag Watermark */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-sans tracking-widest text-[#e8e6e1] font-medium shadow-md">
                    {item.code}
                  </div>

                  {/* Hover Quick action */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/70 text-white backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Caption & Editorial Subtext */}
                <div className="pt-3.5 px-1.5 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#c08d96] font-sans mb-1 tracking-wider uppercase font-medium">
                    <span>Artwork {item.code}</span>
                  </div>

                  <h4 className="font-serif text-base sm:text-lg text-[#f5f2ea] font-normal leading-snug">
                    {item.caption.replace('[HER_NAME]', data.recipientName)}
                  </h4>
                  <p className="text-xs text-[#8e909a] font-sans line-clamp-2 mt-1 leading-relaxed">
                    {item.subtext.replace('[HER_NAME]', data.recipientName)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cinematic Modal Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12131b] border border-white/10 rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Side */}
              <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden p-2">
                <img
                  src={selectedPhoto.sampleImgUrl}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[75vh]"
                />
              </div>

              {/* Editorial Info Side */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#12131b]">
                <div>
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#c08d96] uppercase font-sans mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>Artwork · No. {selectedPhoto.code}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#f5f2ea] font-light mb-3 leading-snug">
                    {selectedPhoto.caption.replace('[HER_NAME]', data.recipientName)}
                  </h3>

                  <p className="text-sm text-[#b0b3bf] font-sans leading-relaxed mb-6">
                    {selectedPhoto.subtext.replace('[HER_NAME]', data.recipientName)}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-white/[0.06]">
                  <div className="p-4 rounded-2xl bg-[#0e0f15] border border-white/[0.06] text-xs text-[#c7c5be] font-sans leading-relaxed">
                    <p className="font-serif italic text-[#f5f2ea] text-sm mb-1.5">
                      "Every artist dips her brush in her own soul."
                    </p>
                    <p className="text-[11px] text-[#8e909a]">
                      A reminder of the talent, imagination, and passion you carry.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
