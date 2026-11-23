"use client";

import { useSyncExternalStore } from "react";
import type { User } from "firebase/auth";

/**
 * Test mode: look around the portal without a login. Offered only when the site is opened on
 * this computer (localhost), in the dev server or a local production build; the live website's
 * address never matches, so visitors are never offered it.
 * It only opens the screens: the database still decides who may save (firestore.rules).
 */
const KEY = "anm-admin-test";
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };

export const canUseTestMode = () =>
  typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);

const isActive = () => {
  if (!canUseTestMode()) return false;
  try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
};

export function enterTestMode() { try { sessionStorage.setItem(KEY, "1"); } catch {} notify(); }
export function exitTestMode() { try { sessionStorage.removeItem(KEY); } catch {} notify(); }

/** Server render = false, so the page HTML always matches */
export const useTestModeAvailable = () => useSyncExternalStore(subscribe, canUseTestMode, () => false);
export const useTestModeActive = () => useSyncExternalStore(subscribe, isActive, () => false);

/** Stand-in user for test mode (no login token) */
export const TEST_USER = { email: "test-mode@localhost", getIdToken: async () => "" } as unknown as User;
