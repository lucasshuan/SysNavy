export default function DataTable({ columns, data, rowKey = "id" }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key || column.header || index}
                className={column.headerClassName || "py-2 pr-4"}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.map((row) => {
            const key = typeof rowKey === "function" ? rowKey(row) : row[rowKey];
            return (
              <tr key={key} className="text-slate-700 dark:text-slate-200">
                {columns.map((column, index) => (
                  <td
                    key={column.key || column.header || index}
                    className={column.cellClassName || "py-3 pr-4"}
                  >
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
