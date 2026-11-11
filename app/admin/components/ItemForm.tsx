"use client";

import { useState } from "react";
import type { DocumentData } from "firebase/firestore";
import type { User } from "firebase/auth";
import type { CollectionSchema } from "@/lib/admin/schemas";
import { fromEventFields } from "@/lib/admin/eventDates";
import { missing, removeItem, saveItem, toDraft, type Dates } from "@/lib/admin/saveItem";
import { refreshLiveSite } from "./useAdmin";
import FieldInput from "./FieldInput";

type Props = {
  schema: CollectionSchema; id: string | null; data?: DocumentData; user: User;
  onSaved: (id: string) => void; onDeleted: () => void; notice?: string;
};

/** Edit form for one item. English and Arabic sit side by side; Save publishes to the live site. */
export default function ItemForm({ schema, id, data, user, onSaved, onDeleted, notice }: Props) {
  const [draft, setDraft] = useState(() => toDraft(schema, data));
  const [dates, setDates] = useState<Dates>(() => fromEventFields(data?.dateRange, data?.month, data?.startDate, data?.endDate));
  const [status, setStatus] = useState<{ kind: "ok" | "error" | "busy"; text: string } | null>(notice ? { kind: "ok", text: notice } : null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (key: string, v: unknown) => { setDraft((d) => ({ ...d, [key]: v })); setStatus(null); };

  const save = async () => {
    const gaps = missing(schema, draft, dates);
    if (gaps.length) { setStatus({ kind: "error", text: `Please fill in: ${gaps.join(", ")}` }); return; }
    if (schema.eventDates && dates.end && dates.end < dates.start) { setStatus({ kind: "error", text: "End date is before the start date." }); return; }
    setStatus({ kind: "busy", text: "Saving…" });
    try {
      const saved = await saveItem(schema, id, draft, dates);
      await refreshLiveSite(user);
      setStatus({ kind: "ok", text: "Saved. It's live on the website." });
      if (!id) onSaved(saved);
    } catch {
      setStatus({ kind: "error", text: "Couldn't save. Check your connection and try again." });
    }
  };

  const remove = async () => {
    if (!id) return;
    setStatus({ kind: "busy", text: "Deleting…" });
    try { await removeItem(schema, id); await refreshLiveSite(user); onDeleted(); }
    catch { setStatus({ kind: "error", text: "Couldn't delete. Try again." }); }
  };

  const dateInput = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-all duration-150 ease-in-out focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/25";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-[#050E30]">{id ? `Edit ${schema.singular}` : `New ${schema.singular}`}</h2>
        <span className="hidden text-xs text-slate-400 sm:inline">English on the left · Arabic on the right</span>
      </div>

      {schema.eventDates && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">Start date *
            <input type="date" value={dates.start} onChange={(e) => setDates((d) => ({ start: e.target.value, end: d.end && d.end >= e.target.value ? d.end : e.target.value }))} className={dateInput} />
          </label>
          <label className="block text-sm font-medium text-slate-700">End date
            <input type="date" value={dates.end} min={dates.start} onChange={(e) => setDates((d) => ({ ...d, end: e.target.value }))} className={dateInput} />
          </label>
        </div>
      )}

      <div className="mt-5 space-y-5">
        {schema.fields.map((f) => <FieldInput key={f.key} field={f} draft={draft} set={set} />)}
      </div>

      <div className="sticky bottom-0 mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 bg-white pt-4">
        <button onClick={save} disabled={status?.kind === "busy"} className="cursor-pointer rounded-lg bg-[#050E30] px-6 py-2.5 text-sm font-bold text-white transition-all duration-150 ease-in-out hover:bg-[#0B1E4F] disabled:opacity-60">
          {id ? "Save changes" : `Publish ${schema.singular}`}
        </button>
        {status && <p className={`text-sm ${status.kind === "error" ? "text-red-600" : status.kind === "ok" ? "text-emerald-700" : "text-slate-500"}`}>{status.text}</p>}
        {id && (
          <div className="ms-auto flex items-center gap-2">
            {confirmDelete && <span className="text-sm text-slate-600">Delete for good?</span>}
            <button onClick={() => (confirmDelete ? remove() : setConfirmDelete(true))} className="cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-150 ease-in-out hover:bg-red-50">
              {confirmDelete ? "Yes, delete" : "Delete"}
            </button>
            {confirmDelete && <button onClick={() => setConfirmDelete(false)} className="cursor-pointer px-2 text-sm text-slate-500 hover:text-slate-800">Cancel</button>}
          </div>
        )}
      </div>
    </div>
  );
}
