"use client";

import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where, type DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { CollectionSchema, Field } from "./schemas";
import { toEventFields } from "./eventDates";

export type Draft = Record<string, unknown>;
export type Dates = { start: string; end: string };

const empty = (f: Field) => (f.type === "bool" ? false : f.type === "tags" ? [] : "");

/** Existing document -> editable draft (Arabic read from the main key, else the legacy one) */
export function toDraft(schema: CollectionSchema, data: DocumentData = {}): Draft {
  const d: Draft = {};
  for (const f of schema.fields) {
    d[f.key] = data[f.key] ?? (f.alsoKey ? data[f.alsoKey] : undefined) ?? empty(f);
    if (f.ar) d[f.ar] = data[f.ar] ?? (f.alsoAr ? data[f.alsoAr] : undefined) ?? empty(f);
  }
  return d;
}

/** Fields that must be filled; returns the labels that are missing */
export function missing(schema: CollectionSchema, draft: Draft, dates: Dates) {
  const out = schema.fields.filter((f) => f.required && !String(draft[f.key] ?? "").trim()).map((f) => f.label);
  if (schema.eventDates && !dates.start) out.unshift("Start date");
  return out;
}

/** Draft -> Firestore payload, writing every key the site reads (incl. legacy duplicates) */
function toPayload(schema: CollectionSchema, draft: Draft, dates: Dates): DocumentData {
  const p: DocumentData = {};
  const clean = (v: unknown) => (typeof v === "string" ? v.trim() : v);
  for (const f of schema.fields) {
    p[f.key] = clean(draft[f.key] ?? empty(f));
    if (f.alsoKey) p[f.alsoKey] = p[f.key];
    if (f.ar) {
      p[f.ar] = clean(draft[f.ar] ?? empty(f));
      if (f.alsoAr) p[f.alsoAr] = p[f.ar];
    }
  }
  if (schema.eventDates) Object.assign(p, toEventFields(dates.start, dates.end));
  return p;
}

/** Create or update; returns the document id */
export async function saveItem(schema: CollectionSchema, id: string | null, draft: Draft, dates: Dates) {
  const payload = toPayload(schema, draft, dates);
  let savedId = id;
  if (id) await updateDoc(doc(db, schema.id, id), { ...payload, updatedAt: serverTimestamp() });
  else savedId = (await addDoc(collection(db, schema.id), { ...payload, createdAt: serverTimestamp() })).id;

  // Only one featured article at a time (the Blogs page shows the first one it finds)
  if (schema.id === "articles" && payload.featureArticle === true) {
    const others = await getDocs(query(collection(db, "articles"), where("featureArticle", "==", true)));
    await Promise.all(others.docs.filter((d) => d.id !== savedId).map((d) => updateDoc(d.ref, { featureArticle: false })));
  }
  return savedId as string;
}

export const removeItem = (schema: CollectionSchema, id: string) => deleteDoc(doc(db, schema.id, id));
