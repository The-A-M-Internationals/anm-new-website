import { collection, doc, getDoc, getDocs, Timestamp, type DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

export async function readCollection(name: string): Promise<CmsDoc[]> {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map((d) => ({ id: d.id, data: toPlain(d.data()) as DocumentData }));
}

/** null when the document does not exist */
export async function readEntry(name: string, id: string): Promise<CmsDoc | null> {
  const snap = await getDoc(doc(db, name, id));
  return snap.exists() ? { id: snap.id, data: toPlain(snap.data()) as DocumentData } : null;
}

/** Same shape the components used from getDocs(), so their mapping code stays unchanged */
export const asSnapshot = (docs: CmsDoc[]) => ({ docs: docs.map((d) => ({ id: d.id, data: () => d.data })) });
