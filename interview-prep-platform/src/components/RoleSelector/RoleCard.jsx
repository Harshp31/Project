const COLOR_MAP = {
  blue: {
    border:    "border-blue-400 dark:border-blue-500",
    bg:        "bg-blue-50 dark:bg-blue-900/20",
    badge:     "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    ring:      "ring-blue-400",
    iconBg:    "bg-blue-100 dark:bg-blue-900/40",
  },
  cyan: {
    border:    "border-cyan-400 dark:border-cyan-500",
    bg:        "bg-cyan-50 dark:bg-cyan-900/20",
    badge:     "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300",
    ring:      "ring-cyan-400",
    iconBg:    "bg-cyan-100 dark:bg-cyan-900/40",
  },
  green: {
    border:    "border-green-400 dark:border-green-500",
    bg:        "bg-green-50 dark:bg-green-900/20",
    badge:     "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
    ring:      "ring-green-400",
    iconBg:    "bg-green-100 dark:bg-green-900/40",
  },
};

export default function RoleCard({ role, isSelected, onSelect }) {
  const c = COLOR_MAP[role.color];

  return (
    <button
      onClick={() => onSelect(role)}
      className={`
        w-full text-left p-5 rounded-2xl border-2 transition-all duration-200
        hover:shadow-md active:scale-[0.98] cursor-pointer
        ${isSelected
          ? `${c.border} ${c.bg} ring-2 ${c.ring} ring-offset-2 dark:ring-offset-gray-950 shadow-md`
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isSelected ? c.iconBg : "bg-gray-100 dark:bg-gray-800"}`}>
          {role.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900 dark:text-white">
              {role.label}
            </p>
            {isSelected && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.badge}`}>
                Selected ✓
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {role.description}
          </p>
        </div>
      </div>
    </button>
  );
}