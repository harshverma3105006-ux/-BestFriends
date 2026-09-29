import React, { useState } from 'react';
import { MessageSquare, Sparkles, Zap, Lock, Unlock, CheckCircle, ArrowRight } from 'lucide-react';
import { surpriseConfig } from '../config';
import { ambientMusic } from '../utils/audio';

interface Props {
  onNext: () => void;
}

export const ScreenFriendshipCards: React.FC<Props> = ({ onNext }) => {
  const [unlockedCards, setUnlockedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    ambientMusic.playSoundEffect('sparkle');
    setUnlockedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const unlockedCount = Object.values(unlockedCards).filter(Boolean).length;
  const totalCards = surpriseConfig.cards.length;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'message-circle':
        return <MessageSquare className="w-6 h-6 text-amber-300" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-indigo-300" />;
      case 'zap':
        return <Zap className="w-6 h-6 text-emerald-300" />;
      case 'key':
      default:
        return <Lock className="w-6 h-6 text-violet-300" />;
    }
  };

  const handleNext = () => {
    ambientMusic.playSoundEffect('click');
    onNext();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Friendship Archives</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
          A Few Facts About Us 😂
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Click each card below to inspect the classified records ({unlockedCount}/{totalCards} unlocked)
        </p>
      </div>

      {/* 4 Glassmorphism Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full mb-8">
        {surpriseConfig.cards.map((card) => {
          const isRevealed = !!unlockedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`glass-card p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group select-none ${
                isRevealed
                  ? 'border-indigo-400/50 bg-gradient-to-br from-slate-900/90 via-indigo-950/40 to-slate-900/90 shadow-[0_10px_30px_rgba(99,102,241,0.2)]'
                  : 'hover:border-slate-500/60'
              }`}
            >
              {/* Subtle accent corner glow */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl transition-opacity duration-300 ${
                  isRevealed ? 'bg-indigo-500/25 opacity-100' : 'bg-amber-500/10 opacity-40 group-hover:opacity-80'
                }`}
              />

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shadow-md">
                  {getIcon(card.icon)}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-300">
                  {isRevealed ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Unlocked</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-amber-400/80" />
                      <span className="text-amber-300/80">Tap to reveal</span>
                    </>
                  )}
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold text-slate-100 mb-2 group-hover:text-amber-300 transition-colors">
                {card.title}
              </h3>

              <div className="min-h-[56px] flex items-center">
                {isRevealed ? (
                  <p className="text-indigo-200 text-sm sm:text-base leading-relaxed animate-in fade-in duration-300 font-medium">
                    "{card.revealedText}"
                  </p>
                ) : (
                  <p className="text-slate-400 text-sm italic">
                    Tap to decode this completely scientific statement...
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress & Continue */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between w-full max-w-2xl px-2">
        <div className="text-xs sm:text-sm text-slate-400">
          {unlockedCount === totalCards ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> All cards unlocked! Ready for the quiz.
            </span>
          ) : (
            <span>Tip: You can tap any card to flip it back and forth</span>
          )}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-heading font-bold text-sm sm:text-base shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto justify-center"
        >
          <span>Continue to Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
