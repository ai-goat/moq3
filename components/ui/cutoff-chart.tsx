export function CutoffChart({
  data,
  label,
}: {
  data: Array<{ year: number; value: number }>;
  label: string;
}) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="card rounded-[2rem] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="eyebrow">Trend</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{label}</h3>
        </div>
        <p className="text-sm text-slate-500">Historical comparison</p>
      </div>
      <div className="grid gap-4">
        {data.map((item) => (
          <div className="grid gap-2 md:grid-cols-[80px_1fr_70px]" key={item.year}>
            <span className="text-sm font-medium text-slate-500">{item.year}</span>
            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-teal-600 to-sky-500"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="text-right text-sm font-semibold text-slate-950">
              {item.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
