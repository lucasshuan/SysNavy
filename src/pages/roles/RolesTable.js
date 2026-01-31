import DataTable from "../../components/ui/DataTable";
import RowActions from "../../components/ui/RowActions";

export default function RolesTable({ roles, people, onEdit, onDelete }) {
  const peopleById = new Map(people.map((person) => [person.id, person]));
  const columns = [
    {
      header: "Código",
      accessor: "codigo",
      cellClassName: "py-3 pr-4 font-semibold",
      headerClassName: "py-2 pr-4",
    },
    {
      header: "Nome",
      accessor: "nome",
      cellClassName: "py-3 pr-4",
      headerClassName: "py-2 pr-4",
    },
    {
      header: "Posto",
      accessor: "posto",
      cellClassName: "py-3 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (role) => role.posto || "—",
    },
    {
      header: "Profissão",
      accessor: "profissao",
      cellClassName: "py-3 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (role) => role.profissao || "—",
    },
    {
      header: "NIP",
      accessor: "pessoaId",
      cellClassName: "py-3 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (role) => peopleById.get(role.pessoaId)?.nip || "—",
    },
    {
      header: "Pessoa",
      accessor: "pessoaId",
      cellClassName: "py-3 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (role) => peopleById.get(role.pessoaId)?.nome || "—",
    },
    {
      header: "Ações",
      headerClassName: "py-2 text-right",
      cellClassName: "py-3 text-right",
      render: (role) => (
        <RowActions
          onEdit={() => onEdit(role)}
          onDelete={() => onDelete(role.id)}
          editLabel="Editar cargo"
          deleteLabel="Excluir cargo"
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={roles} />;
}
