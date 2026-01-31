import AssigneeAutocomplete from "./AssigneeAutocomplete";
import Field from "../../../components/ui/Field";

export default function RolesForm({
  formValues,
  editingId,
  peopleCount,
  assigneeQuery,
  assigneeOpen,
  assigneeOptions,
  assignedLabel,
  onSubmit,
  onFieldChange,
  onCancelEdit,
  onAssigneeInput,
  onAssigneeFocus,
  onAssigneeBlur,
  onAssigneeSelect,
  getPersonLabel,
}) {
  const handleChange = (field) => (event) => onFieldChange(field, event.target.value);

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Código">
          <input
            name="codigo"
            value={formValues.codigo}
            onChange={handleChange("codigo")}
            placeholder="01"
            required
            className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
          />
        </Field>
        <Field label="Nome">
          <input
            name="nome"
            value={formValues.nome}
            onChange={handleChange("nome")}
            placeholder="Diretor"
            required
            className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
          />
        </Field>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Posto">
          <input
            name="posto"
            value={formValues.posto}
            onChange={handleChange("posto")}
            placeholder="Almirante"
            className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
          />
        </Field>
        <Field label="Profissão">
          <input
            name="profissao"
            value={formValues.profissao}
            onChange={handleChange("profissao")}
            placeholder="Intendente"
            className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
          />
        </Field>
      </div>

      <AssigneeAutocomplete
        value={assigneeQuery}
        placeholder={
          peopleCount === 0 ? "Cadastre pessoas para selecionar" : "Buscar por NIP ou nome"
        }
        open={assigneeOpen}
        hasPeople={peopleCount > 0}
        options={assigneeOptions}
        selectedLabel={assignedLabel}
        onInput={onAssigneeInput}
        onFocus={onAssigneeFocus}
        onBlur={onAssigneeBlur}
        onSelect={onAssigneeSelect}
        getOptionLabel={getPersonLabel}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-400"
        >
          {editingId ? "Atualizar cargo" : "Salvar cargo"}
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

