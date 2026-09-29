import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Globe, Terminal, FileCode } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = (text: string, tabId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabId);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const gitCommands = `# 1. In your local folder, initialize git and push
git init
git add .
git commit -m "Surprise for Disha ✨"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/disha-surprise.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Public Link & GitHub Pages Guide 🌐
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Shareable with Disha on WhatsApp, Instagram, or any phone/browser
            </p>
          </div>
        </div>

        {/* Option 1: Current Instant Public URL */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <span>Method 1: Instant Public Web Link</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                Ready Now
              </span>
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This app is already running on a live secure HTTPS URL. You can send this link directly to Disha on WhatsApp or Instagram right away:
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-amber-200 select-all"
            />
            <button
              onClick={() => copyToClipboard(currentUrl, 'current-url')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shrink-0"
            >
              {copiedTab === 'current-url' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedTab === 'current-url' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Option 2: 100% Free Custom GitHub Pages (username.github.io/disha-surprise) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>Method 2: Free Custom GitHub Pages URL</span>
            </span>
          </div>

          <p className="text-xs text-slate-300">
            To get a personalized URL like <code className="text-amber-300 font-mono">https://username.github.io/disha-surprise/</code>:
          </p>

          {/* Step by step */}
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">1</span>
                <span>Create a new GitHub Repository</span>
              </div>
              <p className="text-slate-400 pl-7">
                Go to <strong className="text-slate-200">github.com/new</strong> and name it <strong className="text-slate-200">disha-surprise</strong> (set to Public).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">2</span>
                  <span>Upload Files</span>
                </div>
                <button
                  onClick={() => copyToClipboard(gitCommands, 'git-cmd')}
                  className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-indigo-200"
                >
                  {copiedTab === 'git-cmd' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Git commands</span>
                </button>
              </div>
              <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 overflow-x-auto">
                {gitCommands}
              </pre>
              <p className="text-[11px] text-slate-400 pl-1">
                (We also created standalone vanilla <code className="text-indigo-300">standalone/index.html</code>, <code className="text-indigo-300">standalone/style.css</code>, and <code className="text-indigo-300">standalone/script.js</code> files in the root for zero-build direct uploading!)
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">3</span>
                <span>Enable GitHub Pages in Settings</span>
              </div>
              <p className="text-slate-400 pl-7 leading-relaxed">
                In your GitHub repo, click <strong className="text-slate-200">Settings</strong> → <strong className="text-slate-200">Pages</strong>. Under <em>Branch</em>, select <strong className="text-slate-200">main</strong> and root folder, then click <strong className="text-slate-200">Save</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-xs">Done! Within 60 seconds your link goes live:</p>
                <p className="font-mono text-amber-300 text-xs">https://YOUR_USERNAME.github.io/disha-surprise/</p>
              </div>
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
