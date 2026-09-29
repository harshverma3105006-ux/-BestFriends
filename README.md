# Something I Made For Disha 👀 ✨

An interactive, digital friendship surprise website created especially for **Disha Verma**.

> **Note on Friendship Context**: This website is 100% wholesome, funny, and celebratory of genuine friendship. It contains zero romantic references, zero couple tropes, and requires no personal photos.

---

## 🌟 Live Features & Flow

1. **Screen 1 — Mystery Intro**
   - Canvas-driven celestial starfield with drifting particles and responsive parallax.
   - Dramatic headline: *"Hey Disha Verma 👀"*
   - Micro-copy: *"Don't ask questions... just click the button 😂"*
   - Interactive trigger button: *"Open The Surprise ✨"*

2. **Screen 2 — Funny Warning**
   - Staggered line-by-line animated notice:
     - *"You have entered a highly unnecessary website."*
     - *"Was it necessary to make this?"*
     - *"No."*
     - *"Did I make it anyway?"*
     - *"Absolutely. 😂"*
     - *"Because you're my friend."*

3. **Screen 3 — Friendship Archives (Glassmorphism Cards)**
   - 4 Interactive flip/reveal cards:
     1. **Random Conversations 😂** → *"Some conversations make absolutely no sense... and somehow those are the funniest ones."*
     2. **Good Friend Energy ✨** → *"Some people just make normal days a little more fun. You're one of those people."*
     3. **Certified Chaos 😂** → *"Every friendship needs at least one person responsible for unnecessary chaos."*
     4. **Secret Message 🔐** → *"Okay, this website is getting unnecessarily wholesome now."*
   - Real-time unlock counter, audio chimes, and hover micro-interactions.

4. **Screen 4 — Mini Friendship Quiz**
   - 3 questions with hilarious reaction feedback on selection.
   - Question 1: *"Who is more likely to reply after disappearing for 3 business days? 😂"*
   - Question 2: *"Who is more likely to start a completely random conversation?"*
   - Question 3: *"Who causes more unnecessary chaos?"*
   - Scientific conclusion banner: *"You're officially a certified awesome friend. 🏆😂"*

5. **Screen 5 — Secret 3D Gift Box & Final Message**
   - 3D styled interactive Gift Box with ribbon and floating sparkles.
   - Clicking *"Open It 🎁"* triggers:
     - Lid pop animation
     - Multi-stage confetti blast across the screen (via canvas-confetti)
     - Celebration chime sound
     - Reveals the sincere final letter to Disha Verma.
   - 2 Reaction buttons:
     - *"Okay, this was actually cute 😂"*
     - *"Why did you make this? 😭"*
     - Shows: **MISSION ACCOMPLISHED! 🎉** *"Now you can't say I never did anything for you. 😂"*
   - Replay button, 1-click Copy Link, and direct WhatsApp Share.

6. **Audio / Music Player**
   - Floating audio toggle in upper right corner.
   - Does **NOT** autoplay (respects modern browser policies).
   - If a `music.mp3` file is placed in the folder, it plays it.
   - If no audio file is provided, it automatically falls back to an embedded Web Audio API soothing pentatonic chime synthesizer.

---

## 🛠️ Project Structure

The project gives you two ways to run and deploy:

```text
├── index.html                  # Vite HTML entry point (SEO & OG tags ready)
├── package.json                # Project dependencies
├── vite.config.ts              # Relative base path configured for GitHub Pages (base: './')
├── src/
│   ├── App.tsx                 # Main application state and screen router
│   ├── config.ts               # ⚙️ EASY CUSTOMIZATION FILE (all texts, questions, audio)
│   ├── components/
│   │   ├── BackgroundStars.tsx # Canvas starry particle field
│   │   ├── AudioPlayer.tsx     # Music toggle with animated visualizer
│   │   ├── ScreenMysteryIntro.tsx
│   │   ├── ScreenWarning.tsx
│   │   ├── ScreenFriendshipCards.tsx
│   │   ├── ScreenQuiz.tsx
│   │   ├── ScreenSecretReveal.tsx
│   │   └── DeployModal.tsx     # In-app GitHub Pages guide
│   └── utils/
│       └── audio.ts            # Web Audio API ambient chime generator
│
└── standalone/                 # 🚀 100% Vanilla HTML/CSS/JS (ZERO build required)
    ├── index.html              # Standalone entry point
    ├── style.css               # Glassmorphism styling
    └── script.js               # Complete standalone logic
```

---

## ✏️ How to Easily Edit Content

Open `src/config.ts` (for the Vite version) or `standalone/script.js` (for the standalone version) to modify:

1. **Disha's Name**: `friendName: "Disha"`, `friendFullName: "Disha Verma"`
2. **Friendship Messages**: Edit cards in `cards` array
3. **Quiz Questions & Options**: Edit `quizQuestions` array
4. **Final Letter**: Edit `finalMessageParagraphs`
5. **Music Filename**: Edit `musicFileName: "music.mp3"`

---

## 🚀 How to Run Locally

### Option A: Modern Vite App (Recommended)
```bash
# 1. Install dependencies
npm install

# 2. Start local server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Standalone HTML (Zero dependencies)
Simply double click `standalone/index.html` to open it in Chrome, Safari, or Edge!

---

## 🌐 How to Deploy for FREE on GitHub Pages (Public Link)

You can share a public link like:
`https://yourusername.github.io/disha-surprise/`

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com)
2. Click the **+** icon in the top right and select **New repository**
3. Repository name: `disha-surprise`
4. Set visibility to **Public**
5. Click **Create repository**

### Step 2: Upload Files to GitHub
You can use the standalone zero-build files:
1. In your new repository on GitHub, click **Upload files** (or push via terminal)
2. Drag and drop the 3 files from the `standalone/` directory:
   - `index.html`
   - `style.css`
   - `script.js`
   - *(Optional)* `music.mp3`
3. Click **Commit changes**

*Alternatively, if using the Vite project:*
```bash
npm run build
# The dist/ folder contains index.html and assets with relative paths ready for GitHub Pages!
```

### Step 3: Enable GitHub Pages
1. Go to your repository's **Settings** tab.
2. On the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`), select folder `/ (root)`.
4. Click **Save**.

### Step 4: Share Your Link!
Within 30–60 seconds, GitHub Pages will display your live public URL:
👉 `https://yourusername.github.io/disha-surprise/`

Send this URL directly to Disha on WhatsApp or Instagram!
- Opens immediately in one click
- Works smoothly on Android Chrome, iPhone Safari, and laptops
- No login or installation required
