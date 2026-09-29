/**
 * Disha Verma Friendship Surprise Website
 * Interactive Logic, Particle Systems, Confetti, Audio Engine & Flow State
 * Completely self-contained - Zero external dependencies - GitHub Pages ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. STATE & CONSTANTS
  // ==========================================
  const totalScreens = 5;
  let currentScreen = 1;
  const openedCards = new Set();
  let currentQuizIndex = 0;
  let isMusicPlaying = false;
  let audioContext = null;
  let synthInterval = null;

  // DOM Elements
  const stepPips = document.querySelectorAll('.step-pip');
  const screens = {
    1: document.getElementById('screen-1'),
    2: document.getElementById('screen-2'),
    3: document.getElementById('screen-3'),
    4: document.getElementById('screen-4'),
    5: document.getElementById('screen-5'),
  };

  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const musicLabel = document.getElementById('music-label');

  // ==========================================
  // 2. AUDIO ENGINE (Real MP3 + Web Audio Synth Fallback)
  // ==========================================
  function setupAudio() {
    if (!musicToggle) return;

    musicToggle.addEventListener('click', toggleMusic);

    // Audio error handling: If ./music.mp3 doesn't exist, we fall back to Web Audio synth
    if (bgMusic) {
      bgMusic.addEventListener('error', () => {
        // Fallback gracefully to Web Audio synth if user hasn't added music.mp3
        if (isMusicPlaying) {
          startSynthMusic();
        }
      });
      bgMusic.addEventListener('ended', () => {
        if (isMusicPlaying) {
          bgMusic.currentTime = 0;
          bgMusic.play().catch(() => {});
        }
      });
    }
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  function startMusic() {
    isMusicPlaying = true;
    musicToggle.classList.add('playing');
    musicLabel.textContent = 'Music: On';

    // Try playing the local file ./music.mp3
    if (bgMusic && bgMusic.src) {
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocked it or file is missing (404), activate pleasant ambient synth
          startSynthMusic();
        });
      }
    } else {
      startSynthMusic();
    }
  }

  function stopMusic() {
    isMusicPlaying = false;
    musicToggle.classList.remove('playing');
    musicLabel.textContent = 'Music: Off';

    if (bgMusic) {
      bgMusic.pause();
    }
    stopSynthMusic();
  }

  // Melodic Web Audio Synth (Gentle chill lo-fi chords)
  function startSynthMusic() {
    if (synthInterval) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Pentatonic / Chill chord progressions (C major / A minor friendly)
      const chordNotes = [
        [261.63, 329.63, 392.00, 523.25], // C maj
        [220.00, 261.63, 329.63, 440.00], // A min
        [174.61, 220.00, 261.63, 349.23], // F maj
        [196.00, 246.94, 293.66, 392.00], // G maj
      ];
      let chordIndex = 0;

      const playChord = () => {
        if (!isMusicPlaying || !audioContext) return;
        const notes = chordNotes[chordIndex % chordNotes.length];
        chordIndex++;

        notes.forEach((freq, i) => {
          setTimeout(() => {
            if (!isMusicPlaying || !audioContext) return;
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);

            gain.gain.setValueAtTime(0.001, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.025, audioContext.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.8);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start();
            osc.stop(audioContext.currentTime + 1.9);
          }, i * 90);
        });
      };

      playChord();
      synthInterval = setInterval(playChord, 2200);
    } catch {
      // Audio not supported, silent fallback
    }
  }

  function stopSynthMusic() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  // Soft UI Chime Sound effect on button click
  function playClickChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.08); // A5

      gain.gain.setValueAtTime(0.04, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + 0.25);
    } catch {
      // Ignore if audio permissions not granted
    }
  }

  // ==========================================
  // 3. SCREEN NAVIGATION
  // ==========================================
  function goToScreen(screenNumber) {
    if (screenNumber < 1 || screenNumber > totalScreens) return;
    playClickChime();

    // Fade out old screen
    if (screens[currentScreen]) {
      screens[currentScreen].classList.remove('active');
    }

    currentScreen = screenNumber;

    // Fade in new screen
    setTimeout(() => {
      if (screens[currentScreen]) {
        screens[currentScreen].classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);

    // Update Step Indicators
    stepPips.forEach((pip, idx) => {
      const step = idx + 1;
      pip.classList.remove('active', 'completed');
      if (step === currentScreen) {
        pip.classList.add('active');
      } else if (step < currentScreen) {
        pip.classList.add('completed');
      }
    });

    // Special trigger on screen 2 for staggered dialogue lines
    if (screenNumber === 2) {
      revealNoticeLines();
    }
  }

  // ==========================================
  // 4. SCREEN 2: NOTICE REVEAL LOGIC
  // ==========================================
  function revealNoticeLines() {
    const lines = document.querySelectorAll('.notice-line');
    lines.forEach((line, index) => {
      line.style.animationDelay = `${(index + 1) * 0.28}s`;
    });
  }

  // ==========================================
  // 5. SCREEN 3: FRIENDSHIP CARDS
  // ==========================================
  const cards = document.querySelectorAll('.f-card');
  const cardsCounter = document.getElementById('cards-counter-text');
  const nextQuizBtn = document.getElementById('btn-to-quiz');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const cardId = card.getAttribute('data-card');
      card.classList.toggle('opened');
      const indicator = card.querySelector('.f-card-indicator');

      if (card.classList.contains('opened')) {
        openedCards.add(cardId);
        if (indicator) indicator.textContent = 'Unlocked ✨';
        playClickChime();
      } else {
        if (indicator) indicator.textContent = 'Tap to read';
      }

      if (cardsCounter) {
        cardsCounter.textContent = `Cards Explored: ${openedCards.size} / 4`;
      }

      if (openedCards.size >= 4 && nextQuizBtn) {
        nextQuizBtn.classList.remove('btn-secondary');
        nextQuizBtn.classList.add('btn-primary');
        nextQuizBtn.innerHTML = 'Take The Friendship Test 📝 ✨';
      }
    });
  });

  // ==========================================
  // 6. SCREEN 4: FRIENDSHIP QUIZ LOGIC
  // ==========================================
  const quizData = [
    {
      question: "Who is more likely to reply after disappearing for 3 business days? 😂",
      options: [
        { text: "Definitely Disha 🏃‍♀️", reaction: "Accurate! Notification was 'delivered' 72 hours ago. 😂" },
        { text: "100% Disha (no debate needed)", reaction: "The jury agrees unanimously! 🏆" },
        { text: "Me (only when sleeping)", reaction: "Fair, but Disha holds the national record! 😂" },
        { text: "Both of us having an AFK tournament", reaction: "A legendary clash of unopened texts! 💬" },
      ],
    },
    {
      question: "Who is more likely to start a completely random conversation at 1 AM?",
      options: [
        { text: "Disha with zero context whatsoever 😂", reaction: "Starts right in the middle of a thought! 😂" },
        { text: "Me sending an absurdly unhinged meme 🐸", reaction: "10/10 relatable chaos! ✨" },
        { text: "Equal parts random 50/50 split", reaction: "A perfectly balanced friendship ecosystem! ⚖️" },
        { text: "Whoever drank tea/coffee too late ☕", reaction: "Caffeine-fueled philosophical debates! 🌌" },
      ],
    },
    {
      question: "Who causes more unnecessary chaos in this friendship?",
      options: [
        { text: "Disha (natural born instigator) 🌪️", reaction: "Scientific fact verified by leading researchers! 🧪" },
        { text: "Me provoking the chaos from afar 🍿", reaction: "Enjoying the fireworks with popcorn! 🍿" },
        { text: "Shared collective single braincell 🧠", reaction: "Divided equally, utilized randomly! 😂" },
        { text: "Chaos is our permanent default setting 🚀", reaction: "100% genuine friendship energy! 💫" },
      ],
    },
  ];

  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizReactionEl = document.getElementById('quiz-reaction');
  const quizProgressEl = document.getElementById('quiz-progress');
  const quizActiveSection = document.getElementById('quiz-active-section');
  const quizResultSection = document.getElementById('quiz-result-section');

  function renderQuizQuestion() {
    if (!quizQuestionEl || !quizOptionsEl) return;
    const currentQ = quizData[currentQuizIndex];

    quizProgressEl.textContent = `QUESTION ${currentQuizIndex + 1} OF ${quizData.length}`;
    quizQuestionEl.textContent = currentQ.question;
    quizReactionEl.textContent = '';
    quizOptionsEl.innerHTML = '';

    currentQ.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.type = 'button';
      btn.innerHTML = `<span>${opt.text}</span> <span style="opacity: 0.6">👉</span>`;

      btn.addEventListener('click', () => {
        playClickChime();
        // Highlight chosen
        document.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        quizReactionEl.textContent = opt.reaction;

        // Auto-advance after short moment
        setTimeout(() => {
          if (currentQuizIndex < quizData.length - 1) {
            currentQuizIndex++;
            renderQuizQuestion();
          } else {
            // Quiz completed!
            showQuizResults();
          }
        }, 950);
      });

      quizOptionsEl.appendChild(btn);
    });
  }

  function showQuizResults() {
    quizActiveSection.style.display = 'none';
    quizResultSection.style.display = 'block';
    launchConfetti(25);
  }

  // ==========================================
  // 7. SCREEN 5: GIFT REVEAL & FINAL MESSAGE
  // ==========================================
  const giftBox = document.getElementById('gift-box');
  const btnOpenGift = document.getElementById('btn-open-gift');
  const giftIntroSection = document.getElementById('gift-intro-section');
  const finalLetterSection = document.getElementById('final-letter-section');
  const btnReplay = document.getElementById('btn-replay');

  function handleOpenGift() {
    if (giftBox.classList.contains('opened')) return;

    playClickChime();
    giftBox.classList.add('opened');
    btnOpenGift.style.display = 'none';

    // Confetti explosion
    launchMassiveConfetti();

    setTimeout(() => {
      giftIntroSection.style.display = 'none';
      finalLetterSection.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  }

  if (giftBox) giftBox.addEventListener('click', handleOpenGift);
  if (btnOpenGift) btnOpenGift.addEventListener('click', handleOpenGift);

  // Replay
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      playClickChime();
      // Reset Quiz
      currentQuizIndex = 0;
      quizActiveSection.style.display = 'block';
      quizResultSection.style.display = 'none';
      renderQuizQuestion();

      // Reset Gift
      if (giftBox) giftBox.classList.remove('opened');
      if (btnOpenGift) btnOpenGift.style.display = 'inline-flex';
      giftIntroSection.style.display = 'block';
      finalLetterSection.style.display = 'none';

      // Reset Cards
      cards.forEach(card => {
        card.classList.remove('opened');
        const ind = card.querySelector('.f-card-indicator');
        if (ind) ind.textContent = 'Tap to read';
      });
      openedCards.clear();
      if (cardsCounter) cardsCounter.textContent = 'Cards Explored: 0 / 4';

      // Go back to screen 1
      goToScreen(1);
    });
  }

  // Buttons Event Listeners
  document.getElementById('btn-screen-1-next')?.addEventListener('click', () => goToScreen(2));
  document.getElementById('btn-screen-2-next')?.addEventListener('click', () => goToScreen(3));
  document.getElementById('btn-to-quiz')?.addEventListener('click', () => {
    goToScreen(4);
    renderQuizQuestion();
  });
  document.getElementById('btn-to-gift')?.addEventListener('click', () => goToScreen(5));

  // ==========================================
  // ==========================================
  // 8. BACKGROUND PARTICLES, STARS & FLOATING EMOJIS (Canvas)
  // ==========================================
  const bgCanvas = document.getElementById('bg-canvas');
  let bgCtx = null;
  let bgParticles = [];
  let bgEmojis = [];
  const whimsicalEmojis = ['✨', '😂', '🌸', '🚀', '⭐', '💫', '🎈', '👀'];

  function initBgCanvas() {
    if (!bgCanvas) return;
    bgCtx = bgCanvas.getContext('2d');
    resizeBgCanvas();
    window.addEventListener('resize', resizeBgCanvas);

    // Create background stars/dust
    const particleCount = window.innerWidth < 600 ? 40 : 75;
    bgParticles = [];
    for (let i = 0; i < particleCount; i++) {
      bgParticles.push({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        radius: Math.random() * 1.8 + 0.5,
        baseAlpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        hue: Math.random() > 0.6 ? 260 : 45, // Soft purple or warm gold
      });
    }

    // Create gently floating background emojis across all screens
    const emojiCount = window.innerWidth < 600 ? 12 : 20;
    bgEmojis = [];
    for (let i = 0; i < emojiCount; i++) {
      bgEmojis.push(createFloatingEmoji(true));
    }

    // Interactive whimsical touch: Tapping or clicking anywhere spawns a soft floating emoji
    window.addEventListener('pointerdown', (e) => {
      // Don't spawn on button clicks if too frequent, just add a lovely touch
      spawnClickEmoji(e.clientX, e.clientY);
    });

    requestAnimationFrame(renderBg);
  }

  function createFloatingEmoji(initialRandomY = false) {
    const width = bgCanvas ? bgCanvas.width : window.innerWidth;
    const height = bgCanvas ? bgCanvas.height : window.innerHeight;
    const emoji = whimsicalEmojis[Math.floor(Math.random() * whimsicalEmojis.length)];
    const size = Math.floor(Math.random() * 12 + 18); // 18px to 30px
    const baseX = Math.random() * width;

    return {
      emoji: emoji,
      size: size,
      baseX: baseX,
      x: baseX,
      y: initialRandomY ? Math.random() * height : height + size + Math.random() * 40,
      vy: -(Math.random() * 0.45 + 0.35), // gentle upward drift (0.35 to 0.8 px/frame)
      swaySpeed: Math.random() * 0.002 + 0.0012,
      swayAmp: Math.random() * 26 + 14,
      swayPhase: Math.random() * Math.PI * 2,
      rotationAmp: (Math.random() * 0.25 + 0.1), // gentle tilt
      rotationSpeed: Math.random() * 0.002 + 0.001,
      rotationPhase: Math.random() * Math.PI * 2,
      baseAlpha: Math.random() * 0.35 + 0.35, // 0.35 to 0.70 subtle transparency
      pulseSpeed: Math.random() * 0.003 + 0.001,
      pulsePhase: Math.random() * Math.PI * 2,
      isTemporary: false,
    };
  }

  function spawnClickEmoji(clickX, clickY) {
    if (!bgEmojis || bgEmojis.length > 40) return;
    const pickedEmoji = whimsicalEmojis[Math.floor(Math.random() * whimsicalEmojis.length)];
    bgEmojis.push({
      emoji: pickedEmoji,
      size: Math.floor(Math.random() * 10 + 20),
      baseX: clickX,
      x: clickX,
      y: clickY,
      vy: -(Math.random() * 0.8 + 0.6),
      swaySpeed: Math.random() * 0.003 + 0.002,
      swayAmp: Math.random() * 18 + 10,
      swayPhase: Math.random() * Math.PI * 2,
      rotationAmp: 0.3,
      rotationSpeed: 0.004,
      rotationPhase: 0,
      baseAlpha: 0.85,
      pulseSpeed: 0.002,
      pulsePhase: 0,
      isTemporary: true,
      life: 1.0,
      decay: 0.006,
    });
  }

  function resizeBgCanvas() {
    if (!bgCanvas) return;
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }

  function renderBg(time) {
    if (!bgCtx) return;
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    // 1. Render soft twinkling stardust
    for (let p of bgParticles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = bgCanvas.width;
      if (p.x > bgCanvas.width) p.x = 0;
      if (p.y < 0) p.y = bgCanvas.height;
      if (p.y > bgCanvas.height) p.y = 0;

      const alpha = p.baseAlpha + Math.sin(time * 0.002 * p.twinkleSpeed + p.twinkleOffset) * 0.2;
      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      bgCtx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${Math.max(0.05, Math.min(1, alpha))})`;
      bgCtx.fill();
    }

    // 2. Render gently floating whimsical emojis (✨, 😂, 🌸, 🚀, etc.)
    bgCtx.textAlign = 'center';
    bgCtx.textBaseline = 'middle';

    for (let i = bgEmojis.length - 1; i >= 0; i--) {
      const em = bgEmojis[i];

      // Update vertical position
      em.y += em.vy;

      // Update horizontal sway
      em.x = em.baseX + Math.sin(time * em.swaySpeed + em.swayPhase) * em.swayAmp;

      // Calculate tilt angle
      const rotation = Math.sin(time * em.rotationSpeed + em.rotationPhase) * em.rotationAmp;

      // Calculate alpha opacity
      let alpha = em.baseAlpha + Math.sin(time * em.pulseSpeed + em.pulsePhase) * 0.15;
      alpha = Math.max(0.15, Math.min(0.9, alpha));

      // If it's a click-spawned temporary emoji, fade it out as it rises
      if (em.isTemporary) {
        em.life -= em.decay;
        alpha = Math.max(0, em.life * 0.85);
        if (em.life <= 0) {
          bgEmojis.splice(i, 1);
          continue;
        }
      }

      // Check if emoji floated above screen top
      if (em.y < -50) {
        if (em.isTemporary) {
          bgEmojis.splice(i, 1);
          continue;
        } else {
          // Recycle to the bottom smoothly
          em.y = bgCanvas.height + em.size + Math.random() * 30;
          em.baseX = Math.random() * bgCanvas.width;
          em.x = em.baseX;
          em.emoji = whimsicalEmojis[Math.floor(Math.random() * whimsicalEmojis.length)];
        }
      }

      // Draw the floating emoji with rotation & alpha
      bgCtx.save();
      bgCtx.translate(em.x, em.y);
      bgCtx.rotate(rotation);
      bgCtx.globalAlpha = alpha;
      bgCtx.font = `${em.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      bgCtx.fillText(em.emoji, 0, 0);
      bgCtx.restore();
    }

    requestAnimationFrame(renderBg);
  }

  // ==========================================
  // 9. CELEBRATION CONFETTI ENGINE (Canvas)
  // ==========================================
  const confettiCanvas = document.getElementById('confetti-canvas');
  let confettiCtx = null;
  let confettiPieces = [];
  let confettiAnimationId = null;

  function initConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    resizeConfettiCanvas();
    window.addEventListener('resize', resizeConfettiCanvas);
  }

  function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  const confettiColors = ['#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#3b82f6', '#f43f5e'];

  function createConfettiPiece(originX, originY, spreadSpeed) {
    const angle = (Math.random() * 140 + 200) * (Math.PI / 180); // Upwards fountain
    const speed = Math.random() * spreadSpeed + 6;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 6,
      vy: Math.sin(angle) * speed - 2,
      gravity: 0.22,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      size: Math.random() * 9 + 5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      opacity: 1,
      decay: Math.random() * 0.008 + 0.004,
      isCircle: Math.random() > 0.7,
    };
  }

  function launchConfetti(count = 50) {
    initConfettiCanvas();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.65;

    for (let i = 0; i < count; i++) {
      confettiPieces.push(createConfettiPiece(centerX, centerY, 12));
    }

    if (!confettiAnimationId) {
      animateConfetti();
    }
  }

  function launchMassiveConfetti() {
    initConfettiCanvas();
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Center burst
    for (let i = 0; i < 120; i++) {
      confettiPieces.push(createConfettiPiece(w / 2, h * 0.55, 16));
    }

    // Left cannon
    for (let i = 0; i < 60; i++) {
      confettiPieces.push(createConfettiPiece(w * 0.15, h * 0.8, 18));
    }

    // Right cannon
    for (let i = 0; i < 60; i++) {
      confettiPieces.push(createConfettiPiece(w * 0.85, h * 0.8, 18));
    }

    if (!confettiAnimationId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    if (!confettiCtx || confettiPieces.length === 0) {
      confettiAnimationId = null;
      if (confettiCtx && confettiCanvas) {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
      return;
    }

    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99; // Air resistance
      p.rotation += p.vRotation;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > confettiCanvas.height + 20) {
        confettiPieces.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.fillStyle = p.color;

      if (p.isCircle) {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      } else {
        confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }

      confettiCtx.restore();
    }

    confettiAnimationId = requestAnimationFrame(animateConfetti);
  }

  // ==========================================
  // 10. INITIALIZATION
  // ==========================================
  setupAudio();
  initBgCanvas();
  initConfettiCanvas();
  renderQuizQuestion();

  // Ensure first screen is visible
  if (screens[1]) {
    screens[1].classList.add('active');
  }
});
