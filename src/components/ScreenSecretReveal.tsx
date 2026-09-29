import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, RotateCcw, Share2, Check, Sparkles, HeartHandshake, Smile, HelpCircle, ExternalLink } from 'lucide-react';
import { surpriseConfig } from '../config';
import { ambientMusic } from '../utils/audio';

interface Props {
  onRestart: () => void;
  onOpenDeployGuide: () => void;
}

export const ScreenSecretReveal: React.FC<Props> = ({ onRestart, onOpenDeployGuide }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const fireCelebrationConfetti = () => {
    // Stage 1: Central burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#818cf8', '#34d399', '#c084fc'],
    });

    // Stage 2: Left and right cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fbbf24', '#818cf8', '#38bdf8'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f472b6', '#34d399', '#fbbf24'],
      });
    }, 250);

    // Stage 3: Star flutter
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        decay: 0.92,
        scalar: 1.2,
        origin: { y: 0.5 },
      });
    }, 500);
  };

  const handleOpenGift = () => {
    if (isOpen) return;
    ambientMusic.playSoundEffect('reveal');
    setIsOpen(true);
    fireCelebrationConfetti();
  };

  const handleSelectResponse = (text: string) => {
    ambientMusic.playSoundEffect('sparkle');
    setSelectedResponse(text);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#fbbf24', '#34d399', '#818cf8'],
    });
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey Disha! 👀 Someone made this special surprise website for you:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 z-10 w-full max-w-3xl mx-auto">
      {!isOpen ? (
        /* Mysterious Gift Box Presentation */
        <div className="text-center space-y-6 w-full max-w-lg glass-panel p-8 sm:p-12 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-500">
          <div className="space-y-2">
            <p className="text-amber-300 font-heading text-lg sm:text-xl font-semibold tracking-wide">
              {surpriseConfig.revealPreTitle}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              {surpriseConfig.revealTitle}
            </h2>
            <p className="text-slate-400 text-sm">
              No refunds, no exchanges, handle with friendship care 🎁
            </p>
          </div>

          {/* Interactive Gift Box Graphic */}
          <div
            onClick={handleOpenGift}
            className="relative py-6 flex items-center justify-center cursor-pointer group select-none"
          >
            {/* Pulsing glow background behind box */}
            <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-amber-500/20 via-indigo-500/30 to-purple-500/20 blur-2xl group-hover:scale-125 transition-transform duration-500 animate-pulse-glow" />

            {/* Custom 3D-styled Gift Box SVG */}
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 active:scale-95 animate-subtle-bob">
              <div className="w-36 h-36 sm:w-44 sm:h-44 relative flex items-center justify-center">
                {/* Outer Glow Halo */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-purple-600/30 rounded-3xl blur-xl" />

                {/* Box Body */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-900 to-slate-900 border-2 border-indigo-400/50 shadow-2xl relative flex items-center justify-center overflow-hidden">
                  {/* Vertical Ribbon */}
                  <div className="absolute w-8 h-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md" />
                  {/* Horizontal Ribbon */}
                  <div className="absolute h-8 w-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-md" />

                  {/* Sparkle badge */}
                  <div className="relative z-20 w-12 h-12 rounded-full bg-amber-400/30 border border-amber-300 flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <Sparkles className="w-6 h-6 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                </div>

                {/* Box Lid */}
                <div className="absolute -top-3 w-36 sm:w-44 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 border-2 border-indigo-300/60 shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="w-8 h-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500" />
                  {/* Bow on Top */}
                  <div className="absolute -top-4 w-10 h-6 flex justify-center items-center">
                    <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-200 shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleOpenGift}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-heading font-extrabold text-lg sm:text-xl shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 mx-auto"
            >
              <Gift className="w-6 h-6 text-slate-950" />
              <span>{surpriseConfig.openGiftButtonText}</span>
            </button>
            <p className="text-[11px] text-slate-400 mt-3 font-mono">
              Click box or button to unlock
            </p>
          </div>
        </div>
      ) : (
        /* Revealed Final Message Card */
        <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-indigo-400/40 shadow-2xl relative backdrop-blur-2xl animate-in zoom-in-95 fade-in duration-700">
          {/* Subtle top indicator */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/60">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 text-xs font-semibold">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
              <span>Certified Friendship Note</span>
            </div>

            <button
              onClick={fireCelebrationConfetti}
              className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 cursor-pointer transition-colors"
              title="More confetti!"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Confetti 🎊</span>
            </button>
          </div>

          {/* Letter Header */}
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 mb-6">
            {surpriseConfig.finalMessageHeader}
          </h2>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            {surpriseConfig.finalMessageParagraphs.map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-4">
            <p className="font-heading text-xl sm:text-2xl font-bold text-amber-300 italic">
              {surpriseConfig.finalSignOff}
            </p>

            <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 font-mono">
              Official Friendship Surprise • 100% Genuine
            </span>
          </div>

          {/* Final Interaction Reaction Buttons */}
          <div className="mt-10 pt-8 border-t border-slate-800 space-y-5">
            <p className="text-center font-heading text-base font-semibold text-slate-300">
              Your Honest Reaction:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {surpriseConfig.finalOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectResponse(opt.text)}
                  className={`p-3.5 rounded-xl border text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    selectedResponse === opt.text
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/20 scale-102'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500'
                  }`}
                >
                  {idx === 0 ? <Smile className="w-4 h-4 text-amber-400 group-hover:text-slate-950" /> : <HelpCircle className="w-4 h-4 text-indigo-400" />}
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Response Banner when clicked */}
            {selectedResponse && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-indigo-950/60 to-emerald-950/60 border border-emerald-400/40 text-center space-y-2 animate-in zoom-in-95 duration-300 shadow-xl">
                <h4 className="font-heading text-2xl font-extrabold text-emerald-300 flex items-center justify-center gap-2">
                  <span>{surpriseConfig.missionAccomplishedTitle}</span>
                </h4>
                <p className="text-slate-200 text-base sm:text-lg font-medium">
                  {surpriseConfig.missionAccomplishedText}
                </p>
              </div>
            )}
          </div>

          {/* Action Toolbar: Replay, Share, GitHub Pages instructions */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Replay Surprise 🔄</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied! 🎉</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-indigo-400" />
                  <span>Copy Link 🔗</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
            >
              <span>Share on WhatsApp 💬</span>
            </button>

            <button
              onClick={onOpenDeployGuide}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-900/40 hover:bg-indigo-800/60 border border-indigo-500/40 text-indigo-200 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-indigo-300" />
              <span>GitHub Pages Deployment Guide 🚀</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
