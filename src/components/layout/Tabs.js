import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/pessoas", label: "Pessoas" },
  { to: "/cargos", label: "Cargos" },
];

export default function Tabs() {
  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `rounded-full px-5 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                : "bg-white/80 text-slate-600 shadow-sm ring-1 ring-slate-200 hover:-translate-y-0.5 dark:bg-slate-900/70 dark:text-slate-200 dark:ring-slate-800"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
