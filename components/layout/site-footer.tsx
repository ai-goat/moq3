import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70">
      <div className="shell flex flex-col gap-4 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-950">MOQ3</p>
          <p>SEO-first result intelligence for high-volume exam pages.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/sitemap.xml">Sitemap</Link>
          <Link href="/robots.txt">Robots</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
