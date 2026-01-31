import { Plus } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import PeopleForm from "./PeopleForm";
import PeopleTable from "./PeopleTable";

export default function PeopleSection({
  people,
  formValues,
  editingId,
  isFormOpen,
  onCreate,
  onCloseForm,
  onSubmit,
  onFieldChange,
  onEdit,
  onDelete,
}) {
  return (
    <section className="grid gap-6">
      <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Lista de pessoas</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {people.length} registros cadastrados.
            </p>
          </div>
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            <Plus className="h-4 w-4" />
            Nova pessoa
          </button>
        </div>
        {people.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Nenhuma pessoa cadastrada ainda.
          </p>
        ) : (
          <div className="mt-6">
            <PeopleTable people={people} onEdit={onEdit} onDelete={onDelete} />
          </div>
        )}
      </div>

      <Modal
        open={isFormOpen}
        title={editingId ? "Editar pessoa" : "Cadastrar pessoa"}
        description="Preencha os dados e salve. NIP e Nome são obrigatórios."
        onClose={onCloseForm}
      >
        <PeopleForm
          formValues={formValues}
          editingId={editingId}
          onSubmit={onSubmit}
          onFieldChange={onFieldChange}
          onCancelEdit={onCloseForm}
        />
      </Modal>
    </section>
  );
}

