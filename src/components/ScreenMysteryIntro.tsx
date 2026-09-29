import React from 'react';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { surpriseConfig } from '../config';
import { ambientMusic } from '../utils/audio';

interface Props {
  onNext: () => void;
}

export const ScreenMysteryIntro: React.FC<Props> = ({ onNext }) => {
  const handleClick = () => {
    ambientMusic.playSoundEffect('click');
    onNext();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 z-10">
      {/* Decorative top pill badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-lg shadow-black/30 backdrop-blur-md animate-subtle-bob">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Confidential Digital Delivery</span>
        <Eye className="w-3.5 h-3.5 text-amber-400" />
      </div>

      {/* Main Attention Catching Heading */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
          {surpriseConfig.introTitle.split('Disha Verma')[0]}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200">
            {surpriseConfig.friendFullName}
          </span>
          {' ' + (surpriseConfig.introTitle.split('Disha Verma')[1] || '👀')}
        </h1>

        <p className="text-slate-300 text-lg sm:text-2xl font-medium tracking-wide max-w-xl mx-auto leading-relaxed pt-2">
          {surpriseConfig.introSubtitle}
        </p>
      </div>

      {/* Interactive Trigger Button */}
      <div className="mt-12 group relative">
        {/* Glow halo behind button */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-glow" />

        <button
          onClick={handleClick}
          className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-heading font-bold text-lg sm:text-xl border border-amber-300/40 shadow-2xl transition-all duration-300 transform group-hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
          <span>{surpriseConfig.introButtonText}</span>
          <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>

      {/* Teaser note */}
      <p className="mt-8 text-xs text-slate-500 font-mono tracking-widest uppercase">
        Tap the button • 100% Unnecessary • 100% Wholesome
      </p>
    </div>
  );
};
