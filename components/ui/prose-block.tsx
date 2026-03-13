import { splitParagraphs } from "@/lib/utils";

export function ProseBlock({ body }: { body: string }) {
  return (
    <div className="prose-copy text-base leading-8 text-slate-600">
      {splitParagraphs(body).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
