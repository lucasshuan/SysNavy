import { Moon, Sun } from "lucide-react";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Sistema portátil
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Gestão de Pessoas &amp; Cargos
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Tudo salvo localmente no navegador. Sem internet, sem instalação.
        </p>
      </div>
      <div className="flex items-center gap-3 rounded-full bg-white/80 px-3 py-2 shadow-sm ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-800">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Tema
        </span>
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-white dark:text-slate-900"
        >
          <span className="sr-only">{theme === "dark" ? "Tema escuro" : "Tema claro"}</span>
          {theme === "dark" ? (
            <Moon aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Sun aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
