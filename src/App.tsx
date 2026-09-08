import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { initialPersonalizationData } from './data/personalization';
import { HeroExperience } from './components/HeroExperience';
import { IntroReveal } from './components/IntroReveal';
import { MemoryTimeline } from './components/MemoryTimeline';
import { MessageCards } from './components/MessageCards';
import { PhotoMemories } from './components/PhotoMemories';
import { ConversationAtlas } from './components/ConversationAtlas';
import { DistanceSection } from './components/DistanceSection';
import { OpenWhen } from './components/OpenWhen';
import { MemoryQuiz } from './components/MemoryQuiz';
import { FinalReveal } from './components/FinalReveal';
import { NightSky } from './components/NightSky';
import { MusicController } from './components/MusicController';

export default function App() {
  const data = initialPersonalizationData;

  useEffect(() => {
    try {
      localStorage.removeItem('birthday_custom_data');
    } catch {
      // ignore
    }
  }, []);

  const [isHeroOpen, setIsHeroOpen] = useState<boolean>(false);
  const [isNightSkyOpen, setIsNightSkyOpen] = useState<boolean>(false);

  const handleOpenExperience = () => {
    setIsHeroOpen(true);
    // Smoothly scroll down a bit after animation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6e1] selection:bg-[#782333]/40 selection:text-[#f8f6f0] antialiased">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#782333]/[0.08] blur-[140px] rounded-full" />
        <div className="absolute top-[45%] right-[-10%] w-[600px] h-[600px] bg-[#3a1420]/[0.06] blur-[160px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[700px] h-[500px] bg-[#1a1728]/[0.1] blur-[150px] rounded-full" />
      </div>

      {/* Mysterious Opening Hero Curtain */}
      <HeroExperience
        data={data}
        isOpen={isHeroOpen}
        onOpen={handleOpenExperience}
      />

      {/* Floating Audio Controller */}
      <MusicController />

      {/* Main Content Sections (Progressively revealed) */}
      <main className="relative z-10">
        <IntroReveal
          data={data}
          onExplore={() => scrollToSection('memory-timeline-section')}
        />

        <MemoryTimeline data={data} />

        <MessageCards data={data} />

        <PhotoMemories data={data} />

        <ConversationAtlas data={data} />

        <DistanceSection data={data} />

        <OpenWhen data={data} />

        <MemoryQuiz data={data} />

        <FinalReveal
          data={data}
          onOpenNightSky={() => setIsNightSkyOpen(true)}
        />
      </main>

      {/* Subtle Editorial Footer */}
      <footer className="relative z-10 py-16 px-6 text-center border-t border-white/[0.04] text-xs font-sans text-[#787a86]">
        <div className="max-w-md mx-auto space-y-2">
          <p className="tracking-widest uppercase text-[11px] text-[#a0a3ad]">
            Dedicated to {data.recipientName} · September 19
          </p>
          <p className="text-[11px] text-[#636674]">
            A bespoke interactive memory capsule. Crafted with care.
          </p>
        </div>
      </footer>

      {/* Final Surprise: Night Sky Experience */}
      <AnimatePresence>
        {isNightSkyOpen && (
          <NightSky
            data={data}
            onClose={() => setIsNightSkyOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
