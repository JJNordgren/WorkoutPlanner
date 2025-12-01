export function startOfWeek(d = new Date()) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getWeekKey(d = new Date()) {
  const start = startOfWeek(d);
  const year = start.getFullYear();
  const firstWeek = startOfWeek(new Date(year, 0, 1));
  const diffDays = Math.floor((start - firstWeek) / (1000 * 60 * 60 * 24));
  const weekNo = Math.floor(diffDays / 7) + 1;
  return `${year}-W${String(weekNo).padStart(2, "0")}`;
}

export const DAY_KEYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function getTodayKey() {
  return DAY_KEYS[(new Date().getDay() + 6) % 7];
}

export function weekRangeLabel(d = new Date()) {
  const s = startOfWeek(d);
  const e = new Date(s);
  e.setDate(s.getDate() + 6);
  return `${s.toLocaleDateString()} – ${e.toLocaleDateString()}`;
}
