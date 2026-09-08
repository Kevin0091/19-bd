import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Star, Compass, ArrowLeft, Heart } from 'lucide-react';
import { CelestialStar, PersonalizationData } from '../types';

interface NightSkyProps {
  data: PersonalizationData;
  onClose: () => void;
}

export const NightSky: React.FC<NightSkyProps> = ({ data, onClose }) => {
  const [selectedStar, setSelectedStar] = useState<CelestialStar | null>(null);
  const [foundSpecialStar, setFoundSpecialStar] = useState<boolean>(false);
  const [twinkles, setTwinkles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  // Generate background starry field on mount
  useEffect(() => {
    const stars = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      delay: Math.random() * 4,
    }));
    setTwinkles(stars);
  }, []);

  const handleSelectStar = (star: CelestialStar) => {
    setSelectedStar(star);
    if (star.isSpecialBirthdayStar) {
      setFoundSpecialStar(true);
    }
  };

  return (
    <motion.div
      id="night-sky-experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#050608] text-[#f5f2ea] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Star Canvas effect */}
      <div className="absolute inset-0 pointer-events-none">
        {twinkles.map((t, i) => (
          <span
            key={i}
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              width: `${t.size}px`,
              height: `${t.size}px`,
              animationDelay: `${t.delay}s`,
            }}
            className="absolute rounded-full bg-white opacity-40 animate-[pulse_3s_ease-in-out_infinite]"
          />
        ))}
      </div>

      {/* Constellation lines between designated memory stars */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/10" strokeDasharray="3 4">
        {data.nightSkyStars.map((star, idx) => {
          const next = data.nightSkyStars[(idx + 1) % data.nightSkyStars.length];
          return (
            <line
              key={`constellation-${star.id}`}
              x1={`${star.x}%`}
              y1={`${star.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Top Bar Header */}
      <div className="relative z-20 p-6 sm:p-8 flex items-center justify-between">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-xs font-sans text-[#a0a3ad] hover:text-[#f5f2ea] transition-colors border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to capsule</span>
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium block">
            Celestial Vault
          </span>
          <span className="font-serif text-sm sm:text-base text-[#f5f2ea] font-light">
            Locate Star 19.09
          </span>
        </div>

        <div className="text-xs text-[#8e909a] font-sans">
          {foundSpecialStar ? (
            <span className="text-[#c08d96] flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#c08d96]" />
              <span className="hidden sm:inline">Star 19.09 Unveiled</span>
            </span>
          ) : (
            <span className="hidden sm:inline">Hover & tap the stars</span>
          )}
        </div>
      </div>

      {/* Main Interactive Sky Zone */}
      <div className="relative flex-1 w-full h-full">
        {data.nightSkyStars.map((star) => {
          const isSpecial = star.isSpecialBirthdayStar;
          const isCurrent = selectedStar?.id === star.id;

          return (
            <div
              key={star.id}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                id={`star-${star.id}`}
                onClick={() => handleSelectStar(star)}
                className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              >
                {/* Outer Glow Halo */}
                <span
                  className={`absolute rounded-full transition-all duration-700 ${
                    isSpecial
                      ? 'w-14 h-14 bg-[#c08d96]/30 animate-ping opacity-75'
                      : 'w-8 h-8 bg-white/[0.04] group-hover:scale-150'
                  }`}
                />

                {/* Central Star Core */}
                <span
                  className={`relative rounded-full flex items-center justify-center transition-all duration-500 ${
                    isSpecial
                      ? 'w-6 h-6 bg-[#f5f2ea] shadow-[0_0_24px_rgba(245,242,234,0.9)] ring-4 ring-[#782333]/50 scale-125'
                      : 'w-3 h-3 bg-white/80 group-hover:bg-[#f5f2ea] group-hover:scale-125'
                  }`}
                >
                  {isSpecial && <Star className="w-3.5 h-3.5 text-[#782333] fill-[#782333]" />}
                </span>

                {/* Star Label / Badge */}
                <span
                  className={`mt-2.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-sans tracking-widest whitespace-nowrap transition-all duration-300 border backdrop-blur-md ${
                    isSpecial
                      ? 'bg-[#782333]/80 border-[#c08d96] text-[#f5f2ea] font-medium shadow-lg'
                      : 'bg-black/60 border-white/10 text-[#8e909a] group-hover:text-white'
                  }`}
                >
                  {star.dateOrCode}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint Banner */}
      <div className="relative z-20 pb-8 text-center text-xs text-[#787a86] font-sans">
        <span>Click the golden beacon at the center (19.09) for the final birthday benediction.</span>
      </div>

      {/* Modal Star Lightbox for Messages / Final Birthday Wish */}
      <AnimatePresence>
        {selectedStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStar(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`border rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl relative ${
                selectedStar.isSpecialBirthdayStar
                  ? 'bg-[#141219] border-[#c08d96]/60 shadow-[#782333]/30'
                  : 'bg-[#101117] border-white/10'
              }`}
            >
              <button
                onClick={() => setSelectedStar(null)}
                aria-label="Close star"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-[#a0a3ad]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#c08d96] uppercase font-sans font-medium mb-3">
                <Star className="w-3.5 h-3.5 fill-[#c08d96]" />
                <span>{selectedStar.name} · Coordinates {selectedStar.dateOrCode}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-5 leading-tight">
                {selectedStar.isSpecialBirthdayStar
                  ? `For Your 19th of September`
                  : selectedStar.name}
              </h3>

              <div className="text-sm sm:text-base text-[#c7c5be] font-sans leading-relaxed mb-8">
                <p>{selectedStar.message.replace('[HER_NAME]', data.recipientName)}</p>
              </div>

              {selectedStar.isSpecialBirthdayStar && (
                <div className="p-4 rounded-2xl bg-[#782333]/20 border border-[#782333]/40 mb-6 text-center">
                  <span className="font-serif text-lg text-[#f5f2ea] block mb-1">
                    Happy Birthday, {data.recipientName}.
                  </span>
                  <span className="text-xs text-[#c08d96] font-sans">
                    Every distance is small against someone who truly matters.
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-[#8e909a]">
                <span>{data.birthdayDateFormatted}</span>
                <button
                  onClick={() => setSelectedStar(null)}
                  className="px-5 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-[#e8e6e1] transition-colors"
                >
                  Close star
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
