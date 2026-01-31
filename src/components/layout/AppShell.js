export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,189,248,0.25),transparent_70%)] dark:bg-[radial-gradient(50%_40%_at_60%_0%,rgba(56,189,248,0.15),transparent_70%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
