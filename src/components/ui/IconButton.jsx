const variantStyles = {
  neutral:
    "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900",
  danger:
    "border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-500/10",
};

export default function IconButton({ label, onClick, variant = "neutral", children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border p-2 transition hover:-translate-y-0.5 ${variantStyles[variant]}`}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}
