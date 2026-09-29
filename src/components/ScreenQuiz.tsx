import React, { useState } from 'react';
import { Award, ArrowRight, Check, Sparkles } from 'lucide-react';
import { surpriseConfig } from '../config';
import { ambientMusic } from '../utils/audio';

interface Props {
  onNext: () => void;
}

export const ScreenQuiz: React.FC<Props> = ({ onNext }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = surpriseConfig.quizQuestions;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    ambientMusic.playSoundEffect('click');
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));

    const reaction = currentQ.options[optionIndex].reaction;
    setCurrentReaction(reaction);

    // Auto proceed to next question or conclusion after a brief reaction delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCurrentReaction(null);
      } else {
        ambientMusic.playSoundEffect('chime');
        setIsCompleted(true);
      }
    }, 700);
  };

  const handleNextScreen = () => {
    ambientMusic.playSoundEffect('click');
    onNext();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 w-full max-w-2xl mx-auto">
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative backdrop-blur-xl">
        {!isCompleted ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <div className="flex gap-1.5">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentQuestionIndex
                        ? 'w-6 bg-amber-400'
                        : idx < currentQuestionIndex
                        ? 'w-3 bg-emerald-400'
                        : 'w-3 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                {currentQ.question}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Pick the most accurate answer (or the funniest one)
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-medium text-sm sm:text-base flex-1">{opt.text}</span>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400 text-slate-950'
                          : 'border-slate-600 group-hover:border-slate-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Reaction popup */}
            <div className="min-h-[30px] flex items-center justify-center text-center">
              {currentReaction && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs sm:text-sm font-semibold animate-in zoom-in-95 duration-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentReaction}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Scientific Conclusion Card */
          <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center shadow-lg shadow-amber-500/20 animate-float">
              <Award className="w-10 h-10 text-amber-400" />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Check className="w-3.5 h-3.5" />
                <span>Evaluation Complete</span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-200">
                {surpriseConfig.quizConclusionTitle}
              </h3>

              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-amber-500/10 border border-amber-400/30">
                <p className="font-heading text-xl sm:text-2xl font-extrabold text-amber-300 leading-tight">
                  "{surpriseConfig.quizConclusionText}"
                </p>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm">
                Peer-reviewed by independent chaos analysts. Accuracy score: 100%.
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleNextScreen}
                className="flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-heading font-bold text-base sm:text-lg shadow-xl shadow-amber-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{surpriseConfig.quizNextButtonText}</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
