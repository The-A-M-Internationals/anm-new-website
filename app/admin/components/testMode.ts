"use client";

import { useSyncExternalStore } from "react";
import type { User } from "firebase/auth";

/**
 * Test mode: use the portal before Firebase logins exist. Only on this computer while running
 * `npm run dev` (development build + localhost); a production build never offers it.
 * Changes still go to the REAL Firebase database.
 */
const KEY = "anm-admin-test";
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };

export const canUseTestMode = () =>
  process.env.NODE_ENV === "development" &&
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
