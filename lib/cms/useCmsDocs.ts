"use client";

import { useEffect, useState } from "react";
import { readCollection, type CmsDoc } from "./shared";

const EMPTY: CmsDoc[] = [];

/**
 * Documents for a client component. Uses what the server already loaded (`initial`); only if the
 * server could not read them does it fetch in the browser, like before.
 */
export function useCmsDocs(name: string, initial: CmsDoc[] | undefined) {
  const [fetched, setFetched] = useState<{ docs: CmsDoc[] | null; failed: boolean }>({ docs: null, failed: false });

  useEffect(() => {
    if (initial) return;
    let alive = true;
    readCollection(name)
      .then((docs) => { if (alive) setFetched({ docs, failed: false }); })
      .catch((err) => { console.error(`[cms] could not load "${name}"`, err); if (alive) setFetched({ docs: [], failed: true }); });
    return () => { alive = false; };
  }, [name, initial]);

  const docs = initial ?? fetched.docs;
  return { docs: docs ?? EMPTY, loading: docs === null, failed: !initial && fetched.failed };
}
