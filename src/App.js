import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Header from "./components/layout/Header";
import Tabs from "./components/layout/Tabs";
import PeoplePage from "./pages/people/PeoplePage";
import RolesPage from "./pages/roles/RolesPage";

const STORAGE_KEYS = {
  theme: "sysnavy_theme",
  people: "sysnavy_people",
  roles: "sysnavy_roles",
};

const emptyPerson = {
  id: "",
  nip: "",
  nome: "",
  documento: "",
  assuncao: "",
};

const emptyRole = {
  id: "",
  codigo: "",
  nome: "",
  posto: "",
  profissao: "",
  pessoaId: "",
};

function safeParse(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function loadFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  return safeParse(window.localStorage.getItem(key), fallback);
}

function saveToStorage(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getInitialTheme() {
  const stored = loadFromStorage(STORAGE_KEYS.theme, null);
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function personLabel(person) {
  const nip = person.nip ? person.nip.trim() : "Sem NIP";
  const nome = person.nome ? person.nome.trim() : "Sem nome";
  return `${nip} — ${nome}`;
}

function formatDateBR(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  if (digits.length <= 2) return day;
  if (digits.length <= 4) return `${day}/${month}`;
  return `${day}/${month}/${year}`;
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [people, setPeople] = useState(() => loadFromStorage(STORAGE_KEYS.people, []));
  const [roles, setRoles] = useState(() => loadFromStorage(STORAGE_KEYS.roles, []));
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const [personForm, setPersonForm] = useState(emptyPerson);
  const [editingPersonId, setEditingPersonId] = useState(null);

  const [roleForm, setRoleForm] = useState(emptyRole);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [assigneeQuery, setAssigneeQuery] = useState("");
  const [assigneeOpen, setAssigneeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveToStorage(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.people, people);
  }, [people]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.roles, roles);
  }, [roles]);

  const assigneeOptions = useMemo(() => {
    if (!assigneeQuery.trim()) return people.slice(0, 8);
    const needle = assigneeQuery.trim().toLowerCase();
    return people.filter((person) => personLabel(person).toLowerCase().includes(needle));
  }, [assigneeQuery, people]);

  const assignedPerson = people.find((person) => person.id === roleForm.pessoaId);
  const assignedLabel = assignedPerson ? personLabel(assignedPerson) : "";

  function resetPersonForm() {
    setPersonForm(emptyPerson);
    setEditingPersonId(null);
  }

  function resetRoleForm() {
    setRoleForm(emptyRole);
    setEditingRoleId(null);
    setAssigneeQuery("");
    setAssigneeOpen(false);
  }

  function closePersonModal() {
    setIsPersonModalOpen(false);
    resetPersonForm();
  }

  function closeRoleModal() {
    setIsRoleModalOpen(false);
    resetRoleForm();
  }

  function handlePersonSubmit(event) {
    event.preventDefault();
    if (!personForm.nip.trim() || !personForm.nome.trim()) return;

    if (editingPersonId) {
      setPeople((prev) =>
        prev.map((person) =>
          person.id === editingPersonId ? { ...personForm, id: person.id } : person,
        ),
      );
    } else {
      setPeople((prev) => [...prev, { ...personForm, id: createId() }]);
    }
    closePersonModal();
  }

  function handleRoleSubmit(event) {
    event.preventDefault();
    if (!roleForm.codigo.trim() || !roleForm.nome.trim()) return;

    if (editingRoleId) {
      setRoles((prev) => prev.map((role) => (role.id === editingRoleId ? { ...roleForm } : role)));
    } else {
      setRoles((prev) => [...prev, { ...roleForm, id: createId() }]);
    }
    closeRoleModal();
  }

  function handlePersonFieldChange(field, value) {
    const nextValue = field === "assuncao" ? formatDateBR(value) : value;
    setPersonForm((prev) => ({ ...prev, [field]: nextValue }));
  }

  function handleRoleFieldChange(field, value) {
    setRoleForm((prev) => ({ ...prev, [field]: value }));
  }

  function startEditPerson(person) {
    setPersonForm(person);
    setEditingPersonId(person.id);
    setIsPersonModalOpen(true);
  }

  function startEditRole(role) {
    setRoleForm(role);
    setEditingRoleId(role.id);
    const assigned = people.find((person) => person.id === role.pessoaId);
    setAssigneeQuery(assigned ? personLabel(assigned) : "");
    setIsRoleModalOpen(true);
  }

  function deletePerson(personId) {
    const person = people.find((entry) => entry.id === personId);
    if (!person) return;
    if (!window.confirm(`Remover ${person.nome || "esta pessoa"}?`)) return;

    setPeople((prev) => prev.filter((entry) => entry.id !== personId));
    setRoles((prev) =>
      prev.map((role) => (role.pessoaId === personId ? { ...role, pessoaId: "" } : role)),
    );
  }

  function deleteRole(roleId) {
    const role = roles.find((entry) => entry.id === roleId);
    if (!role) return;
    if (!window.confirm(`Remover o cargo ${role.nome || "selecionado"}?`)) return;
    setRoles((prev) => prev.filter((entry) => entry.id !== roleId));
  }

  function selectAssignee(person) {
    setRoleForm((prev) => ({ ...prev, pessoaId: person.id }));
    setAssigneeQuery(personLabel(person));
    setAssigneeOpen(false);
  }

  function handleAssigneeInput(value) {
    setAssigneeQuery(value);
    setRoleForm((prev) => ({ ...prev, pessoaId: "" }));
    if (!assigneeOpen) setAssigneeOpen(true);
  }

  function startNewPerson() {
    resetPersonForm();
    setIsPersonModalOpen(true);
  }

  function startNewRole() {
    resetRoleForm();
    setIsRoleModalOpen(true);
  }

  return (
    <AppShell>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      />
      <Tabs />

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
              onCreate={startNewPerson}
              onCloseForm={closePersonModal}
              onSubmit={handlePersonSubmit}
              onFieldChange={handlePersonFieldChange}
              onEdit={startEditPerson}
              onDelete={deletePerson}
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
              assignedLabel={assignedLabel}
              onCreate={startNewRole}
              onCloseForm={closeRoleModal}
              onSubmit={handleRoleSubmit}
              onFieldChange={handleRoleFieldChange}
              onEdit={startEditRole}
              onDelete={deleteRole}
              onAssigneeInput={handleAssigneeInput}
              onAssigneeFocus={() => setAssigneeOpen(true)}
              onAssigneeBlur={() => setTimeout(() => setAssigneeOpen(false), 120)}
              onAssigneeSelect={selectAssignee}
              getPersonLabel={personLabel}
            />
          }
        />
      </Routes>
    </AppShell>
  );
}

export default App;
