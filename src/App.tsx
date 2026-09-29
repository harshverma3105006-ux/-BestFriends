import React, { useState } from 'react';
import { BackgroundStars } from './components/BackgroundStars';
import { AudioPlayer } from './components/AudioPlayer';
import { ScreenMysteryIntro } from './components/ScreenMysteryIntro';
import { ScreenWarning } from './components/ScreenWarning';
import { ScreenFriendshipCards } from './components/ScreenFriendshipCards';
import { ScreenQuiz } from './components/ScreenQuiz';
import { ScreenSecretReveal } from './components/ScreenSecretReveal';
import { DeployModal } from './components/DeployModal';
import { surpriseConfig } from './config';
import { Sparkles, Globe } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const nextScreen = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restartExperience = () => {
    setCurrentScreen(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const screenNames = [
    'Mystery Intro',
    'Important Notice',
    'Classified Cards',
    'Chaos Quiz',
    'Secret Reveal',
  ];

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Dynamic Starfield & Glowing Radial Atmosphere */}
      <BackgroundStars />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Top Subtle Status Bar / Progress Indicator */}
      <header className="relative z-40 w-full px-4 pt-4 sm:pt-6 max-w-5xl mx-auto flex items-center justify-between">
        <div
          onClick={restartExperience}
          className="flex items-center gap-2 cursor-pointer group"
          title="Restart surprise"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-amber-300 shadow group-hover:border-amber-400/40 transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-heading font-bold text-slate-300 group-hover:text-white transition-colors block">
              For {surpriseConfig.friendName}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Strictly Friendship Edition
            </span>
          </div>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
          {[1, 2, 3, 4, 5].map((step) => (
            <button
              key={step}
              onClick={() => setCurrentScreen(step)}
              className="flex items-center gap-1 text-[11px] font-mono transition-all duration-300 cursor-pointer"
              title={`Jump to ${screenNames[step - 1]}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentScreen === step
                    ? 'w-5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                    : currentScreen > step
                    ? 'bg-emerald-400'
                    : 'bg-slate-700'
                }`}
              />
            </button>
          ))}
          <span className="text-[11px] font-mono text-slate-400 ml-1.5 hidden md:inline">
            Step {currentScreen}/5
          </span>
        </div>

        {/* Deploy & Public Link Button */}
        <button
          onClick={() => setIsDeployModalOpen(true)}
          className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer"
          title="View public URL and GitHub Pages deployment guide"
        >
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden md:inline">Share / Public Link</span>
        </button>
      </header>

      {/* Main Interactive Screen Canvas */}
      <main className="relative z-10 flex-1 flex flex-col justify-center w-full px-2 sm:px-4 py-4 sm:py-8 max-w-5xl mx-auto">
        {currentScreen === 1 && <ScreenMysteryIntro onNext={nextScreen} />}
        {currentScreen === 2 && <ScreenWarning onNext={nextScreen} />}
        {currentScreen === 3 && <ScreenFriendshipCards onNext={nextScreen} />}
        {currentScreen === 4 && <ScreenQuiz onNext={nextScreen} />}
        {currentScreen === 5 && (
          <ScreenSecretReveal
            onRestart={restartExperience}
            onOpenDeployGuide={() => setIsDeployModalOpen(true)}
          />
        )}
      </main>

      {/* Footer Signature */}
      <footer className="relative z-10 w-full text-center py-4 px-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>Made with laughs for {surpriseConfig.friendFullName}</span>
        <span className="hidden sm:inline">•</span>
        <button
          onClick={() => setIsDeployModalOpen(true)}
          className="underline hover:text-slate-300 cursor-pointer"
        >
          How to get free GitHub Pages link
        </button>
      </footer>

      {/* Deployment & Share Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </div>
  );
}
