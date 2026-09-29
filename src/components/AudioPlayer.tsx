import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ambientMusic } from '../utils/audio';
import { surpriseConfig } from '../config';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Look for music.mp3 in root or public folder
    ambientMusic.initAudioFile(surpriseConfig.musicFileName);
  }, []);

  const toggleMusic = () => {
    setHasInteracted(true);
    const active = ambientMusic.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 backdrop-blur-md border ${
          isPlaying
            ? 'bg-indigo-600/30 border-indigo-400/50 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.35)]'
            : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
        }`}
        aria-label="Toggle background music"
        title={isPlaying ? 'Pause music' : 'Play background music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Music Playing</span>
            {/* Visualizer bars */}
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-3 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
            <span className="hidden sm:inline text-slate-400 group-hover:text-slate-200">Play Music</span>
            <Music className="w-3 h-3 text-slate-500 sm:hidden" />
          </>
        )}
      </button>

      {/* Subtle hint on initial load */}
      {!hasInteracted && (
        <div className="hidden md:flex items-center text-[11px] text-slate-400 bg-slate-900/50 border border-slate-800/60 rounded-full px-2.5 py-1 backdrop-blur-sm pointer-events-none animate-subtle-bob">
          <span>🎵 Optional tunes</span>
        </div>
      )}
    </div>
  );
};
