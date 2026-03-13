import Link from "next/link";

import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
            M3
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Result Intelligence
            </p>
            <p className="text-base font-semibold text-slate-950">{SITE_NAME}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className="transition hover:text-slate-950"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
