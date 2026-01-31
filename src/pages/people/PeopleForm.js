function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}

export default function PeopleForm({
  formValues,
  editingId,
  onSubmit,
  onFieldChange,
  onCancelEdit,
}) {
  const handleChange = (field) => (event) =>
    onFieldChange(field, event.target.value);

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="NIP">
          <input
            name="nip"
            value={formValues.nip}
            onChange={handleChange("nip")}
            placeholder="87.8897.94"
            required
            className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
          />
        </Field>
        <Field label="Nome">
          <input
            name="nome"
            value={formValues.nome}
            onChange={handleChange("nome")}
            placeholder="João da Silva"
            required
            className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
          />
        </Field>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Documento">
          <input
            name="documento"
            value={formValues.documento}
            onChange={handleChange("documento")}
            placeholder="OS 48/2026"
            className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
          />
        </Field>
        <Field label="Assunção">
          <input
            type="text"
            inputMode="numeric"
            placeholder="dd/mm/yyyy"
            name="assuncao"
            value={formValues.assuncao}
            onChange={handleChange("assuncao")}
            className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
          />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-400"
        >
          {editingId ? "Atualizar pessoa" : "Salvar pessoa"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 dark:border-slate-700 dark:text-slate-200"
          >
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  );
}
