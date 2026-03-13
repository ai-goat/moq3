export function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="card rounded-[2rem] p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p>
      {detail ? <p className="mt-3 text-sm text-slate-500">{detail}</p> : null}
    </div>
  );
}
