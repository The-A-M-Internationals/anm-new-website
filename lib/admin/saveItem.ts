"use client";

import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, type DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import { collectionOf, type CollectionSchema, type Field } from "./schemas";
import { toEventFields } from "./eventDates";
import { loadSeed, mergeSeed, REMOVED } from "../cms/seed";

export type Draft = Record<string, unknown>;
export type Dates = { start: string; end: string };

const empty = (f: Field) => (f.type === "bool" ? false : f.type === "tags" ? [] : "");

/** Existing document -> editable draft (Arabic read from the main key, else the legacy one) */
export function toDraft(schema: CollectionSchema, data: DocumentData = {}): Draft {
  const d: Draft = {};
  for (const f of schema.fields) {
    d[f.key] = data[f.key] ?? (f.alsoKey ? data[f.alsoKey] : undefined) ?? empty(f);
    if (f.type === "number") d[f.key] = d[f.key] === null ? "" : String(d[f.key]);
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
    if (f.type === "number") {
      // Empty box = no number (the site keeps its current one)
      const n = Number(String(draft[f.key] ?? "").trim());
      p[f.key] = String(draft[f.key] ?? "").trim() === "" || !Number.isFinite(n) ? null : n;
      continue;
    }
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
  if (schema.single) {
    await setDoc(doc(db, "siteContent", schema.single), { ...payload, updatedAt: serverTimestamp() }, { merge: true });
    return schema.single;
  }
  const seed = await loadSeed(schema.id);
  let savedId = id;
  // A built-in item is not in the database until its first save, so it is written whole (never updateDoc)
  if (id) await setDoc(doc(db, schema.id, id), { ...seed.find((s) => s.id === id)?.data, ...payload, updatedAt: serverTimestamp() }, { merge: true });
  else savedId = (await addDoc(collection(db, schema.id), { ...payload, createdAt: serverTimestamp() })).id;

  // Only one featured article at a time (the Blogs page shows the first one it finds)
  if (schema.id === "articles" && payload.featureArticle === true) {
    const saved = await getDocs(collection(db, "articles"));
    const all = mergeSeed(seed, saved.docs.map((d) => ({ id: d.id, data: d.data() })));
    await Promise.all(all.filter((a) => a.id !== savedId && a.data.featureArticle === true)
      .map((a) => setDoc(doc(db, "articles", a.id), { ...a.data, featureArticle: false }, { merge: true })));
  }
  return savedId as string;
}

/** A built-in item cannot be deleted from the site's code, so it is marked removed instead */
export async function removeItem(schema: CollectionSchema, id: string) {
  const ref = doc(db, collectionOf(schema), id);
  const builtIn = !schema.single && (await loadSeed(schema.id)).some((s) => s.id === id);
  return builtIn ? setDoc(ref, { [REMOVED]: true }) : deleteDoc(ref);
}
