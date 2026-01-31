import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Rows2,
  Rows3,
  Rows4,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function DataTable({
  columns,
  data,
  rowKey = "id",
  searchKeys = [],
  searchPlaceholder = "Buscar",
  searchFn,
  toolbar,
  tableId,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  emptyMessage = "Sem registros.",
  emptySearchMessage = "Nenhum resultado encontrado.",
}) {
  const [query, setQuery] = useState("");
  const densityStorageKey = tableId ? `sysnavy_density_${tableId}` : null;
  const [density, setDensity] = useState(() => {
    if (!densityStorageKey || typeof window === "undefined") return "md";
    const stored = window.localStorage.getItem(densityStorageKey);
    return stored === "sm" || stored === "md" || stored === "lg" ? stored : "md";
  });
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(1);

  const searchable = searchKeys.length > 0 || typeof searchFn === "function";

  const filteredData = useMemo(() => {
    if (!searchable || !query.trim()) return data;
    const needle = query.trim().toLowerCase();
    if (typeof searchFn === "function") {
      return data.filter((row) => searchFn(row, needle));
    }
    return data.filter((row) =>
      searchKeys.some((key) => String(row?.[key] ?? "").toLowerCase().includes(needle)),
    );
  }, [data, query, searchFn, searchKeys, searchable]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pagedData = filteredData.slice(pageStart, pageEnd);

  useEffect(() => {
    setPage(1);
  }, [query, pageSize, data.length]);

  const densityStyles = {
    sm: {
      cell: "py-1.5",
    },
    md: {
      cell: "py-2.5",
    },
    lg: {
      cell: "py-3.5",
    },
  };

  const currentDensity = densityStyles[density] || densityStyles.md;

  useEffect(() => {
    if (!densityStorageKey || typeof window === "undefined") return;
    window.localStorage.setItem(densityStorageKey, density);
  }, [density, densityStorageKey]);

  return (
    <div
      className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"
      data-density={density}
    >
      {(searchable || toolbar) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {toolbar ? <div className="flex items-center gap-2">{toolbar}</div> : <span />}
          <div className="flex items-center gap-2">
            {searchable ? (
              <div className="relative w-full max-w-[180px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white/80 pl-9 pr-3 text-xs text-slate-700 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200"
                />
              </div>
            ) : null}
            <div className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white/80 p-1 text-slate-600 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200">
              <button
                type="button"
                onClick={() => setDensity("sm")}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  density === "sm" ? "bg-slate-200 dark:bg-slate-800" : ""
                }`}
                aria-label="Densidade compacta"
                title="Densidade compacta"
              >
                <Rows2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDensity("md")}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  density === "md" ? "bg-slate-200 dark:bg-slate-800" : ""
                }`}
                aria-label="Densidade padr\u00e3o"
                title="Densidade padr\u00e3o"
              >
                <Rows3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDensity("lg")}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  density === "lg" ? "bg-slate-200 dark:bg-slate-800" : ""
                }`}
                aria-label="Densidade confort\u00e1vel"
                title="Densidade confort\u00e1vel"
              >
                <Rows4 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs">
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
            {pagedData.length === 0 ? (
              <tr className="text-slate-500 dark:text-slate-400">
                <td className="py-4" colSpan={columns.length}>
                  {query.trim() ? emptySearchMessage : emptyMessage}
                </td>
              </tr>
            ) : (
              pagedData.map((row) => {
                const key = typeof rowKey === "function" ? rowKey(row) : row[rowKey];
                return (
                  <tr key={key} className="text-slate-700 dark:text-slate-200">
                    {columns.map((column, index) => (
                      <td
                        key={column.key || column.header || index}
                        className={`${column.cellClassName || "pr-4"} ${currentDensity.cell}`}
                      >
                        {column.render ? column.render(row) : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>
          <select
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
            className="rounded-md border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-700 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage(1)}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
            aria-label="Primeira p\u00e1gina"
            title="Primeira p\u00e1gina"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
            aria-label="P\u00e1gina anterior"
            title="P\u00e1gina anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
            aria-label="Pr\u00f3xima p\u00e1gina"
            title="Pr\u00f3xima p\u00e1gina"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage(totalPages)}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
            aria-label="\u00daltima p\u00e1gina"
            title="\u00daltima p\u00e1gina"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
