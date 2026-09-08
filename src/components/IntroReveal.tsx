import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Compass } from 'lucide-react';
import { PersonalizationData } from '../types';

interface IntroRevealProps {
  data: PersonalizationData;
  onExplore: () => void;
}

export const IntroReveal: React.FC<IntroRevealProps> = ({ data, onExplore }) => {
  return (
    <section id="intro-reveal-section" className="relative min-h-[90vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 max-w-5xl mx-auto">
      {/* Decorative subtle hairline element */}
      <div className="flex items-center gap-4 mb-8">
        <span className="h-[1px] w-8 bg-[#c08d96]/40" />
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium">
          {data.birthdayDateFormatted}
        </span>
        <span className="h-[1px] w-8 bg-[#c08d96]/40" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#f5f2ea] font-light tracking-tight leading-[1.15] mb-12 max-w-3xl"
      >
        {data.introLetter.headline}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="md:col-span-8 space-y-6 text-[#a7a9b4] text-base sm:text-lg leading-relaxed font-sans font-light"
        >
          {data.introLetter.body.map((paragraph, index) => (
            <p key={index} className="text-[#c7c5be] leading-relaxed">
              {paragraph.replace('[HER_NAME]', data.recipientName)}
            </p>
          ))}

          <div className="pt-4 flex items-center gap-3">
            <span className="font-handwriting text-2xl sm:text-3xl text-[#c08d96]">
              {data.introLetter.closingLine.replace('[HER_NAME]', data.recipientName)}
            </span>
          </div>
        </motion.div>

        {/* Editorial side card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="md:col-span-4 p-6 rounded-2xl bg-[#13141a]/60 border border-white/[0.06] backdrop-blur-sm"
        >
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#8e909a] font-sans mb-3">
            Navigation Note
          </div>
          <p className="text-xs text-[#9d9fa8] leading-relaxed font-sans mb-5">
            This isn’t a one-page scroll to rush through. It’s an archival box of conversations, coordinates, and unsaid things. Explore at your own pace.
          </p>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#8e909a]">
            <span>Dedicated to:</span>
            <span className="text-[#f5f2ea] font-medium">{data.recipientName}</span>
          </div>
        </motion.div>
      </div>

      {/* Downward hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#8e909a] font-sans cursor-pointer hover:text-[#e8e6e1] transition-colors"
        onClick={onExplore}
      >
        <Compass className="w-3.5 h-3.5 text-[#c08d96]" />
        <span>Begin the journey</span>
      </motion.div>
    </section>
  );
};
