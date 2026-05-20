import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

// Roles available in the platform
export const ROLES = [
  {
    id: "frontend",
    label: "Frontend Developer",
    icon: "🖥️",
    color: "blue",
    description: "HTML, CSS, JavaScript, browser APIs",
  },
  {
    id: "react",
    label: "React Developer",
    icon: "⚛️",
    color: "cyan",
    description: "React, hooks, state management, JSX",
  },
  {
    id: "python",
    label: "Python Intern",
    icon: "🐍",
    color: "green",
    description: "Python basics, OOP, data structures",
  },
];

// Difficulty options
export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

// Question types
export const QUESTION_TYPES = ["mcq", "interview", "coding"];

export function AppProvider({ children }) {
  // ── Theme ──────────────────────────────────────────────
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // ── Session State ──────────────────────────────────────
  const [selectedRole, setSelectedRole] = useState(null);
  const [difficulty, setDifficulty]     = useState("Medium");
  const [questionType, setQuestionType] = useState("mcq");

  // Active interview session
  const [session, setSession] = useState({
    questions:       [],
    currentIndex:    0,
    answers:         {},     // { questionId: userAnswer }
    scores:          {},     // { questionId: { correct, points, timeTaken } }
    startTime:       null,
    isActive:        false,
    isComplete:      false,
  });

  // ── Session History (persisted) ────────────────────────
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sessionHistory")) || [];
    } catch {
      return [];
    }
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sessionHistory", JSON.stringify(history));
  }, [history]);

  // ── Session Actions ────────────────────────────────────
  const startSession = (questions) => {
    setSession({
      questions,
      currentIndex: 0,
      answers:      {},
      scores:       {},
      startTime:    Date.now(),
      isActive:     true,
      isComplete:   false,
    });
  };

  const submitAnswer = (questionId, answer, points = 0, timeTaken = 0) => {
    setSession((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      scores:  {
        ...prev.scores,
        [questionId]: { answer, points, timeTaken },
      },
    }));
  };

  const nextQuestion = () => {
    setSession((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, prev.questions.length - 1),
    }));
  };

  const prevQuestion = () => {
    setSession((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
    }));
  };

  const completeSession = () => {
    setSession((prev) => {
      const completed = { ...prev, isActive: false, isComplete: true };

      // Build history record
      const totalPoints = Object.values(completed.scores).reduce(
        (sum, s) => sum + (s.points || 0), 0
      );
      const maxPoints = completed.questions.length * 10;
      const record = {
        id:          Date.now(),
        role:        selectedRole?.id,
        roleLabel:   selectedRole?.label,
        difficulty,
        questionType,
        totalQ:      completed.questions.length,
        totalPoints,
        maxPoints,
        accuracy:    maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0,
        duration:    Math.round((Date.now() - completed.startTime) / 1000),
        date:        new Date().toISOString(),
      };

      setHistory((h) => [record, ...h].slice(0, 20)); // keep last 20
      return completed;
    });
  };

  const resetSession = () => {
    setSession({
      questions:    [],
      currentIndex: 0,
      answers:      {},
      scores:       {},
      startTime:    null,
      isActive:     false,
      isComplete:   false,
    });
  };

  // ── Expose Everything ──────────────────────────────────
  const value = {
    // Theme
    isDark,
    toggleTheme,

    // Role / Config
    selectedRole,
    setSelectedRole,
    difficulty,
    setDifficulty,
    questionType,
    setQuestionType,

    // Session
    session,
    startSession,
    submitAnswer,
    nextQuestion,
    prevQuestion,
    completeSession,
    resetSession,

    // History
    history,
    setHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook — use this everywhere instead of useContext(AppContext)
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}