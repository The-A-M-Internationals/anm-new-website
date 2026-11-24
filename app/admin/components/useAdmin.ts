"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/admin/firebase";

export type AdminState =
  | { status: "loading" }
  | { status: "signedOut" }
  | { status: "notAdmin"; email: string }
  | { status: "admin"; user: User };

/**
 * Signed-in user + whether they are an admin. An admin is a login whose email has a document in
 * the Firestore `admins` collection (document ID = the email in lower case).
 */
export function useAdmin() {
  const [state, setState] = useState<AdminState>({ status: "loading" });

  useEffect(() => onAuthStateChanged(auth, async (user) => {
    if (!user) { setState({ status: "signedOut" }); return; }
    const email = (user.email ?? "").toLowerCase();
    try {
      const snap = await getDoc(doc(db, "admins", email));
      setState(snap.exists() ? { status: "admin", user } : { status: "notAdmin", email });
    } catch {
      setState({ status: "notAdmin", email });
    }
  }), []);

  return { state, signOut: () => signOut(auth) };
}

/** Email a saved item (project, job, article or event) to every subscriber. Returns an error text, or "" when sent. */
export async function emailSubscribers(user: User, collection: string, id: string): Promise<string> {
  try {
    const token = await user.getIdToken();
    const res = await fetch("/api/notify-subscribers", {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ email: (user.email ?? "").toLowerCase(), collection, id }),
    });
    const out = await res.json().catch(() => ({}));
    return res.ok && out.ok ? "" : String(out.error || "The email could not be sent.");
  } catch {
    return "The email could not be sent. Check your connection.";
  }
}

/** Tell the live site to drop its content cache so a save shows up on the next visit */
export async function refreshLiveSite(user: User) {
  try {
    const token = await user.getIdToken();
    await fetch(`/api/revalidate?email=${encodeURIComponent((user.email ?? "").toLowerCase())}`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    });
  } catch {
    /* the site still refreshes on its own within a minute */
  }
}
