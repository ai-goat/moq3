"use client";

import { useState } from "react";

import { adminForms } from "@/admin/forms";

type SaveState = {
  kind: "idle" | "error" | "success";
  message: string;
};

export function AdminDashboard() {
  const [saveState, setSaveState] = useState<SaveState>({
    kind: "idle",
    message: "",
  });

  async function submitForm(
    event: React.FormEvent<HTMLFormElement>,
    action: string,
  ) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, FormDataEntryValue | null> = Object.fromEntries(
      formData.entries(),
    );

    if (payload.resultDate && typeof payload.resultDate === "string") {
      payload.resultDate = new Date(payload.resultDate).toISOString();
    }

    if (payload.updateDate && typeof payload.updateDate === "string") {
      payload.updateDate = new Date(payload.updateDate).toISOString();
    }

    if (payload.updateDate === "") {
      payload.updateDate = null;
    }

    const response = await fetch(action, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const data = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      setSaveState({
        kind: "error",
        message: data.error || "The request failed.",
      });
      return;
    }

    event.currentTarget.reset();
    setSaveState({
      kind: "success",
      message: data.message || "Saved successfully.",
    });
  }

  async function reindex() {
    const response = await fetch("/api/admin/reindex", { method: "POST" });
    const data = (await response.json()) as { message?: string; error?: string };
    setSaveState({
      kind: response.ok ? "success" : "error",
      message: data.message || data.error || "Index task finished.",
    });
  }

  return (
    <div className="grid gap-8">
      <div className="card rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Admin</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Content operations
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Writes are persisted through Prisma and trigger page revalidation.
              If PostgreSQL is not configured, the public site still runs in demo
              mode but write APIs will reject changes.
            </p>
          </div>
          <button
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={reindex}
            type="button"
          >
            Rebuild Search Index
          </button>
        </div>
        {saveState.kind !== "idle" ? (
          <p
            className={`mt-4 text-sm ${
              saveState.kind === "success" ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {saveState.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {adminForms.map((form) => (
          <form
            className="card rounded-[2rem] p-6"
            key={form.title}
            onSubmit={(event) => submitForm(event, form.action)}
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-950">{form.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {form.description}
              </p>
            </div>

            <div className="grid gap-4">
              {form.fields.map((field) => (
                <label className="grid gap-2" htmlFor={field.name} key={field.name}>
                  <span className="text-sm font-medium text-slate-700">
                    {field.label}
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      className="min-h-28 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-400"
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                    />
                  ) : (
                    <input
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-400"
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      step={field.type === "number" ? "any" : undefined}
                      type={field.type}
                    />
                  )}
                </label>
              ))}
            </div>

            <button
              className="mt-6 rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              type="submit"
            >
              Save
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
