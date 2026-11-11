"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, type DocumentData } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/admin/firebase";
import type { CollectionSchema } from "@/lib/admin/schemas";
import { fromEventFields } from "@/lib/admin/eventDates";
import ItemForm from "./ItemForm";

type Item = { id: string; data: DocumentData };

/** Sort key: events by date, articles by newest, jobs by title */
function sortKey(schema: CollectionSchema, d: DocumentData) {
  if (schema.eventDates) return fromEventFields(d.dateRange, d.month, d.startDate, d.endDate).start || "0";
  if (schema.id === "articles") return String(d.createdAt?.seconds ?? 0).padStart(12, "0");
  return "";
}

/** One editable collection: live list on the left, editor on the right ("new" = blank form) */
export default function CollectionEditor({ schema, user }: { schema: CollectionSchema; user: User }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | "new" | null>(null);
  // "Published" message survives the form reloading as the newly created item
  const [notice, setNotice] = useState("");
  const pick = (id: string | "new" | null) => { setNotice(""); setSelected(id); };

  useEffect(() => onSnapshot(
    collection(db, schema.id),
    (snap) => setItems(snap.docs.map((d) => ({ id: d.id, data: d.data() }))),
    () => setError("Couldn't load this list. Check your connection and admin access."),
  ), [schema.id]);

  const sorted = useMemo(() => {
    if (!items) return [];
    const list = [...items];
    if (schema.id === "jobs") return list.sort((a, b) => String(a.data.title ?? "").localeCompare(String(b.data.title ?? "")));
    return list.sort((a, b) => sortKey(schema, b.data).localeCompare(sortKey(schema, a.data)));
  }, [items, schema]);

  const current = selected && selected !== "new" ? items?.find((i) => i.id === selected) : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">{schema.title}</h2>
          <button onClick={() => pick("new")} className="cursor-pointer rounded-lg bg-[#C9A84C] px-3 py-1.5 text-sm font-bold text-[#050E30] transition-all duration-150 ease-in-out hover:bg-[#E3C973]">
            + New {schema.singular}
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {!items && !error && <p className="mt-4 text-sm text-slate-500">Loading…</p>}
        {items && sorted.length === 0 && <p className="mt-4 text-sm text-slate-500">Nothing yet. Click + New {schema.singular}.</p>}
        <ul className="mt-3 space-y-1">
          {sorted.map((it) => (
            <li key={it.id}>
              <button
                onClick={() => pick(it.id)}
                className={`w-full cursor-pointer rounded-lg px-3 py-2 text-start text-sm transition-all duration-150 ease-in-out ${selected === it.id ? "bg-[#050E30] text-white" : "hover:bg-slate-100"}`}
              >
                <span className="block truncate font-medium">{String(it.data[schema.nameKey] || "(untitled)")}</span>
                {schema.eventDates && <span className={`block text-xs ${selected === it.id ? "text-white/60" : "text-slate-400"}`}>{it.data.dateRange} · {it.data.month}</span>}
                {schema.id === "articles" && it.data.featureArticle === true && <span className="text-xs text-[#C9A84C]">★ Featured</span>}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
        {selected ? (
          <ItemForm
            key={selected}
            schema={schema}
            id={selected === "new" ? null : selected}
            data={current?.data}
            user={user}
            notice={notice}
            onSaved={(id) => { setNotice("Published. It's live on the website."); setSelected(id); }}
            onDeleted={() => pick(null)}
          />
        ) : (
          <p className="py-16 text-center text-sm text-slate-500">Pick a {schema.singular} on the left to edit it, or add a new one.</p>
        )}
      </section>
    </div>
  );
}
