import { useApp, ROLES, DIFFICULTIES, QUESTION_TYPES } from "../../context/AppContext";
import RoleCard from "./RoleCard";
import { Sparkles, ArrowRight, Smile, Zap, Flame, ListTodo, MessageSquare, Code } from "lucide-react";

const DIFFICULTY_CONFIG = {
  Easy: {
    icon: Smile,
    colorClass: "text-green-500",
    bgClass: "bg-green-50 dark:bg-green-950/20",
    borderClass: "border-green-200 dark:border-green-800",
    activeClass: "ring-2 ring-green-400 bg-green-50/50 dark:bg-green-900/20 border-green-400",
  },
  Medium: {
    icon: Zap,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-50 dark:bg-amber-950/20",
    borderClass: "border-amber-200 dark:border-amber-800",
    activeClass: "ring-2 ring-amber-400 bg-amber-50/50 dark:bg-amber-900/20 border-amber-400",
  },
  Hard: {
    icon: Flame,
    colorClass: "text-red-500",
    bgClass: "bg-red-50 dark:bg-red-950/20",
    borderClass: "border-red-200 dark:border-red-800",
    activeClass: "ring-2 ring-red-400 bg-red-50/50 dark:bg-red-900/20 border-red-400",
  },
};

const QTYPE_CONFIG = {
  mcq: {
    label: "Multiple Choice",
    desc: "Test conceptual knowledge",
    icon: ListTodo,
    color: "brand",
    activeClass: "ring-2 ring-brand-400 bg-brand-50/50 dark:bg-brand-900/20 border-brand-400",
  },
  interview: {
    label: "Q&A Interview",
    desc: "Simulate behavioral & technical questions",
    icon: MessageSquare,
    color: "brand",
    activeClass: "ring-2 ring-brand-400 bg-brand-50/50 dark:bg-brand-900/20 border-brand-400",
  },
  coding: {
    label: "Coding Challenge",
    desc: "Write real code & run tests",
    icon: Code,
    color: "brand",
    activeClass: "ring-2 ring-brand-400 bg-brand-50/50 dark:bg-brand-900/20 border-brand-400",
  },
};

export default function RoleSelector({ onStart }) {
  const {
    selectedRole,
    setSelectedRole,
    difficulty,
    setDifficulty,
    questionType,
    setQuestionType,
  } = useApp();

  return (
    <div className="space-y-10 animate-fade-in">
      {/* ── Role Grid ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-bold">1</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Choose Your Path</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROLES.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              isSelected={selectedRole?.id === role.id}
              onSelect={setSelectedRole}
            />
          ))}
        </div>
      </div>

      {/* ── Settings Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Difficulty Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-bold">2</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select Difficulty</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {DIFFICULTIES.map((level) => {
              const config = DIFFICULTY_CONFIG[level];
              const Icon = config.icon;
              const isSelected = difficulty === level;

              return (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer hover:shadow-sm active:scale-[0.97]
                    ${isSelected
                      ? config.activeClass
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                    }
                  `}
                >
                  <Icon className={`w-6 h-6 mb-2 ${config.colorClass}`} />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{level}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Type Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-bold">3</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Session Type</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {QUESTION_TYPES.map((type) => {
              const config = QTYPE_CONFIG[type];
              const Icon = config.icon;
              const isSelected = questionType === type;

              return (
                <button
                  key={type}
                  onClick={() => setQuestionType(type)}
                  className={`
                    flex flex-col items-center p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer hover:shadow-sm active:scale-[0.97] justify-center
                    ${isSelected
                      ? config.activeClass
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                    }
                  `}
                >
                  <Icon className="w-6 h-6 mb-2 text-brand-500" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{config.label}</span>
                  <span className="text-[10px] text-gray-400 mt-1 leading-tight hidden sm:block">{config.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Start Action Button ── */}
      <div className="pt-6 flex justify-center">
        <button
          onClick={onStart}
          disabled={!selectedRole}
          className={`
            relative group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 active:scale-[0.98]
            ${selectedRole
              ? "bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white cursor-pointer hover:shadow-brand-500/20 hover:shadow-xl -translate-y-0.5"
              : "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            }
          `}
        >
          {selectedRole ? (
            <>
              <Sparkles size={20} className="animate-pulse" />
              <span>Start Practice Session</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          ) : (
            <span>Select a role above to begin</span>
          )}
        </button>
      </div>
    </div>
  );
}
