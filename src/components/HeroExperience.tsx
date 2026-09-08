import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { PersonalizationData } from '../types';

interface HeroExperienceProps {
  data: PersonalizationData;
  onOpen: () => void;
  isOpen: boolean;
}

export const HeroExperience: React.FC<HeroExperienceProps> = ({ data, onOpen, isOpen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          id="hero-cinematic-opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#090a0d] px-6 text-center select-none overflow-hidden"
        >
          {/* Subtle celestial ambient background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,35,51,0.18),rgba(9,10,13,0.95))]" />

          {/* Minimalist fine border line frame */}
          <div className="absolute inset-8 sm:inset-12 md:inset-16 border border-white/[0.04] pointer-events-none rounded-2xl" />

          {/* Discreet date marker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-12 sm:top-16 text-[11px] uppercase tracking-[0.35em] text-[#8e909a] font-sans"
          >
            {data.birthdayCode} · A PRIVATE DIGITAL CAPSULE
          </motion.div>

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#b3858c] font-sans font-medium mb-6"
            >
              {data.openingMessages.curiosityLine}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 1.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ea] font-light leading-snug sm:leading-tight mb-10 tracking-tight"
            >
              {data.openingMessages.intimateLine}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              className="relative"
            >
              <button
                id="btn-open-experience"
                onClick={onOpen}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#15171e] text-[#f2eee6] border border-white/10 hover:border-[#c08d96]/50 shadow-2xl transition-all duration-700 hover:shadow-[#782333]/20 hover:scale-[1.02] cursor-pointer"
              >
                {/* Soft pulse glow */}
                <span className="absolute inset-0 rounded-full bg-[#782333]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <span className="relative font-sans text-xs tracking-[0.25em] uppercase font-medium">
                  {data.openingMessages.buttonLabel}
                </span>

                <motion.span
                  animate={{ x: hovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative text-[#c08d96]"
                >
                  <ArrowDown className="w-3.5 h-3.5 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-500" />
                </motion.span>
              </button>
            </motion.div>
          </div>

          {/* Quiet footer attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.5, delay: 2.2 }}
            className="absolute bottom-12 text-[11px] text-[#60636d] tracking-widest font-sans"
          >
            Crafted for <span className="text-[#a0a3ad]">{data.recipientName}</span>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
