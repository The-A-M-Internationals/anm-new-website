import type { CmsDoc } from "./shared";

/**
 * Content built into the site (events, articles, jobs, our work, founders, team), so the pages are
 * never empty while the database is. Anything saved in the admin portal wins over the built-in item
 * with the same id; a built-in item deleted there is kept in the database as `{ _removed: true }`.
 */
export const REMOVED = "_removed";

/** Loaded on demand so the content does not sit in every page's script */
export async function loadSeed(name: string): Promise<CmsDoc[]> {
  const all = (await import("./seedData.json")).default as unknown as Record<string, CmsDoc[]>;
  return all[name] ?? [];
}

/** Built-in items overlaid with the saved ones, minus the removed */
export function mergeSeed(seed: CmsDoc[], saved: CmsDoc[]): CmsDoc[] {
  const byId = new Map(seed.map((d) => [d.id, d]));
  for (const d of saved) byId.set(d.id, d);
  return [...byId.values()].filter((d) => d.data[REMOVED] !== true);
}
