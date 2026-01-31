import DataTable from "../../../components/ui/DataTable";
import RowActions from "../../../components/ui/RowActions";

function personLabel(person) {
  const nip = person?.nip ? person.nip.trim() : "Sem NIP";
  const nome = person?.nome ? person.nome.trim() : "Sem nome";
  return `${nip} — ${nome}`;
}

export default function RolesTable({ roles, people, onEdit, onDelete }) {
  const peopleById = new Map(people.map((person) => [person.id, person]));
  const columns = [
    {
      header: "Código",
      accessor: "codigo",
      cellClassName: "py-2.5 pr-4 font-semibold",
      headerClassName: "py-2 pr-4",
      key: "codigo",
    },
    {
      header: "Nome",
      accessor: "nome",
      cellClassName: "py-2.5 pr-4",
      headerClassName: "py-2 pr-4",
      key: "nome",
    },
    {
      header: "Posto",
      accessor: "posto",
      cellClassName: "py-2.5 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (role) => role.posto || "—",
      key: "posto",
    },
    {
      header: "Profissão",
      accessor: "profissao",
      cellClassName: "py-2.5 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (role) => role.profissao || "—",
      key: "profissao",
    },
    {
      header: "Pessoa atribuída",
      accessor: "pessoaId",
      cellClassName: "py-2.5 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (role) => {
        const assigned = peopleById.get(role.pessoaId);
        return assigned ? personLabel(assigned) : "—";
      },
      key: "pessoa",
    },
    {
      header: "Ações",
      headerClassName: "py-2 text-right",
      cellClassName: "py-2.5 text-right",
      render: (role) => (
        <RowActions
          onEdit={() => onEdit(role)}
          onDelete={() => onDelete(role.id)}
          editLabel="Editar cargo"
          deleteLabel="Excluir cargo"
        />
      ),
      key: "acoes",
    },
  ];

  return <DataTable columns={columns} data={roles} />;
}

