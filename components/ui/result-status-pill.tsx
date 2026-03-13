import { cn } from "@/lib/utils";

const tones = {
  announced: "bg-emerald-100 text-emerald-700",
  expected: "bg-amber-100 text-amber-700",
  upcoming: "bg-sky-100 text-sky-700",
};

export function ResultStatusPill({
  status,
}: {
  status: "announced" | "expected" | "upcoming";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        tones[status],
      )}
    >
      {status}
    </span>
  );
}
