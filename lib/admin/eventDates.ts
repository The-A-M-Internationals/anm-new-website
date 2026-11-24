/**
 * The site reads event dates as two text fields: dateRange "8 - 11" and month "Dec, 26"
 * (see Events.tsx / UpcomingEvents.tsx / PastEvents.tsx). The admin picks real dates instead;
 * these helpers convert both ways. Events are single-month (the site's format has one month).
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

/** "2026-12-08", "2026-12-11" -> { dateRange: "8 - 11", month: "Dec, 26", monthAr: "ديسمبر، 26" } */
export function toEventFields(start: string, end: string) {
  const s = new Date(`${start}T00:00:00`), e = new Date(`${(end || start)}T00:00:00`);
  const yy = String(s.getFullYear()).slice(2);
  const sameDay = s.getTime() === e.getTime();
  return {
    dateRange: sameDay ? String(s.getDate()) : `${s.getDate()} - ${e.getDate()}`,
    month: `${MONTHS[s.getMonth()]}, ${yy}`,
    monthAr: `${MONTHS_AR[s.getMonth()]}، ${yy}`,
    startDate: start,
    endDate: end || start,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Existing text fields -> ISO dates for the date pickers ("" when they can't be read) */
export function fromEventFields(dateRange?: string, month?: string, startDate?: string, endDate?: string) {
  if (startDate) return { start: startDate, end: endDate || startDate };
  const days = (dateRange ?? "").match(/\d{1,2}/g);
  const [mon, yr] = (month ?? "").split(",").map((x) => x.trim());
  const m = MONTHS.indexOf(mon?.slice(0, 3));
  if (!days || m < 0 || !yr) return { start: "", end: "" };
  const y = 2000 + Number(yr);
  return { start: `${y}-${pad(m + 1)}-${pad(+days[0])}`, end: `${y}-${pad(m + 1)}-${pad(+days[days.length - 1])}` };
}
