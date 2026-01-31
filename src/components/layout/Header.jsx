import { Moon, Save, Sun, Upload } from "lucide-react";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export default function Header({ theme, onToggleTheme, onBackupSave, onBackupLoad }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Logo
          className="h-12 w-12 text-slate-900 dark:text-slate-100"
          aria-hidden="true"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Sistema portátil
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            SysNavy
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Gestão de Pessoas &amp; Cargos
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-2 shadow-sm ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-800">
          <span className="text-xs mr-2 font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Backup
          </span>
          <button
            type="button"
            onClick={onBackupSave}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label="Salvar backup"
          >
            <Save className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onBackupLoad}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label="Carregar backup"
          >
            <Upload className="h-4 w-4" />
          </button>
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
      </div>
    </header>
  );
}
