import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, X, HeartHandshake, Feather } from 'lucide-react';
import { OpenWhenLetter, PersonalizationData } from '../types';

interface OpenWhenProps {
  data: PersonalizationData;
}

export const OpenWhen: React.FC<OpenWhenProps> = ({ data }) => {
  const [activeLetter, setActiveLetter] = useState<OpenWhenLetter | null>(null);
  const [openedEnvelopes, setOpenedEnvelopes] = useState<Set<string>>(new Set());

  const handleOpenLetter = (letter: OpenWhenLetter) => {
    setOpenedEnvelopes((prev) => new Set(prev).add(letter.id));
    setActiveLetter(letter);
  };

  return (
    <section id="open-when-section" className="relative py-28 px-4 sm:px-8 border-t border-white/[0.05] max-w-6xl mx-auto">
      <div className="mb-14">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium block mb-2">
          Chapter 06 · Digital Parchment
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ea] font-light tracking-tight mb-4">
          Open When…
        </h2>
        <p className="text-xs sm:text-sm text-[#8e909a] font-sans max-w-xl">
          Five letters sealed for specific moments. Save them for when the time arrives, or peek if your curiosity wins.
        </p>
      </div>

      {/* Envelopes list / grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.openWhenLetters.map((letter) => {
          const isOpened = openedEnvelopes.has(letter.id);

          return (
            <motion.div
              key={letter.id}
              id={`envelope-${letter.id}`}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => handleOpenLetter(letter)}
              className="group relative rounded-3xl p-7 bg-[#12131b] border border-white/[0.07] hover:border-[#c08d96]/40 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-between min-h-[220px]"
            >
              <div>
                {/* Envelope Flap Header styling */}
                <div className="flex items-center justify-between mb-5">
                  <span className="p-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#c08d96] group-hover:bg-[#782333]/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>

                  <span
                    className={`text-[10px] tracking-widest uppercase font-sans px-3 py-1 rounded-full border ${
                      isOpened
                        ? 'bg-white/[0.03] text-[#8e909a] border-white/5'
                        : 'bg-[#782333]/20 text-[#c08d96] border-[#782333]/30'
                    }`}
                  >
                    {isOpened ? 'Opened' : 'Wax Sealed'}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#f5f2ea] font-light leading-snug mb-2 group-hover:text-[#f8f5ee] transition-colors">
                  {letter.trigger}
                </h3>

                <p className="text-xs text-[#8e909a] font-sans">
                  {letter.teaser}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-[#c08d96] font-sans font-medium">
                <span>Break seal & read</span>
                <span className="text-[14px] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLetter(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#14151f] border border-[#c08d96]/35 rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveLetter(null)}
                aria-label="Close letter"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-[#a0a3ad]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c08d96] font-sans font-medium mb-3">
                <Feather className="w-3.5 h-3.5 text-[#c08d96]" />
                <span>Private Dispatch · {activeLetter.sealLabel}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-6 leading-tight">
                {activeLetter.trigger}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#c7c5be] font-sans leading-relaxed mb-8">
                {activeLetter.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph.replace('[HER_NAME]', data.recipientName)}</p>
                ))}
              </div>

              {activeLetter.postscript && (
                <div className="p-4 rounded-xl bg-[#0e0f15] border border-white/[0.04] mb-6">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#c08d96]">
                    {activeLetter.postscript.replace('[HER_NAME]', data.recipientName)}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#8e909a]">
                <span>Written with care for {data.recipientName}</span>
                <button
                  onClick={() => setActiveLetter(null)}
                  className="px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/10 text-[#e8e6e1] transition-colors"
                >
                  Fold letter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
