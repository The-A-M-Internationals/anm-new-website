import type { DocumentData } from "firebase/firestore";
import { SITE_URL } from "@/lib/site";
import type { NewsEmail } from "./newsEmail";

/**
 * Turns something published in the admin portal into the email subscribers receive.
 * Only these four kinds can be emailed; the keys are the Firestore collection names.
 */
export const NOTIFIABLE = ["ourWork", "jobs", "articles", "events"] as const;
export type Notifiable = (typeof NOTIFIABLE)[number];
export const isNotifiable = (v: unknown): v is Notifiable => NOTIFIABLE.includes(v as Notifiable);

const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
/** Markdown / long text -> one plain paragraph of at most `max` characters */
const plain = (v: unknown, max = 260) => {
  const t = s(v).replace(/[#*_`>]+/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/^\s*[-•]\s+/gm, "").replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : t;
};
/** A site path or a full link -> an absolute link */
const abs = (v: unknown, fallback: string) => {
  const link = s(v);
  if (/^https:\/\//.test(link)) return link;
  return SITE_URL + (link.startsWith("/") ? link : fallback);
};
const pairs = (rows: [string, unknown][]) => rows.filter(([, v]) => s(v)).map(([a, v]) => [a, s(v)] as [string, string]);

export function toNewsEmail(kind: Notifiable, id: string, d: DocumentData): { subject: string; email: NewsEmail } {
  const title = s(d.title) || "News from The A&M Internationals";
  const image = s(d.imageSrc) || s(d.imageUrl) || undefined;
  switch (kind) {
    case "ourWork":
      return { subject: `New project: ${title}`, email: {
        kicker: "New project", title, image, tags: [s(d.industry), s(d.badge)],
        lead: [plain(d.description).replace(/([^.!?…])$/, "$1."), s(d.client) && `Client: ${s(d.client)}.`].filter(Boolean).join(" "),
        cta: "Read the story", link: abs(d.storyLink, "/success-stories"),
      } };
    case "jobs":
      return { subject: `We're hiring: ${title}`, email: {
        kicker: "New opening", title, lead: plain(d.description),
        facts: pairs([["Department", d.department], ["Location", d.location], ["Type", d.type]]),
        cta: "View the role and apply", link: `${SITE_URL}/careers/${encodeURIComponent(id)}`,
      } };
    case "articles":
      return { subject: `New article: ${title}`, email: {
        kicker: "New article", title, image, small: s(d.readTime) || undefined, lead: plain(d.description),
        cta: "Read the article", link: s(d.body) ? `${SITE_URL}/blogs/${encodeURIComponent(id)}` : abs(d.externalLink, "/blogs"),
      } };
    case "events":
      return { subject: `Upcoming event: ${title}`, email: {
        kicker: "Upcoming event", title, image, lead: plain(d.description),
        date: s(d.dateRange) ? [s(d.dateRange).replace(/\s*-\s*/, "–"), s(d.month).replace(/,\s*/, " 20"), s(d.location)] : undefined,
        facts: image ? pairs([["When", [s(d.dateRange), s(d.month)].filter(Boolean).join(" ")], ["Where", d.location], ["Hours", d.timeRange]]) : pairs([["Hours", d.timeRange]]),
        cta: "See event details", link: `${SITE_URL}/events`,
      } };
  }
}

/** The email a new subscriber gets straight away */
export const welcomeEmail = (): NewsEmail => ({
  kicker: "Welcome", title: "Thank you for subscribing",
  lead: "From now on you'll hear from us when there is something worth your time: a project we've delivered, a new opening on the team, an article, or an event we're part of.",
  list: [["New projects", "Work we've delivered for our clients."], ["Openings", "Roles on our team, as soon as they open."], ["Articles", "What we're learning in Oracle EPM and AI."], ["Events", "Where you can meet us."]],
  cta: "Visit our website", link: SITE_URL,
});
