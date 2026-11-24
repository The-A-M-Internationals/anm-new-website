import { unstable_cache } from "next/cache";
import { readCollection, readEntry, type CmsDoc } from "./shared";

/**
 * Server-side reads of the Firebase content (events, articles, jobs), so pages arrive with their
 * posts already in the HTML: no "Loading…" and Google can read them.
 * Cached for 60 seconds: a post added in Firebase shows on the site within a minute.
 * On failure these return `undefined` and the component falls back to loading in the browser.
 */
export const CMS_REVALIDATE = 60;

const cachedCollection = unstable_cache(readCollection, ["cms-collection"], { revalidate: CMS_REVALIDATE, tags: ["cms"] });
const cachedEntry = unstable_cache(readEntry, ["cms-entry"], { revalidate: CMS_REVALIDATE, tags: ["cms"] });

export async function getCollection(name: string): Promise<CmsDoc[] | undefined> {
  try {
    return await cachedCollection(name);
  } catch (err) {
    console.error(`[cms] could not read "${name}" on the server`, err);
    return undefined;
  }
}

/** null = no such document; undefined = could not read it */
export async function getEntry(name: string, id: string): Promise<CmsDoc | null | undefined> {
  try {
    return await cachedEntry(name, id);
  } catch (err) {
    console.error(`[cms] could not read "${name}/${id}" on the server`, err);
    return undefined;
  }
}
