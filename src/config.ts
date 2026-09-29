/**
 * ==============================================================================
 * 🛠️ SURPRISE WEBSITE CONFIGURATION FILE
 * ==============================================================================
 * You can easily customize any text, questions, or audio file right here!
 * Everything updates automatically across the entire surprise website.
 * ==============================================================================
 */

export interface SurpriseConfig {
  // 1. DISHA'S NAME & TITLES
  friendName: string;
  friendFullName: string;
  senderSignature: string;

  // 2. AUDIO / MUSIC SETTINGS
  // If you place a file named "music.mp3" in the /public folder, it will play this.
  // If the file is missing, the site automatically uses a built-in gentle ambient synthesizer!
  musicFileName: string;

  // 3. SCREEN 1: MYSTERY INTRO
  introTitle: string;
  introSubtitle: string;
  introButtonText: string;

  // 4. SCREEN 2: FUNNY WARNING
  warningHeader: string;
  warningLines: string[];
  warningNote: string;
  warningButtonText: string;

  // 5. SCREEN 3: FRIENDSHIP CARDS
  cards: Array<{
    id: number;
    title: string;
    icon: string;
    revealedText: string;
  }>;

  // 6. SCREEN 4: MINI FRIENDSHIP QUIZ
  quizTitle: string;
  quizSubtitle: string;
  quizQuestions: Array<{
    id: number;
    question: string;
    options: Array<{
      text: string;
      reaction: string;
    }>;
  }>;
  quizConclusionTitle: string;
  quizConclusionText: string;
  quizNextButtonText: string;

  // 7. SCREEN 5: SECRET REVEAL & FINAL MESSAGE
  revealPreTitle: string;
  revealTitle: string;
  openGiftButtonText: string;
  finalMessageHeader: string;
  finalMessageParagraphs: string[];
  finalSignOff: string;

  // 8. FINAL INTERACTION BUTTONS & RESPONSES
  finalOptions: Array<{
    text: string;
    customResponse: string;
  }>;
  missionAccomplishedTitle: string;
  missionAccomplishedText: string;
}

export const surpriseConfig: SurpriseConfig = {
  // ==========================================
  // 1. CHANGE DISHA'S NAME HERE
  // ==========================================
  friendName: "Disha",
  friendFullName: "Disha Verma",
  senderSignature: "— Your Friend",

  // ==========================================
  // 2. CHANGE MUSIC FILENAME HERE (placed in public/ or root)
  // ==========================================
  musicFileName: "music.mp3",

  // ==========================================
  // 3. SCREEN 1 — MYSTERY INTRO
  // ==========================================
  introTitle: "Hey Disha Verma 👀",
  introSubtitle: "Don't ask questions... just click the button 😂",
  introButtonText: "Open The Surprise ✨",

  // ==========================================
  // 4. SCREEN 2 — FUNNY WARNING
  // ==========================================
  warningHeader: "⚠️ IMPORTANT NOTICE ⚠️",
  warningLines: [
    "You have entered a highly unnecessary website.",
    "Was it necessary to make this?",
    "No.",
    "Did I make it anyway?",
    "Absolutely. 😂",
  ],
  warningNote: "Because you're my friend.",
  warningButtonText: "Okay... Continue 👀",

  // ==========================================
  // 5. SCREEN 3 — FRIENDSHIP CARDS
  // ==========================================
  cards: [
    {
      id: 1,
      title: "Random Conversations 😂",
      icon: "message-circle",
      revealedText:
        "Some conversations make absolutely no sense... and somehow those are the funniest ones.",
    },
    {
      id: 2,
      title: "Good Friend Energy ✨",
      icon: "sparkles",
      revealedText:
        "Some people just make normal days a little more fun. You're one of those people.",
    },
    {
      id: 3,
      title: "Certified Chaos 😂",
      icon: "zap",
      revealedText:
        "Every friendship needs at least one person responsible for unnecessary chaos.",
    },
    {
      id: 4,
      title: "Secret Message 🔐",
      icon: "key",
      revealedText:
        "Okay, this website is getting unnecessarily wholesome now.",
    },
  ],

  // ==========================================
  // 6. SCREEN 4 — MINI FRIENDSHIP QUIZ
  // ==========================================
  quizTitle: "Let's Test Something 😂",
  quizSubtitle: "Answer honestly (or dishonestly, there are no wrong answers)",
  quizQuestions: [
    {
      id: 1,
      question:
        "Who is more likely to reply after disappearing for 3 business days? 😂",
      options: [
        { text: "Me", reaction: "Honesty 100 💀" },
        { text: "Disha", reaction: "Accurate observation detected 😂" },
        { text: "Both of us 😭", reaction: "Double ghosting records broken!" },
      ],
    },
    {
      id: 2,
      question: "Who is more likely to start a completely random conversation?",
      options: [
        { text: "Me", reaction: "Standard protocol initiated 😂" },
        { text: "Disha", reaction: "Zero context, 100% entertainment ✨" },
        { text: "Depends on the day 😂", reaction: "The truest answer ever!" },
      ],
    },
    {
      id: 3,
      question: "Who causes more unnecessary chaos?",
      options: [
        { text: "Definitely me", reaction: "Taking one for the team 🤝" },
        { text: "Definitely Disha", reaction: "The jury has spoken 🚨😂" },
        { text: "Let's not investigate this 💀", reaction: "Case closed. Case files classified 🗄️" },
      ],
    },
  ],
  quizConclusionTitle: "Scientific conclusion:",
  quizConclusionText: "You're officially a certified awesome friend. 🏆😂",
  quizNextButtonText: "One Last Thing...",

  // ==========================================
  // 7. SCREEN 5 — SECRET REVEAL & FINAL MESSAGE
  // ==========================================
  revealPreTitle: "Okay Disha...",
  revealTitle: "There's actually one more thing.",
  openGiftButtonText: "Open It 🎁",

  finalMessageHeader: "Disha Verma 🌸",
  finalMessageParagraphs: [
    "This whole website was completely unnecessary...",
    "but I made it anyway. 😂",
    "Just wanted to remind you that you're genuinely a great friend.",
    "Thanks for the random conversations,\nthe laughs,\nthe chaos,\nand all the little moments that make friendship fun.",
    "I hope this tiny surprise made you smile. ✨",
    "Stay happy.\nStay awesome.\nAnd keep being you. 😎",
  ],
  finalSignOff: "— Your Friend",

  // ==========================================
  // 8. FINAL INTERACTION & BUTTONS
  // ==========================================
  finalOptions: [
    {
      text: "Okay, this was actually cute 😂",
      customResponse: "I knew you'd smile! 😊",
    },
    {
      text: "Why did you make this? 😭",
      customResponse: "Because why not? Life is too short to be normal 😂",
    },
  ],
  missionAccomplishedTitle: "MISSION ACCOMPLISHED! 🎉",
  missionAccomplishedText: "Now you can't say I never did anything for you. 😂",
};
