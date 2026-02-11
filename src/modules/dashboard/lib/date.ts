export function formatCompactDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatCompactDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function isBeforeDay(iso: string, compareTo: Date) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  return startOfDay(d).getTime() < startOfDay(compareTo).getTime();
}

export function isWithinNextDays(iso: string, days: number, now: Date) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  const start = startOfDay(now).getTime();
  const end = start + days * 24 * 60 * 60 * 1000;
  const t = startOfDay(d).getTime();
  return t >= start && t <= end;
}


