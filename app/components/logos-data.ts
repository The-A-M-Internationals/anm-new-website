export type LogoItem = {
  id: string;
  /** Shown as text until a logo file is supplied */
  name: string;
  /** Path under /public, e.g. "/tbc-logo.png" */
  logo?: string;
};

// Built-in list, used only when no logos are saved in the admin portal. Real logos only.
export const LOGOS: LogoItem[] = [{ id: "tbc", name: "TBC Corporation", logo: "/tbc-logo.png" }];

/** Fewer logos than this sit still and centred; from this many on they glide as one looping line. */
export const GLIDE_FROM = 6;

/** Logos saved in the admin portal (Home: Client logos). Entries without an uploaded logo are skipped. */
export function toLogos(docs: { id: string; data: Record<string, unknown> }[]): LogoItem[] {
  return docs.flatMap((d) => {
    const logo = typeof d.data.imageSrc === "string" ? d.data.imageSrc.trim() : "";
    const name = typeof d.data.name === "string" ? d.data.name.trim() : "";
    return /^https:\/\//.test(logo) ? [{ id: d.id, name: name || "Client logo", logo }] : [];
  });
}
