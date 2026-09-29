import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { surpriseConfig } from '../config';
import { ambientMusic } from '../utils/audio';

interface Props {
  onNext: () => void;
}

export const ScreenWarning: React.FC<Props> = ({ onNext }) => {
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const totalLines = surpriseConfig.warningLines.length;

  useEffect(() => {
    // Reveal lines one by one
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < totalLines + 1) {
          ambientMusic.playSoundEffect('click');
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [totalLines]);

  const handleNext = () => {
    ambientMusic.playSoundEffect('click');
    onNext();
  };

  const handleSkipAnimation = () => {
    if (visibleCount < totalLines + 1) {
      setVisibleCount(totalLines + 1);
    }
  };

  return (
    <div
      onClick={handleSkipAnimation}
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 w-full max-w-2xl mx-auto"
    >
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Top Warning Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm font-bold tracking-wider uppercase animate-pulse">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{surpriseConfig.warningHeader}</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        {/* Animated Lines Container */}
        <div className="space-y-4 sm:space-y-5 text-center min-h-[220px] flex flex-col justify-center">
          {surpriseConfig.warningLines.map((line, index) => {
            const isVisible = visibleCount > index;
            const isEmphasized = line === 'No.' || line.includes('Absolutely');

            return (
              <div
                key={index}
                className={`transition-all duration-500 transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}
              >
                <p
                  className={`font-heading ${
                    isEmphasized
                      ? line === 'No.'
                        ? 'text-2xl sm:text-3xl font-extrabold text-rose-300'
                        : 'text-2xl sm:text-3xl font-extrabold text-amber-300'
                      : 'text-lg sm:text-xl font-medium text-slate-200'
                  }`}
                >
                  {line}
                </p>
              </div>
            );
          })}

          {/* Final punchline: Because you're my friend. */}
          <div
            className={`pt-3 transition-all duration-700 transform ${
              visibleCount > totalLines
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-950/60 border border-indigo-400/30 text-indigo-200 font-heading text-lg sm:text-xl font-semibold shadow-inner">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{surpriseConfig.warningNote}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 transition-all duration-500 ${
            visibleCount >= totalLines ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-heading font-bold text-base sm:text-lg shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>{surpriseConfig.warningButtonText}</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          <span className="text-xs text-slate-400">
            {visibleCount < totalLines + 1 ? '(Click anywhere to speed up)' : 'Proceed with caution 🤝'}
          </span>
        </div>
      </div>
    </div>
  );
};
