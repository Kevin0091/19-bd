import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, Sparkles, ChevronRight, Lock, Eye, EyeOff } from 'lucide-react';
import { SpecificMessage, PersonalizationData } from '../types';

interface MessageCardsProps {
  data: PersonalizationData;
}

export const MessageCards: React.FC<MessageCardsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'unsaid'>('details');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set([data.thingsILikeMessages[0]?.id || '']));
  const [activeModalMessage, setActiveModalMessage] = useState<SpecificMessage | null>(null);

  const toggleReveal = (id: string, message: SpecificMessage) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setActiveModalMessage(message);
  };

  const currentList = activeTab === 'details' ? data.thingsILikeMessages : data.unsaidMessages;
  const revealedCount = currentList.filter((m) => revealedIds.has(m.id)).length;

  return (
    <section id="message-cards-section" className="relative py-28 px-4 sm:px-8 border-t border-white/[0.05] max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium block mb-2">
            Chapter 02 · Unfiltered Thoughts
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ea] font-light tracking-tight">
            Small Things, Observed
          </h2>
          <p className="text-xs sm:text-sm text-[#8e909a] font-sans mt-2">
            Click to unseal each card. Some thoughts were kept for this exact day.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-[#121319] border border-white/[0.06] rounded-full self-start md:self-auto">
          <button
            id="tab-things-i-like"
            onClick={() => setActiveTab('details')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'details'
                ? 'bg-[#782333] text-[#f5f2ea] shadow-md shadow-[#782333]/20 font-medium'
                : 'text-[#8e909a] hover:text-[#e8e6e1]'
            }`}
          >
            Things I like about you ({data.thingsILikeMessages.length})
          </button>
          <button
            id="tab-things-unsaid"
            onClick={() => setActiveTab('unsaid')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'unsaid'
                ? 'bg-[#782333] text-[#f5f2ea] shadow-md shadow-[#782333]/20 font-medium'
                : 'text-[#8e909a] hover:text-[#e8e6e1]'
            }`}
          >
            Things I never said ({data.unsaidMessages.length})
          </button>
        </div>
      </div>

      {/* Progress pill indicator */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.04] text-xs text-[#8e909a] font-sans">
        <span>
          Revealed: <strong className="text-[#f5f2ea]">{revealedCount}</strong> of {currentList.length}
        </span>
        <button
          onClick={() => {
            const allIds = new Set(revealedIds);
            currentList.forEach((m) => allIds.add(m.id));
            setRevealedIds(allIds);
          }}
          className="text-[#c08d96] hover:underline cursor-pointer"
        >
          Reveal all cards
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {currentList.map((message, index) => {
          const isRevealed = revealedIds.has(message.id);

          return (
            <motion.div
              key={message.id}
              layout
              id={`message-card-${message.id}`}
              onClick={() => toggleReveal(message.id, message)}
              whileHover={{ y: -3 }}
              className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-500 cursor-pointer border flex flex-col justify-between min-h-[220px] ${
                isRevealed
                  ? 'bg-[#151620]/90 border-[#c08d96]/30 shadow-lg'
                  : 'bg-[#101117] border-white/[0.05] hover:border-white/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.2em] font-sans text-[#7a7c88] uppercase">
                    Slot #{String(index + 1).padStart(2, '0')}
                  </span>
                  {isRevealed ? (
                    <span className="flex items-center gap-1 text-[10px] text-[#c08d96] bg-[#782333]/15 px-2 py-0.5 rounded-full border border-[#782333]/20">
                      <Check className="w-2.5 h-2.5" /> Unsealed
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#636674] flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Tap to open
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#f5f2ea] font-normal leading-snug mb-3">
                  {message.teaser.replace('[HER_NAME]', data.recipientName)}
                </h4>

                {isRevealed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-[#a0a3ad] font-sans line-clamp-3 leading-relaxed"
                  >
                    {message.fullMessage.replace('[HER_NAME]', data.recipientName)}
                  </motion.p>
                )}
              </div>

              <div className="pt-4 mt-auto border-t border-white/[0.04] flex items-center justify-between text-[11px]">
                <span className="text-[#7c7f8c] font-sans group-hover:text-[#c08d96] transition-colors">
                  {isRevealed ? 'Read full card' : 'Click to read'}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#7c7f8c] group-hover:translate-x-1 group-hover:text-[#c08d96] transition-all" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal / Card reader */}
      <AnimatePresence>
        {activeModalMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalMessage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#14151e] border border-[#c08d96]/35 rounded-3xl p-6 sm:p-9 max-w-lg w-full shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#c08d96] font-sans font-medium">
                  {activeTab === 'details' ? 'Specific Detail' : 'Unsaid Letter'}
                </span>
                <button
                  onClick={() => setActiveModalMessage(null)}
                  className="text-xs uppercase tracking-wider text-[#8e909a] hover:text-[#f5f2ea] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-5 leading-tight">
                {activeModalMessage.teaser.replace('[HER_NAME]', data.recipientName)}
              </h3>

              <div className="text-sm sm:text-base text-[#c7c5be] font-sans leading-relaxed space-y-4 mb-8">
                <p>{activeModalMessage.fullMessage.replace('[HER_NAME]', data.recipientName)}</p>
              </div>

              {activeModalMessage.handwrittenNote && (
                <div className="p-4 rounded-xl bg-[#0e0f14] border border-white/[0.04] mb-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#787a86] mb-1 font-sans">
                    Marginal Note
                  </div>
                  <p className="font-handwriting text-xl sm:text-2xl text-[#c08d96]">
                    "{activeModalMessage.handwrittenNote.replace('[HER_NAME]', data.recipientName)}"
                  </p>
                </div>
              )}

              <div className="text-right">
                <button
                  onClick={() => setActiveModalMessage(null)}
                  className="px-5 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-xs font-sans text-[#e8e6e1] transition-colors"
                >
                  Finished reading
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
