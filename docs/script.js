/**
 * ==============================================================================
 * 🛠️ SURPRISE FOR DISHA VERMA — STANDALONE JAVASCRIPT
 * ==============================================================================
 * 100% Client-side. Zero backend. Zero framework. Works directly in browser & GitHub Pages.
 *
 * EDITING CONFIGURATION SECTIONS BELOW:
 * 1. Name & Titles
 * 2. Friendship Messages
 * 3. Quiz Questions & Options
 * 4. Final Message & Reactions
 * ==============================================================================
 */

// ==========================================
// 1. CONFIGURATION (EDITABLE VALUES)
// ==========================================
const CONFIG = {
  friendName: "Disha",
  friendFullName: "Disha Verma",
  senderSignature: "— Your Friend",

  // Screen 4: Quiz
  quizQuestions: [
    {
      question: "Who is more likely to reply after disappearing for 3 business days? 😂",
      options: [
        { text: "Me", reaction: "Honesty 100 💀" },
        { text: "Disha", reaction: "Accurate observation detected 😂" },
        { text: "Both of us 😭", reaction: "Double ghosting records broken!" }
      ]
    },
    {
      question: "Who is more likely to start a completely random conversation?",
      options: [
        { text: "Me", reaction: "Standard protocol initiated 😂" },
        { text: "Disha", reaction: "Zero context, 100% entertainment ✨" },
        { text: "Depends on the day 😂", reaction: "The truest answer ever!" }
      ]
    },
    {
      question: "Who causes more unnecessary chaos?",
      options: [
        { text: "Definitely me", reaction: "Taking one for the team 🤝" },
        { text: "Definitely Disha", reaction: "The jury has spoken 🚨😂" },
        { text: "Let's not investigate this 💀", reaction: "Case closed. Files classified 🗄️" }
      ]
    }
  ]
};

