"use client";

import { useEffect } from "react";

/**
 * Typing "/admin" at the end of the address opens the admin portal from any page. The server
 * (proxy.ts) handles most addresses; this covers the ones it never sees: text typed after a
 * "#" (e.g. /contact#form/admin) stays in the browser, so it is caught here.
 */
export default function AdminShortcut() {
  useEffect(() => {
    const check = () => {
      if (/(^|\/)admin\/?$/i.test(window.location.hash.slice(1))) window.location.replace("/admin");
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);
  return null;
}
