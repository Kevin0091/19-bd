import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageSquare, Clock, MapPin, Sparkles, X } from 'lucide-react';
import { TimelineMoment, PersonalizationData } from '../types';

interface MemoryTimelineProps {
  data: PersonalizationData;
}

export const MemoryTimeline: React.FC<MemoryTimelineProps> = ({ data }) => {
  const [activeMomentId, setActiveMomentId] = useState<string>(data.timelineMoments[0]?.id || '');
  const [selectedMoment, setSelectedMoment] = useState<TimelineMoment | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeIndex = data.timelineMoments.findIndex((m) => m.id === activeMomentId);

  const handleScrollTo = (index: number) => {
    const target = data.timelineMoments[index];
    if (target) {
      setActiveMomentId(target.id);
      const el = document.getElementById(`timeline-card-${target.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <section id="memory-timeline-section" className="relative py-28 px-4 sm:px-8 border-t border-white/[0.05] overflow-hidden">
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium block mb-2">
              Chapter 01 · Trajectory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ea] font-light tracking-tight">
              Our Timeline
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xs text-[#8e909a] font-sans hidden sm:block mr-2">
              Moment {activeIndex + 1} of {data.timelineMoments.length}
            </p>
            <button
              id="timeline-prev-btn"
              onClick={() => handleScrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous timeline moment"
              className="p-2.5 rounded-full border border-white/10 bg-[#13141b] text-[#e8e6e1] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#c08d96]/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="timeline-next-btn"
              onClick={() => handleScrollTo(Math.min(data.timelineMoments.length - 1, activeIndex + 1))}
              disabled={activeIndex === data.timelineMoments.length - 1}
              aria-label="Next timeline moment"
              className="p-2.5 rounded-full border border-white/10 bg-[#13141b] text-[#e8e6e1] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#c08d96]/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress track bar */}
        <div className="relative h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden mb-10">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#782333] to-[#c08d96]"
            animate={{
              width: `${((activeIndex + 1) / data.timelineMoments.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Horizontal smooth scrolling timeline cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 px-4 md:px-8 max-w-7xl mx-auto scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {data.timelineMoments.map((moment, index) => {
          const isActive = moment.id === activeMomentId;
          return (
            <motion.div
              key={moment.id}
              id={`timeline-card-${moment.id}`}
              onClick={() => {
                setActiveMomentId(moment.id);
                setSelectedMoment(moment);
              }}
              whileHover={{ y: -4 }}
              className={`snap-center shrink-0 w-[285px] sm:w-[340px] md:w-[380px] rounded-2xl p-6 sm:p-7 transition-all duration-500 cursor-pointer border flex flex-col justify-between ${
                isActive
                  ? 'bg-[#151720] border-[#c08d96]/40 shadow-xl shadow-[#782333]/5'
                  : 'bg-[#111218]/80 border-white/[0.06] hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#c08d96] font-medium">
                    {moment.tag}
                  </span>
                  <span className="text-[11px] font-sans text-[#7c7f8c] bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.04]">
                    {moment.date.replace('[HER_NAME]', data.recipientName)}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#f5f2ea] font-normal leading-snug mb-3">
                  {moment.title.replace('[HER_NAME]', data.recipientName)}
                </h3>

                <p className="text-xs sm:text-sm text-[#9b9da8] leading-relaxed font-sans mb-6 line-clamp-3">
                  {moment.previewNote.replace('[HER_NAME]', data.recipientName)}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px]">
                  <span className="text-[#8e909a] flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>Click to expand story</span>
                  </span>
                  <span className="text-[#c08d96] underline underline-offset-4 font-medium">Read memo</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Moment Lightbox Modal */}
      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMoment(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#14161f] border border-[#c08d96]/30 rounded-3xl p-6 sm:p-9 max-w-xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedMoment(null)}
                aria-label="Close story"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-[#a0a3ad] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-[10px] tracking-[0.3em] uppercase text-[#c08d96] font-sans font-medium mb-2">
                {selectedMoment.tag}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-3">
                {selectedMoment.title.replace('[HER_NAME]', data.recipientName)}
              </h3>

              <div className="flex items-center gap-4 text-xs text-[#8e909a] font-sans mb-6 pb-4 border-b border-white/[0.06]">
                <span>{selectedMoment.date}</span>
                {selectedMoment.locationOrContext && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#c08d96]" />
                    <span>{selectedMoment.locationOrContext}</span>
                  </span>
                )}
              </div>

              <div className="text-sm sm:text-base text-[#c7c5be] leading-relaxed font-sans mb-6 space-y-4">
                <p>{selectedMoment.expandedStory.replace('[HER_NAME]', data.recipientName)}</p>
              </div>

              {/* Chat snippet preview if present */}
              {selectedMoment.chatSnippet && (
                <div className="bg-[#0b0c10] border border-white/[0.06] rounded-2xl p-4 sm:p-5 mb-2 space-y-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#787a86]">
                    <span>Exchange Record</span>
                    <span>{selectedMoment.chatSnippet.time}</span>
                  </div>

                  <div className="space-y-3 font-sans text-xs sm:text-sm">
                    <div className="flex flex-col items-start max-w-[85%]">
                      <span className="text-[10px] text-[#8e909a] mb-1">{selectedMoment.chatSnippet.speakerA}</span>
                      <div className="flex flex-col items-start gap-1.5 w-full">
                        {selectedMoment.chatSnippet.textA.split('\n').map((msgLine, lIdx) => (
                          <div key={lIdx} className="bg-[#1c1d26] text-[#e8e6e1] px-3.5 py-2 rounded-2xl rounded-tl-sm border border-white/[0.04]">
                            {msgLine.replace('[HER_NAME]', data.recipientName)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end max-w-[85%] ml-auto">
                      <span className="text-[10px] text-[#8e909a] mb-1">{selectedMoment.chatSnippet.speakerB}</span>
                      <div className="flex flex-col items-end gap-1.5 w-full">
                        {selectedMoment.chatSnippet.textB.split('\n').map((msgLine, lIdx) => (
                          <div key={lIdx} className="bg-[#4e1420]/80 text-[#f5f2ea] px-3.5 py-2 rounded-2xl rounded-tr-sm border border-[#782333]/40">
                            {msgLine.replace('[HER_NAME]', data.recipientName)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
