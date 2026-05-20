import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, BrainCircuit, LayoutDashboard, House } from "lucide-react";
import { useApp } from "../../context/AppContext";

const NAV_LINKS = [
  { to: "/",          label: "Home",      icon: House },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const { isDark, toggleTheme, selectedRole } = useApp();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* ── Brand ── */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <BrainCircuit size={20} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-gray-900 dark:text-white text-sm">
              InterviewPrep
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              AI-Powered Practice
            </p>
          </div>
        </Link>

        {/* ── Nav Links ── */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`
                  flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">
          {/* Active role badge */}
          {selectedRole && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300">
              <span>{selectedRole.icon}</span>
              <span>{selectedRole.label}</span>
            </div>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {isDark
              ? <Sun  size={16} className="text-yellow-400" />
              : <Moon size={16} className="text-gray-600"   />
            }
          </button>
        </div>

      </div>
    </nav>
  );
}