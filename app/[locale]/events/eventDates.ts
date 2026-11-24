const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Event dates as stored in Firebase: `month` like "Dec, 26" and `dateRange` like "8 - 11".
 * A month-only event (empty dateRange) runs from the 1st to the last day of that month,
 * so it moves to Past Events once the month is over.
 */
export function parseEventRange(dateRange?: string, month?: string): { start: Date; end: Date } | null {
  const [monRaw = "", yrRaw = ""] = (month ?? "").split(",");
  const m = MONTHS.indexOf(monRaw.trim().slice(0, 3).toLowerCase());
  const yy = parseInt(yrRaw.trim(), 10);
  if (m < 0 || Number.isNaN(yy)) return null;
  const year = yy < 100 ? 2000 + yy : yy;

  const days = (dateRange ?? "").match(/\d{1,2}/g);
  if (!days || days.length === 0) {
    return { start: new Date(year, m, 1), end: new Date(year, m + 1, 0, 23, 59, 59, 999) };
  }
  return {
    start: new Date(year, m, Number(days[0])),
    end: new Date(year, m, Number(days[days.length - 1]), 23, 59, 59, 999),
  };
}

export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
