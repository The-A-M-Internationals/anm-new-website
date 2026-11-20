export type LogoItem = {
  id: string;
  /** Shown as text until a logo file is supplied */
  name: string;
  /** Path under /public, e.g. "/tbc-logo.png" */
  logo?: string;
};

// TBC is the only real logo so far. The rest are placeholders: add `name` and `logo` once the files are in /public
export const LOGOS: LogoItem[] = [
  { id: "tbc", name: "TBC Corporation", logo: "/tbc-logo.png" },
  ...Array.from({ length: 11 }, (_, i) => {
    const n = String(i + 2).padStart(2, "0");
    return { id: `logo-${n}`, name: `Logo ${n}` };
  }),
];

/** Logos saved in the admin portal (Home: Client logos). Entries without an uploaded logo are skipped. */
export function toLogos(docs: { id: string; data: Record<string, unknown> }[]): LogoItem[] {
  return docs.flatMap((d) => {
    const logo = typeof d.data.imageSrc === "string" ? d.data.imageSrc.trim() : "";
    const name = typeof d.data.name === "string" ? d.data.name.trim() : "";
    return /^https:\/\//.test(logo) ? [{ id: d.id, name: name || "Client logo", logo }] : [];
  });
}
