import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { PersonalizationData } from '../types';

interface FinalRevealProps {
  data: PersonalizationData;
  onOpenNightSky: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({ data, onOpenNightSky }) => {
  return (
    <section id="final-reveal-section" className="relative py-36 px-6 sm:px-12 md:px-20 max-w-4xl mx-auto text-center border-t border-white/[0.05]">
      {/* Calm, slow rhythmic spacing */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-[11px] uppercase tracking-[0.4em] text-[#c08d96] font-sans font-medium mb-10"
      >
        September 19 · The Quiet Truth
      </motion.div>

      {/* Main Intimate Editorial Letter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 font-serif text-xl sm:text-2xl md:text-3xl text-[#e8e5dc] font-light leading-relaxed tracking-normal max-w-2xl mx-auto"
      >
        {data.finalLetter.paragraphs.map((p, idx) => (
          <p key={idx} className="leading-relaxed">
            {p.replace('[HER_NAME]', data.recipientName)}
          </p>
        ))}
      </motion.div>

      {/* Human imperfection: Crossed out note */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-14 mb-16 max-w-lg mx-auto p-5 rounded-2xl bg-[#12131b]/80 border border-white/[0.06] text-left"
      >
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#787a86] mb-2 font-sans">
          <span>Draft Note #03</span>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-[#71737e] font-sans strikethrough-real">
            I tried writing something grand and poetic here, but everything sounded like a greeting card.
          </p>
          <p className="font-handwriting text-xl sm:text-2xl text-[#c08d96]">
            "{data.finalLetter.scratchNote.replace('[HER_NAME]', data.recipientName)}"
          </p>
        </div>
      </motion.div>

      {/* Final Birthday Greeting Stamp */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-20"
      >
        <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f2ea] font-normal tracking-tight mb-2">
          {data.finalLetter.finalWish.replace('[HER_NAME]', data.recipientName)}
        </h3>
        <p className="text-xs text-[#8e909a] font-sans tracking-widest uppercase">
          From {data.senderName} · Across the miles
        </p>
      </motion.div>

      {/* The bridge to the final surprise */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="pt-10 border-t border-white/[0.06] flex flex-col items-center justify-center"
      >
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e909a] font-sans mb-4">
          The Story Doesn’t End Here
        </span>

        <button
          id="btn-open-night-sky"
          onClick={onOpenNightSky}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#161822] hover:bg-[#202331] text-[#f5f2ea] border border-[#c08d96]/40 hover:border-[#c08d96] shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c08d96]" />
          <span className="font-sans text-xs tracking-widest uppercase font-medium">
            There’s one more thing
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#c08d96] group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};
