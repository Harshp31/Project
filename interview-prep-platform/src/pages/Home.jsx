import { useNavigate } from "react-router-dom";
import { Sparkles, Clock, BarChart3, Shield } from "lucide-react";
import RoleSelector from "../components/RoleSelector/RoleSelector";
import { useApp } from "../context/AppContext";

const FEATURES = [
  { icon: Sparkles,  label: "AI Generated",   desc: "Questions built by Claude" },
  { icon: Clock,     label: "Timed Sessions",  desc: "Real interview pressure"   },
  { icon: BarChart3, label: "Analytics",       desc: "Track your progress"       },
  { icon: Shield,    label: "3 Roles",         desc: "Frontend, React, Python"   },
];

export default function Home() {
  const navigate     = useNavigate();
  const { selectedRole, resetSession } = useApp();

  const handleStart = () => {
    resetSession();
    navigate("/interview");
  };

  return (
    <div className="space-y-10">

      {/* ── Hero ── */}
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 text-sm font-medium">
          <Sparkles size={14} />
          AI-Powered Interview Practice
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Land Your Dream
          <span className="text-brand-600"> Dev Job</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Practice with AI-generated questions, get instant feedback, and track your improvement over time.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <Icon size={15} className="text-brand-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <p className="text-sm font-medium text-gray-400">Configure your session</p>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* ── Role Selector ── */}
      <RoleSelector onStart={handleStart} />

    </div>
  );
}