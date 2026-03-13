export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-title mt-3 text-4xl font-semibold text-slate-950">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
