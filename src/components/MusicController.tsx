import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ambientSoundtrack } from '../utils/audio';

export const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    // Check saved preference
    const saved = localStorage.getItem('birthday_ambient_audio');
    if (saved === 'true') {
      // Browsers often block autoplay without user gesture; wait for first click
      const enableOnFirstGesture = () => {
        ambientSoundtrack.play();
        setIsPlaying(true);
        window.removeEventListener('click', enableOnFirstGesture);
      };
      window.addEventListener('click', enableOnFirstGesture, { once: true });
    }
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasInteracted(true);
    const active = ambientSoundtrack.toggle();
    setIsPlaying(active);
    localStorage.setItem('birthday_ambient_audio', active ? 'true' : 'false');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        id="audio-controller-btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute background soundscape' : 'Play ambient soundscape'}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-500 backdrop-blur-md text-xs tracking-wider uppercase font-medium ${
          isPlaying
            ? 'bg-[#181920]/90 border-[#782333]/60 text-[#f2eee6] shadow-lg shadow-[#782333]/10'
            : 'bg-[#101116]/80 border-white/10 text-[#8e909a] hover:text-[#e8e6e1] hover:border-white/20'
        }`}
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          {isPlaying ? (
            <span className="flex items-end gap-[2px] h-3">
              <span className="w-[2px] bg-[#c08d96] h-full animate-[pulse_1s_ease-in-out_infinite]" />
              <span className="w-[2px] bg-[#c08d96] h-2/3 animate-[pulse_1.4s_ease-in-out_infinite]" />
              <span className="w-[2px] bg-[#c08d96] h-4/5 animate-[pulse_0.8s_ease-in-out_infinite]" />
            </span>
          ) : (
            <Music className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          )}
        </span>

        <span className="font-sans text-[11px] tracking-widest hidden sm:inline">
          {isPlaying ? 'Soundscape on' : 'Ambient sound'}
        </span>

        <span className="text-[13px] opacity-70">
          {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#c08d96]" /> : <VolumeX className="w-3.5 h-3.5" />}
        </span>
      </button>
    </div>
  );
};
