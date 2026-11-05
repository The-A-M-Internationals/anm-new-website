export type ShowcaseStat = { num: string; label: string };

export type ShowcaseService = {
  id: "epm" | "ai";
  href: string;
  eyebrow: string;
  title: string;
  desc: string;
  list: string[];
  stats: ShowcaseStat[];
  tags: string[];
  explore: string;
  /** Optional still image shown before live media mounts (step 2) */
  poster?: string;
};
