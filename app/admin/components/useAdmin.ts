"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/admin/firebase";
import { exitTestMode, TEST_USER, useTestModeActive } from "./testMode";

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

  const testMode = useTestModeActive();
  if (testMode) return { state: { status: "admin", user: TEST_USER } as AdminState, signOut: exitTestMode, testMode };
  return { state, signOut: () => signOut(auth), testMode };
}

/** Tell the live site to drop its content cache so a save shows up on the next visit */
export async function refreshLiveSite(user: User) {
  try {
    const token = await user.getIdToken();
    await fetch(`/api/revalidate?email=${encodeURIComponent((user.email ?? "").toLowerCase())}`, {
      method: "POST",
      headers: token ? { authorization: `Bearer ${token}` } : {},   // test mode has no token
    });
  } catch {
    /* the site still refreshes on its own within a minute */
  }
}
