import { collection, doc, getDoc, getDocs, Timestamp, type DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { loadSeed, mergeSeed, REMOVED } from "./seed";

/** One Firestore document as plain JSON, so it can travel from the server into client components */
export type CmsDoc = { id: string; data: DocumentData };

/** Firestore values -> plain JSON. Timestamps keep their { seconds, nanoseconds } shape. */
function toPlain(v: unknown): unknown {
  if (v instanceof Timestamp) return { seconds: v.seconds, nanoseconds: v.nanoseconds };
  if (Array.isArray(v)) return v.map(toPlain);
  if (v && typeof v === "object") {
    if (Object.getPrototypeOf(v) !== Object.prototype) return "path" in v ? String(v.path) : null;
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, toPlain(x)]));
  }
  return v;
}

/** Saved documents over the built-in ones. If the database cannot be reached, the built-in ones alone. */
export async function readCollection(name: string): Promise<CmsDoc[]> {
  const seed = await loadSeed(name);
  try {
    const snap = await getDocs(collection(db, name));
    return mergeSeed(seed, snap.docs.map((d) => ({ id: d.id, data: toPlain(d.data()) as DocumentData })));
  } catch (err) {
    if (!seed.length) throw err;
    console.error(`[cms] could not read "${name}", showing the built-in content`, err);
    return seed;
  }
}

/** null when the document does not exist (or was removed in the admin portal) */
export async function readEntry(name: string, id: string): Promise<CmsDoc | null> {
  const builtIn = (await loadSeed(name)).find((d) => d.id === id) ?? null;
  try {
    const snap = await getDoc(doc(db, name, id));
    if (!snap.exists()) return builtIn;
    const data = toPlain(snap.data()) as DocumentData;
    return data[REMOVED] === true ? null : { id: snap.id, data };
  } catch (err) {
    if (!builtIn) throw err;
    console.error(`[cms] could not read "${name}/${id}", showing the built-in content`, err);
    return builtIn;
  }
}

/** Same shape the components used from getDocs(), so their mapping code stays unchanged */
export const asSnapshot = (docs: CmsDoc[]) => ({ docs: docs.map((d) => ({ id: d.id, data: () => d.data })) });