// ==========================================
// 2. BACKGROUND STARFIELD CANVAS
// ==========================================
function initStarfield() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  });

  let stars = [];
  const colors = [
    'rgba(255, 255, 255, ',
    'rgba(224, 231, 255, ',
    'rgba(254, 240, 138, ',
    'rgba(196, 181, 253, ',
    'rgba(167, 243, 208, '
  ];

  function createStars() {
    stars = [];
    const count = Math.min(Math.floor((width * height) / 9000), 100);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.6 + Math.random() * 2,
        baseAlpha: 0.2 + Math.random() * 0.7,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.15 - Math.random() * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  createStars();

  let tick = 0;
  function animate() {
    tick++;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;

      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;

      const alpha = Math.max(0.05, Math.min(1, s.baseAlpha + Math.sin(tick * s.twinkleSpeed + i) * 0.35));
      ctx.fillStyle = `${s.color}${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================
// 3. AUDIO CONTROLLER WITH SYNTHESIS FALLBACK
// ==========================================
let audioPlaying = false;
let audioCtx = null;
let synthTimer = null;
const bgAudio = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
const musicLabel = document.getElementById('music-label');

function playSynthChime() {
  if (!audioPlaying) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
    const freq = notes[Math.floor(Math.random() * notes.length)];
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.0);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 2.2);

    synthTimer = setTimeout(playSynthChime, 1500 + Math.random() * 900);
  } catch {
    // Autoplay or audio context permission restricted
  }
}

function playSoundChime() {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const t = now + idx * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.05, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.85);
    });
  } catch {
    // Ignore sound effect restrictions
  }
}

function toggleMusic() {
  audioPlaying = !audioPlaying;

  if (audioPlaying) {
    musicBtn.classList.add('playing');
    musicIcon.textContent = '🔊';
    musicLabel.textContent = 'Playing';

    if (bgAudio) {
      bgAudio.play().catch(() => {
        playSynthChime();
      });
    } else {
      playSynthChime();
    }
  } else {
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '🔇';
    musicLabel.textContent = 'Play Music';
    if (bgAudio) bgAudio.pause();
    if (synthTimer) clearTimeout(synthTimer);
  }
}

if (musicBtn) {
  musicBtn.addEventListener('click', toggleMusic);
}

// ==========================================
// 4. SCREEN NAVIGATION
// ==========================================
let currentScreen = 1;
const screens = [
  document.getElementById('screen-1'),
  document.getElementById('screen-2'),
  document.getElementById('screen-3'),
  document.getElementById('screen-4'),
  document.getElementById('screen-5')
];
const dots = document.querySelectorAll('.step-dots .dot');

function updateDots(step) {
  dots.forEach((dot, idx) => {
    dot.className = 'dot';
    if (idx + 1 === step) {
      dot.classList.add('active');
    } else if (idx + 1 < step) {
      dot.classList.add('completed');
    }
  });
}

function showScreen(step) {
  currentScreen = step;
  screens.forEach((s, idx) => {
    if (s) {
      if (idx + 1 === step) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    }
  });
  updateDots(step);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger screen-specific initializers
  if (step === 2) {
    runScreen2Animation();
  } else if (step === 4) {
    loadQuizQuestion(0);
  }
}

// SCREEN 1 -> SCREEN 2
const btnStart = document.getElementById('btn-start');
if (btnStart) {
  btnStart.addEventListener('click', () => {
    playSoundChime();
    showScreen(2);
  });
}

// ==========================================
// 5. SCREEN 2: WARNING ANIMATION
// ==========================================
let warningStep = 0;
let warningInterval = null;

function runScreen2Animation() {
  warningStep = 0;
  const lines = [
    document.getElementById('wl-0'),
    document.getElementById('wl-1'),
    document.getElementById('wl-2'),
    document.getElementById('wl-3'),
    document.getElementById('wl-4'),
    document.getElementById('wl-5')
  ];

  lines.forEach(l => l && l.classList.remove('show'));

  if (warningInterval) clearInterval(warningInterval);

  warningInterval = setInterval(() => {
    if (warningStep < lines.length) {
      if (lines[warningStep]) lines[warningStep].classList.add('show');
      warningStep++;
    } else {
      clearInterval(warningInterval);
    }
  }, 750);
}

// Allow skipping animation on click
const warningBox = document.querySelector('.warning-box');
if (warningBox) {
  warningBox.addEventListener('click', () => {
    for (let i = 0; i <= 5; i++) {
      const el = document.getElementById(`wl-${i}`);
      if (el) el.classList.add('show');
    }
    if (warningInterval) clearInterval(warningInterval);
  });
}

const btnWarningContinue = document.getElementById('btn-warning-continue');
if (btnWarningContinue) {
  btnWarningContinue.addEventListener('click', (e) => {
    e.stopPropagation();
    playSoundChime();
    showScreen(3);
  });
}

// ==========================================
// 6. SCREEN 3: FRIENDSHIP CARDS
// ==========================================
const fCards = document.querySelectorAll('.f-card');
const cardsCountEl = document.getElementById('cards-count');
let unlockedCount = 0;

fCards.forEach(card => {
  card.addEventListener('click', () => {
    const isUnlocked = card.classList.contains('unlocked');
    if (!isUnlocked) {
      card.classList.add('unlocked');
      const statusEl = card.querySelector('.card-status');
      if (statusEl) statusEl.textContent = '✓ Unlocked';
      unlockedCount++;
      if (cardsCountEl) cardsCountEl.textContent = unlockedCount;
      playSoundChime();
    }
  });
});

const btnCardsContinue = document.getElementById('btn-cards-continue');
if (btnCardsContinue) {
  btnCardsContinue.addEventListener('click', () => {
    playSoundChime();
    showScreen(4);
  });
}

// ==========================================
// 7. SCREEN 4: QUIZ LOGIC
// ==========================================
let currentQuizIdx = 0;
const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsEl = document.getElementById('quiz-options');
const quizStepEl = document.getElementById('quiz-step');
const quizReactionEl = document.getElementById('quiz-reaction');
const quizContainer = document.getElementById('quiz-question-container');
const quizConclusion = document.getElementById('quiz-conclusion');

function loadQuizQuestion(idx) {
  currentQuizIdx = idx;
  const qData = CONFIG.quizQuestions[idx];
  if (!qData) return;

  if (quizContainer) quizContainer.style.display = 'block';
  if (quizConclusion) quizConclusion.style.display = 'none';

  if (quizStepEl) quizStepEl.textContent = `Question ${idx + 1} of ${CONFIG.quizQuestions.length}`;
  if (quizQuestionEl) quizQuestionEl.textContent = qData.question;
  if (quizReactionEl) quizReactionEl.textContent = '';

  if (quizOptionsEl) {
    quizOptionsEl.innerHTML = '';
    qData.options.forEach((opt, oIdx) => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.innerHTML = `<span>${opt.text}</span><span>→</span>`;
      btn.addEventListener('click', () => selectQuizOption(oIdx));
      quizOptionsEl.appendChild(btn);
    });
  }
}

function selectQuizOption(oIdx) {
  const qData = CONFIG.quizQuestions[currentQuizIdx];
  const selected = qData.options[oIdx];

  if (quizReactionEl) {
    quizReactionEl.textContent = `✨ ${selected.reaction}`;
  }

  playSoundChime();

  setTimeout(() => {
    if (currentQuizIdx < CONFIG.quizQuestions.length - 1) {
      loadQuizQuestion(currentQuizIdx + 1);
    } else {
      // Quiz complete! Show Scientific Conclusion
      if (quizContainer) quizContainer.style.display = 'none';
      if (quizConclusion) quizConclusion.style.display = 'block';
      playSoundChime();
    }
  }, 700);
}

const btnQuizContinue = document.getElementById('btn-quiz-continue');
if (btnQuizContinue) {
  btnQuizContinue.addEventListener('click', () => {
    playSoundChime();
    showScreen(5);
  });
}

// ==========================================
// 8. SCREEN 5: GIFT BOX & FINAL REVEAL
// ==========================================
const giftStage = document.getElementById('gift-stage');
const finalCardStage = document.getElementById('final-card-stage');
const btnOpenGift = document.getElementById('btn-open-gift');
const giftInteractive = document.getElementById('gift-interactive');

function triggerConfettiBlast() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#818cf8', '#34d399', '#c084fc']
    });

    setTimeout(() => {
      window.confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fbbf24', '#818cf8']
      });
      window.confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f472b6', '#34d399', '#fbbf24']
      });
    }, 250);
  } else {
    // Self-contained fallback confetti using native 2D canvas
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#fbbf24', '#f59e0b', '#818cf8', '#34d399', '#c084fc', '#f43f5e'];
    const particles = [];
    const width = canvas.width;
    const height = canvas.height;

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 60,
        y: height * 0.55,
        vx: (Math.random() - 0.5) * 16,
        vy: -8 - Math.random() * 12,
        size: 5 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        alpha: 1
      });
    }

    let frames = 0;
    function renderFallbackConfetti() {
      frames++;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.01;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      }

      if (frames < 120) {
        requestAnimationFrame(renderFallbackConfetti);
      }
    }
    renderFallbackConfetti();
  }
}

function openGift() {
  playSoundChime();
  triggerConfettiBlast();

  if (giftStage) giftStage.style.display = 'none';
  if (finalCardStage) finalCardStage.style.display = 'block';
}

if (btnOpenGift) btnOpenGift.addEventListener('click', openGift);
if (giftInteractive) giftInteractive.addEventListener('click', openGift);

// Extra confetti button
const btnMoreConfetti = document.getElementById('btn-more-confetti');
if (btnMoreConfetti) {
  btnMoreConfetti.addEventListener('click', () => {
    triggerConfettiBlast();
  });
}

// Reaction Buttons
const reactionBtns = document.querySelectorAll('.btn-reaction');
const missionBanner = document.getElementById('mission-banner');

reactionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    reactionBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    if (missionBanner) missionBanner.style.display = 'block';
    triggerConfettiBlast();
    playSoundChime();
  });
});

// Replay Button
const btnReplay = document.getElementById('btn-replay');
if (btnReplay) {
  btnReplay.addEventListener('click', () => {
    if (giftStage) giftStage.style.display = 'block';
    if (finalCardStage) finalCardStage.style.display = 'none';
    if (missionBanner) missionBanner.style.display = 'none';
    reactionBtns.forEach(b => b.classList.remove('selected'));
    showScreen(1);
  });
}

// Copy URL Button
const btnCopyUrl = document.getElementById('btn-copy-url');
if (btnCopyUrl) {
  btnCopyUrl.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    const originalText = btnCopyUrl.textContent;
    btnCopyUrl.textContent = 'Link Copied! 🎉';
    setTimeout(() => {
      btnCopyUrl.textContent = originalText;
    }, 2500);
  });
}

// WhatsApp Share Button
const btnWhatsApp = document.getElementById('btn-whatsapp');
if (btnWhatsApp) {
  btnWhatsApp.addEventListener('click', () => {
    const text = encodeURIComponent(
      `Hey Disha! 👀 Someone made this special surprise website for you:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  });
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  updateDots(1);
});
