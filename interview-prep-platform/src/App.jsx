import { useApp } from "./context/AppContext";

export default function App() {
  const { isDark, toggleTheme, selectedRole } = useApp();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-brand-600">
        Interview Prep Platform
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Theme: {isDark ? "🌙 Dark" : "☀️ Light"} | Role: {selectedRole?.label || "None selected"}
      </p>
      <button className="btn-primary" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}
