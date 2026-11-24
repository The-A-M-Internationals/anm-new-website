import { SITE_URL } from "@/lib/site";
import { esc } from "./guard";

/**
 * The one email design used for everything subscribers receive (welcome, new project, new opening,
 * new article, event). Table layout with inline styles, which is what email programs need.
 * Every text value is escaped here, so callers pass plain text.
 */
export type NewsEmail = {
  kicker: string;                       // small gold label in the header, e.g. "New opening"
  title: string;
  lead: string;
  cta: string;
  link: string;
  image?: string;                       // absolute https URL
  tags?: string[];
  small?: string;                       // one quiet line under the title, e.g. "5 min read"
  facts?: [string, string][];           // label / value rows
  list?: [string, string][];            // bold lead-in / sentence rows
  date?: [string, string, string];      // big day(s), month, place: shown when there is no photo
  /** Footer link. Broadcasts pass Resend's unsubscribe placeholder; one-off emails leave it out. */
  unsubscribe?: string;
};

const NAVY = "#050E30", GOLD = "#C9A13B", FONT = "'Segoe UI',Arial,sans-serif";
const cell = (i: number) => (i ? "border-top:1px solid #e5e9f0;" : "");

export function newsEmail(e: NewsEmail): string {
  const image = e.image && /^https:\/\//.test(e.image) ? `<tr><td><img src="${esc(e.image)}" alt="" width="600" style="display:block;width:100%;height:auto;max-height:260px;object-fit:cover"></td></tr>` : "";
  const date = !image && e.date
    ? `<tr><td style="background:${NAVY};padding:34px 32px;text-align:center"><div style="font:700 56px ${FONT};color:#ffffff;line-height:1">${esc(e.date[0])}</div><div style="font:600 16px ${FONT};color:${GOLD};letter-spacing:.14em;text-transform:uppercase;margin-top:8px">${esc(e.date[1])}</div><div style="font:400 14px ${FONT};color:#c7cde0;margin-top:6px">${esc(e.date[2])}</div></td></tr>`
    : "";
  const tags = e.tags?.filter(Boolean).length
    ? `<div style="margin-bottom:14px">${e.tags.filter(Boolean).map((t) => `<span style="display:inline-block;font:600 12px ${FONT};color:#897122;background:#FFFBED;border:1px solid ${GOLD};border-radius:999px;padding:4px 12px;margin-right:6px">${esc(t)}</span>`).join("")}</div>`
    : "";
  const facts = e.facts?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;border:1px solid #e5e9f0;border-radius:10px">${e.facts.map(([a, b], i) => `<tr><td style="padding:11px 16px;font:400 14px ${FONT};color:#6B7280;${cell(i)}">${esc(a)}</td><td align="right" style="padding:11px 16px;font:600 14px ${FONT};color:${NAVY};${cell(i)}">${esc(b)}</td></tr>`).join("")}</table>`
    : "";
  const list = e.list?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px">${e.list.map(([a, b]) => `<tr><td width="14" valign="top" style="padding:9px 0;font:700 14px Arial;color:${GOLD}">&#9670;</td><td style="padding:8px 0 8px 10px;font:400 15px/1.5 ${FONT};color:#475569"><b style="color:${NAVY}">${esc(a)}.</b> ${esc(b)}</td></tr>`).join("")}</table>`
    : "";
  const unsubscribe = e.unsubscribe
    ? `<a href="${e.unsubscribe}" style="color:#897122">Unsubscribe</a> &nbsp;&middot;&nbsp; `
    : "";

  return `<div style="background:#eef1f6;padding:22px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;font-family:${FONT};color:${NAVY}">
  <tr><td style="background:${NAVY};padding:22px 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><img src="${SITE_URL}/new-logo.png" alt="The A&amp;M Internationals" height="46" style="display:block;height:46px;width:auto"></td>
      <td align="right" style="font:600 11px ${FONT};letter-spacing:.16em;text-transform:uppercase;color:${GOLD}">${esc(e.kicker)}</td>
    </tr></table>
  </td></tr>
  <tr><td style="height:4px;background:${GOLD};font-size:0;line-height:0">&nbsp;</td></tr>
  ${image}${date}
  <tr><td style="padding:34px 32px 30px">
    ${tags}
    <h1 style="margin:0;font:700 28px/1.2 ${FONT};color:${NAVY}">${esc(e.title)}</h1>
    ${e.small ? `<div style="font:400 13px ${FONT};color:#6B7280;margin-top:8px">${esc(e.small)}</div>` : ""}
    <p style="margin:14px 0 0;font:400 16px/1.6 ${FONT};color:#475569">${esc(e.lead)}</p>
    ${facts}${list}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px"><tr><td style="background:${GOLD};border-radius:999px"><a href="${esc(e.link)}" style="display:inline-block;padding:13px 28px;font:600 15px ${FONT};color:${NAVY};text-decoration:none">${esc(e.cta)} &rarr;</a></td></tr></table>
  </td></tr>
  <tr><td style="padding:0 32px"><div style="border-top:1px solid #e5e9f0;font-size:0;line-height:0">&nbsp;</div></td></tr>
  <tr><td style="padding:22px 32px 30px;font:400 12.5px/1.6 ${FONT};color:#8a93a6">
    You're receiving this because you subscribed to updates from The A&amp;M Internationals.<br>
    ${unsubscribe}<a href="${SITE_URL}" style="color:#897122">${SITE_URL.replace(/^https?:\/\//, "")}</a><br>
    The A&amp;M Internationals &middot; Oracle EPM, Financial Transformation and Enterprise AI
  </td></tr>
</table></div>`;
}
