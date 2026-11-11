"use client";

import type { Field } from "@/lib/admin/schemas";
import type { Draft } from "@/lib/admin/saveItem";
import ImageUpload from "./ImageUpload";

const box = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-all duration-150 ease-in-out focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/25";

/** One input in the language given (dir controls typing direction) */
function Input({ field, value, onChange, dir }: { field: Field; value: unknown; onChange: (v: unknown) => void; dir: "ltr" | "rtl" }) {
  if (field.type === "textarea" || field.type === "markdown") {
    return <textarea dir={dir} rows={field.type === "markdown" ? 12 : 4} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={`${box} ${field.type === "markdown" ? "font-mono text-[13px]" : ""}`} />;
  }
  if (field.type === "tags") {
    const text = Array.isArray(value) ? value.join(", ") : String(value ?? "");
    return (
      <input dir={dir} value={text} className={box}
        onChange={(e) => onChange(e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
    );
  }
  return <input dir={dir} type={field.type === "link" ? "url" : "text"} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={box} />;
}

/** A labelled field: English + Arabic side by side when the field has an Arabic twin */
export default function FieldInput({ field, draft, set }: { field: Field; draft: Draft; set: (key: string, v: unknown) => void }) {
  const label = <span className="text-sm font-medium text-slate-700">{field.label}{field.required ? " *" : ""}</span>;
  const help = field.help && <span className="mt-1 block text-xs text-slate-400">{field.help}</span>;

  if (field.type === "bool") {
    return (
      <label className="flex cursor-pointer items-center gap-3">
        <input type="checkbox" checked={draft[field.key] === true} onChange={(e) => set(field.key, e.target.checked)} className="h-4 w-4 cursor-pointer accent-[#C9A84C]" />
        {label}
      </label>
    );
  }
  if (field.type === "image") {
    return (
      <div>
        {label}
        <ImageUpload value={String(draft[field.key] ?? "")} folder={field.folder ?? "misc"} onChange={(url) => set(field.key, url)} />
        {help}
      </div>
    );
  }
  return (
    <div>
      {label}
      <div className={`mt-1 grid gap-3 ${field.ar ? "md:grid-cols-2" : ""}`}>
        <div>
          {field.ar && <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">English</span>}
          <Input field={field} dir="ltr" value={draft[field.key]} onChange={(v) => set(field.key, v)} />
        </div>
        {field.ar && (
          <div>
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">العربية · Arabic</span>
            <Input field={field} dir="rtl" value={draft[field.ar]} onChange={(v) => set(field.ar!, v)} />
          </div>
        )}
      </div>
      {help}
    </div>
  );
}
