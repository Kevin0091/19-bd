import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Clock, MessageCircle, PhoneCall, Calendar, Navigation2 } from 'lucide-react';
import { PersonalizationData } from '../types';

interface DistanceSectionProps {
  data: PersonalizationData;
}

export const DistanceSection: React.FC<DistanceSectionProps> = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = data.distanceStats;

  // Format sample time strings
  const formattedUserTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <section id="distance-section" className="relative py-28 px-4 sm:px-8 border-t border-white/[0.05] max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium block mb-3">
          Chapter 05 · Geography & Habit
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ea] font-light tracking-tight mb-4">
          A little weird when you think about it.
        </h2>
        <p className="text-sm sm:text-base text-[#9b9da8] font-sans leading-relaxed">
          Different skies, separate time zones, completely different morning routines. And somehow, you quietly became one of the easiest parts of my day.
        </p>
      </div>

      {/* Minimalist Globe / Arc Visual */}
      <div className="relative rounded-3xl bg-[#11131a] border border-white/[0.08] p-6 sm:p-12 mb-12 overflow-hidden shadow-2xl">
        {/* Background glow arc */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_120%,rgba(120,35,51,0.15),transparent)]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* User Node */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8e909a] font-sans mb-1">
              {data.senderName}’s Coordinates
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-2">
              {stats.userCity}
            </h4>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-[#a0a3ad] font-sans">
              <Clock className="w-3 h-3 text-[#c08d96]" />
              <span>Current Local: {formattedUserTime}</span>
            </div>
          </div>

          {/* Curved Celestial Vector Arc */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center my-4 md:my-0">
            <div className="relative w-full flex items-center justify-center">
              <svg className="w-full h-20 overflow-visible" viewBox="0 0 300 80">
                <defs>
                  <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#782333" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#c08d96" stopOpacity="1" />
                    <stop offset="100%" stopColor="#782333" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {/* Arc path */}
                <path
                  d="M 10,65 Q 150,-20 290,65"
                  fill="none"
                  stroke="url(#arcGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Pulsing signal dot moving along line */}
                <circle cx="150" cy="22" r="4" fill="#f5f2ea" className="animate-pulse">
                  <animate
                    attributeName="cx"
                    values="20;150;280;150;20"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="60;22;60;22;60"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>

            <div className="mt-1 px-3.5 py-1 rounded-full bg-[#181924] border border-[#c08d96]/30 text-[11px] font-sans text-[#c08d96] flex items-center gap-1.5 shadow-sm">
              <Navigation2 className="w-3 h-3 rotate-45" />
              <span>
                {stats.distanceMiles.toLowerCase().includes('km') || stats.distanceMiles.toLowerCase().includes('mile')
                  ? `${stats.distanceMiles} apart`
                  : `${stats.distanceMiles} miles apart`}{' '}
                · {stats.timeDifference}
              </span>
            </div>
          </div>

          {/* Her Node */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8e909a] font-sans mb-1">
              {data.recipientName}’s Coordinates
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-2">
              {stats.herCity}
            </h4>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-[#a0a3ad] font-sans">
              <Clock className="w-3 h-3 text-[#c08d96]" />
              <span>{data.recipientName}’s Window: {stats.timeDifference}</span>
            </div>
          </div>
        </div>

        {/* Quiet footnote quote */}
        <div className="mt-10 pt-8 border-t border-white/[0.06] text-center">
          <p className="font-handwriting text-2xl text-[#c08d96]">
            "Physical distance is just geography waiting on a plane ticket."
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/[0.06]">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#787a86] font-sans mb-2">
            <Calendar className="w-3 h-3 text-[#c08d96]" />
            <span>Days in orbit</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-1">
            {stats.daysTalking}
          </div>
          <div className="text-[11px] text-[#8e909a] font-sans">
            Since first conversation on {stats.firstMetDate}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/[0.06]">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#787a86] font-sans mb-2">
            <MessageCircle className="w-3 h-3 text-[#c08d96]" />
            <span>Exchanged Words</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-1">
            {stats.estimatedMessages}
          </div>
          <div className="text-[11px] text-[#8e909a] font-sans">
            Messages, voice notes, and memes
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/[0.06]">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#787a86] font-sans mb-2">
            <PhoneCall className="w-3 h-3 text-[#c08d96]" />
            <span>Call hours logged</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl text-[#f5f2ea] font-light mb-1">
            {stats.callHoursCount.toLowerCase().includes('hour') || stats.callHoursCount.toLowerCase().includes('hr')
              ? stats.callHoursCount
              : `${stats.callHoursCount} hrs`}
          </div>
          <div className="text-[11px] text-[#8e909a] font-sans">
            Late nights, work calls & sleep drifts
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/[0.06]">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#787a86] font-sans mb-2">
            <Globe className="w-3 h-3 text-[#c08d96]" />
            <span>Connection Strength</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl text-[#c08d96] font-light mb-1">
            100%
          </div>
          <div className="text-[11px] text-[#8e909a] font-sans">
            Zero dropped packets on care
          </div>
        </div>
      </div>
    </section>
  );
};
