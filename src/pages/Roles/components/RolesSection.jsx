import { Plus } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import RolesForm from "./RolesForm";
import RolesTable from "./RolesTable";

export default function RolesSection({
  roles,
  people,
  formValues,
  editingId,
  isFormOpen,
  assigneeQuery,
  assigneeOpen,
  assigneeOptions,
  assignedLabel,
  onCreate,
  onCloseForm,
  onSubmit,
  onFieldChange,
  onEdit,
  onDelete,
  onAssigneeInput,
  onAssigneeFocus,
  onAssigneeBlur,
  onAssigneeSelect,
  getPersonLabel,
}) {
  return (
    <section className="grid gap-6">
      <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Lista de cargos</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {roles.length} registros cadastrados.
            </p>
          </div>
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            <Plus className="h-4 w-4" />
            Novo cargo
          </button>
        </div>
        {roles.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Nenhum cargo cadastrado ainda.
          </p>
        ) : (
          <div className="mt-6">
            <RolesTable
              roles={roles}
              people={people}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        )}
      </div>

      <Modal
        open={isFormOpen}
        title={editingId ? "Editar cargo" : "Cadastrar cargo"}
        description="Código e Nome são obrigatórios. Atribua uma pessoa quando existir."
        onClose={onCloseForm}
      >
        <RolesForm
          formValues={formValues}
          editingId={editingId}
          peopleCount={people.length}
          assigneeQuery={assigneeQuery}
          assigneeOpen={assigneeOpen}
          assigneeOptions={assigneeOptions}
          assignedLabel={assignedLabel}
          onSubmit={onSubmit}
          onFieldChange={onFieldChange}
          onCancelEdit={onCloseForm}
          onAssigneeInput={onAssigneeInput}
          onAssigneeFocus={onAssigneeFocus}
          onAssigneeBlur={onAssigneeBlur}
          onAssigneeSelect={onAssigneeSelect}
          getPersonLabel={getPersonLabel}
        />
      </Modal>
    </section>
  );
}

