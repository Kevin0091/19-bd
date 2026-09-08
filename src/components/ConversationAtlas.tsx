import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, MapPin, Sparkles, Navigation, X, Radio } from 'lucide-react';
import { ConversationPlace, PersonalizationData } from '../types';

interface ConversationAtlasProps {
  data: PersonalizationData;
}

export const ConversationAtlas: React.FC<ConversationAtlasProps> = ({ data }) => {
  const [activePlace, setActivePlace] = useState<ConversationPlace>(data.conversationPlaces[0]);
  const [inspectedPlace, setInspectedPlace] = useState<ConversationPlace | null>(null);

  return (
    <section id="conversation-atlas-section" className="relative py-28 px-4 sm:px-8 border-t border-white/[0.05] overflow-hidden bg-[#090a0e]">
      {/* Background celestial chart grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2230_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium mb-2">
              <Compass className="w-3.5 h-3.5 text-[#c08d96]" />
              <span>Chapter 04 · Symbolic Topography</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ea] font-light tracking-tight">
              If Our Conversations Were a Place
            </h2>
            <p className="text-xs sm:text-sm text-[#8e909a] font-sans mt-2 max-w-xl">
              Every late night, inside joke, and quiet conversation left a waypoint behind. Select any territory on the chart to explore its frequency.
            </p>
          </div>

          <div className="text-xs text-[#8e909a] font-sans flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#c08d96] animate-pulse" />
            <span>5 Symbolic Coordinates Charted</span>
          </div>
        </div>

        {/* Interactive Night Map Canvas Area */}
        <div className="relative rounded-3xl bg-[#0e0f16] border border-white/[0.08] p-4 sm:p-8 min-h-[420px] sm:min-h-[500px] overflow-hidden shadow-2xl flex flex-col justify-between">
          {/* Constellation connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/10" strokeDasharray="4 6">
            {data.conversationPlaces.map((place, idx) => {
              const next = data.conversationPlaces[(idx + 1) % data.conversationPlaces.length];
              return (
                <line
                  key={`line-${place.id}`}
                  x1={`${place.x}%`}
                  y1={`${place.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  className="transition-all duration-700"
                  stroke={activePlace.id === place.id ? 'rgba(192, 141, 150, 0.4)' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={activePlace.id === place.id ? 1.5 : 1}
                />
              );
            })}
          </svg>

          {/* Place Nodes on the Map */}
          <div className="relative w-full h-[280px] sm:h-[340px] select-none">
            {data.conversationPlaces.map((place) => {
              const isSelected = activePlace.id === place.id;

              return (
                <div
                  key={place.id}
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    id={`atlas-node-${place.id}`}
                    onClick={() => {
                      setActivePlace(place);
                      setInspectedPlace(place);
                    }}
                    className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    {/* Pulsing beacon aura */}
                    <span
                      className={`absolute w-10 h-10 rounded-full transition-all duration-700 ${
                        isSelected
                          ? 'bg-[#782333]/30 scale-125 animate-ping opacity-60'
                          : 'bg-white/[0.03] scale-100 group-hover:scale-110'
                      }`}
                    />

                    {/* Central Waypoint Dot */}
                    <span
                      className={`relative w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#f5f2ea] border-[#c08d96] shadow-lg shadow-[#782333]/60 scale-125'
                          : 'bg-[#181922] border-white/30 group-hover:border-white/80'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-[#782333]' : 'bg-[#c08d96] opacity-70'
                        }`}
                      />
                    </span>

                    {/* Hover or active Label */}
                    <span
                      className={`mt-2 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-sans tracking-wide whitespace-nowrap transition-all duration-300 border backdrop-blur-md ${
                        isSelected
                          ? 'bg-[#151722] border-[#c08d96]/50 text-[#f5f2ea] shadow-md'
                          : 'bg-[#0b0c10]/80 border-white/[0.06] text-[#8e909a] group-hover:text-[#e8e6e1]'
                      }`}
                    >
                      {place.name}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Active Place Inspector Drawer */}
          <div className="relative z-20 mt-4 p-5 sm:p-6 rounded-2xl bg-[#141620]/90 border border-white/[0.08] backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-[11px] text-[#c08d96] font-sans uppercase tracking-widest mb-1.5">
                <Navigation className="w-3 h-3 text-[#c08d96]" />
                <span>{activePlace.coordinates}</span>
                <span className="text-white/20">·</span>
                <span className="text-[#8e909a] normal-case">{activePlace.atmosphere}</span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl text-[#f5f2ea] font-normal leading-snug mb-2">
                {activePlace.name}
              </h4>

              <p className="text-xs sm:text-sm text-[#b2b5c2] font-sans leading-relaxed">
                {activePlace.story.replace('[HER_NAME]', data.recipientName)}
              </p>

              {activePlace.insideJokePlaceholder && (
                <div className="mt-2.5 text-xs text-[#c08d96] font-handwriting text-lg flex items-center gap-2">
                  <span>Record:</span>
                  <span>{activePlace.insideJokePlaceholder.replace('[HER_NAME]', data.recipientName)}</span>
                </div>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => setInspectedPlace(activePlace)}
                className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-xs font-sans text-[#e8e6e1] transition-colors border border-white/10"
              >
                Inspect Memory Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Detail view */}
      <AnimatePresence>
        {inspectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectedPlace(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#14151e] border border-[#c08d96]/40 rounded-3xl p-6 sm:p-9 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setInspectedPlace(null)}
                aria-label="Close memory"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-[#a0a3ad]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-[10px] tracking-[0.3em] uppercase text-[#c08d96] font-sans font-medium mb-2">
                Memory Waypoint · {inspectedPlace.coordinates}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-3">
                {inspectedPlace.name}
              </h3>

              <div className="text-xs text-[#8e909a] font-sans pb-4 mb-4 border-b border-white/[0.06]">
                Atmosphere: <span className="text-[#c7c5be]">{inspectedPlace.atmosphere}</span>
              </div>

              <div className="text-sm sm:text-base text-[#c7c5be] font-sans leading-relaxed mb-6">
                {inspectedPlace.story.replace('[HER_NAME]', data.recipientName)}
              </div>

              {inspectedPlace.insideJokePlaceholder && (
                <div className="p-4 rounded-2xl bg-[#0d0e13] border border-[#c08d96]/30 mb-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#c08d96] mb-1.5 font-sans font-medium">
                    Our Memory Note
                  </div>
                  <p className="text-sm text-[#f5f2ea] font-sans italic">
                    "{inspectedPlace.insideJokePlaceholder.replace('[HER_NAME]', data.recipientName)}"
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
