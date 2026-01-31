export default function AssigneeAutocomplete({
  value,
  placeholder,
  open,
  hasPeople,
  options,
  selectedLabel,
  onInput,
  onFocus,
  onBlur,
  onSelect,
  getOptionLabel,
}) {
  return (
    <div className="relative">
      <label className="grid gap-2 text-sm font-semibold">
        Pessoa atribuída
        <input
          value={value}
          onChange={(event) => onInput(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70"
        />
      </label>
      {open && hasPeople && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">Nenhum resultado encontrado.</div>
          ) : (
            options.map((person) => (
              <button
                key={person.id}
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onSelect(person);
                }}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span className="font-semibold">{getOptionLabel(person)}</span>
                <span className="text-xs uppercase text-slate-400">Selecionar</span>
              </button>
            ))
          )}
        </div>
      )}
      {selectedLabel && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Selecionado: <span className="font-semibold">{selectedLabel}</span>
        </p>
      )}
    </div>
  );
}
