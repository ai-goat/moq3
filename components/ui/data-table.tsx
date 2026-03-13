export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<string | number>>;
}) {
  return (
    <div className="card overflow-hidden rounded-[2rem]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              {columns.map((column) => (
                <th className="px-5 py-4 font-semibold" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rowIndex) => (
              <tr className="bg-white/80" key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td className="px-5 py-4 text-slate-700" key={cellIndex}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
