import DataTable from "../../components/ui/DataTable";
import RowActions from "../../components/ui/RowActions";

export default function PeopleTable({ people, onEdit, onDelete }) {
  const columns = [
    {
      header: "NIP",
      accessor: "nip",
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
      header: "Documento",
      accessor: "documento",
      cellClassName: "py-3 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (person) => person.documento || "—",
    },
    {
      header: "Assunção",
      accessor: "assuncao",
      cellClassName: "py-3 pr-4 text-slate-500 dark:text-slate-400",
      headerClassName: "py-2 pr-4",
      render: (person) => person.assuncao || "—",
    },
    {
      header: "Ações",
      headerClassName: "py-2 text-right",
      cellClassName: "py-3 text-right",
      render: (person) => (
        <RowActions
          onEdit={() => onEdit(person)}
          onDelete={() => onDelete(person.id)}
          editLabel="Editar pessoa"
          deleteLabel="Excluir pessoa"
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={people} />;
}
