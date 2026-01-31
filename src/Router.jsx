import { Navigate, Route, Routes } from "react-router-dom";
import PeoplePage from "./pages/People";
import RolesPage from "./pages/Roles";

export default function AppRouter({
  people,
  roles,
  personForm,
  roleForm,
  editingPersonId,
  editingRoleId,
  isPersonModalOpen,
  isRoleModalOpen,
  assigneeQuery,
  assigneeOpen,
  assigneeOptions,
  currentAssigneeLabel,
  onCreatePerson,
  onClosePersonForm,
  onSubmitPerson,
  onChangePersonField,
  onEditPerson,
  onDeletePerson,
  onCreateRole,
  onCloseRoleForm,
  onSubmitRole,
  onChangeRoleField,
  onEditRole,
  onDeleteRole,
  onAssigneeInput,
  onAssigneeFocus,
  onAssigneeBlur,
  onAssigneeSelect,
  getPersonLabel,
}) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pessoas" replace />} />
      <Route
        path="/pessoas"
        element={
          <PeoplePage
            people={people}
            formValues={personForm}
            editingId={editingPersonId}
            isFormOpen={isPersonModalOpen}
            onCreate={onCreatePerson}
            onCloseForm={onClosePersonForm}
            onSubmit={onSubmitPerson}
            onFieldChange={onChangePersonField}
            onEdit={onEditPerson}
            onDelete={onDeletePerson}
          />
        }
      />
      <Route
        path="/cargos"
        element={
          <RolesPage
            roles={roles}
            people={people}
            formValues={roleForm}
            editingId={editingRoleId}
            isFormOpen={isRoleModalOpen}
            assigneeQuery={assigneeQuery}
            assigneeOpen={assigneeOpen}
            assigneeOptions={assigneeOptions}
            currentAssigneeLabel={currentAssigneeLabel}
            onCreate={onCreateRole}
            onCloseForm={onCloseRoleForm}
            onSubmit={onSubmitRole}
            onFieldChange={onChangeRoleField}
            onEdit={onEditRole}
            onDelete={onDeleteRole}
            onAssigneeInput={onAssigneeInput}
            onAssigneeFocus={onAssigneeFocus}
            onAssigneeBlur={onAssigneeBlur}
            onAssigneeSelect={onAssigneeSelect}
            getPersonLabel={getPersonLabel}
          />
        }
      />
    </Routes>
  );
}
