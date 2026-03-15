import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24">
      <div className="card rounded-[2rem] p-10 text-center">
        <p className="eyebrow">404</p>
        <h1 className="display-title mt-4 text-5xl font-semibold text-slate-950">
          Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600">
          The requested page could not be resolved from the current exam data set.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            className="rounded-full btn-primary px-5 py-3 text-sm font-semibold"
            href="/"
          >
            Return home
          </Link>
          <Link
            className="rounded-full btn-secondary px-5 py-3 text-sm font-semibold"
            href="/exams"
          >
            Browse exams
          </Link>
        </div>
      </div>
    </div>
  );
}
