"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SearchItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  conductingBody: string;
  description: string;
};

export function SearchBox({
  initialQuery = "",
  placeholder = "Search SSC, UPSC, Railway, CBSE...",
  showPanel = true,
}: {
  initialQuery?: string;
  placeholder?: string;
  showPanel?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (!query.trim() || !showPanel) {
      setResults([]);
      return () => controller.abort();
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}`,
          {
            signal: controller.signal,
          },
        );
        const data = (await response.json()) as { items: SearchItem[] };
        setResults(data.items);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query, showPanel]);

  return (
    <div className="relative">
      <input
        className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 text-base text-slate-950 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        value={query}
      />
      {showPanel && (results.length > 0 || loading) ? (
        <div className="card absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 rounded-[1.5rem] p-3">
          {loading ? (
            <p className="px-3 py-2 text-sm text-slate-500">Searching...</p>
          ) : (
            <div className="grid gap-2">
              {results.map((item) => (
                <Link
                  className="rounded-2xl px-4 py-3 transition hover:bg-slate-50"
                  href={`/exam/${item.slug}`}
                  key={item.id}
                >
                  <p className="font-semibold text-slate-950">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.category} · {item.conductingBody}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
