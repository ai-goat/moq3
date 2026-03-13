import Link from "next/link";

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { SectionHeading } from "@/components/ui/section-heading";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loginAction, logoutAction } from "@/app/admin/actions";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authenticated = await isAdminAuthenticated();
  const { error } = await searchParams;

  return (
    <div className="shell py-14">
      <SectionHeading
        description="Secure internal workspace for content updates and manual search indexing."
        eyebrow="Admin"
        title="MOQ3 content dashboard"
      />

      {!authenticated ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form action={loginAction} className="card rounded-[2rem] p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Admin login</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Configure `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and
              `ADMIN_SESSION_SECRET` for production deployment.
            </p>
            {error ? (
              <p className="mt-4 text-sm text-rose-700">
                Invalid credentials. Try again.
              </p>
            ) : null}
            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Username</span>
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
                  name="username"
                  required
                  type="text"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
                  name="password"
                  required
                  type="password"
                />
              </label>
            </div>
            <button
              className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
              type="submit"
            >
              Sign in
            </button>
          </form>

          <div className="card rounded-[2rem] p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Operational notes</h2>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600">
              <p>Public pages work in demo mode without a database.</p>
              <p>Admin writes require PostgreSQL and Prisma migrations or `db push`.</p>
              <p>Search indexing becomes active when Meilisearch credentials are set.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-6">
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              href="/admin/high-volume-targets"
            >
              View 100 high-volume targets
            </Link>
          </div>
          <form action={logoutAction}>
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              type="submit"
            >
              Sign out
            </button>
          </form>
          <AdminDashboard />
        </div>
      )}
    </div>
  );
}
