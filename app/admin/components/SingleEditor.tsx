"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/admin/firebase";
import type { CollectionSchema } from "@/lib/admin/schemas";
import ItemForm from "./ItemForm";

/** One fixed set of details (siteContent/{id}), e.g. home counters or contact details */
export default function SingleEditor({ schema, user }: { schema: CollectionSchema; user: User }) {
  const [data, setData] = useState<DocumentData | null | undefined>(undefined);
  const [error, setError] = useState("");

  useEffect(() => onSnapshot(
    doc(db, "siteContent", schema.single!),
    (snap) => setData(snap.exists() ? snap.data() : null),
    () => setError("Couldn't load these details. Check your connection and admin access."),
  ), [schema.single]);

  return (
    <section className="mx-auto max-w-4xl rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
      {schema.intro && <p className="mb-2 text-sm text-slate-600">{schema.intro}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {data === undefined && !error && <p className="text-sm text-slate-500">Loading…</p>}
      {/* Remount once loaded so the form starts from the saved values */}
      {data !== undefined && (
        <ItemForm key={data ? "loaded" : "empty"} schema={schema} id={schema.single!} data={data ?? undefined} user={user} onSaved={() => {}} onDeleted={() => {}} />
      )}
    </section>
  );
}
