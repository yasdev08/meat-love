import type { DayHours } from "../data/site";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Index 0 = lundi … 6 = dimanche, à partir de Date.getDay() (0 = dimanche). */
export function mondayIndex(jsDay: number): number {
  return (jsDay + 6) % 7;
}

/** Jour et minute courants dans le fuseau du restaurant. */
export function localClock(date: Date, timeZone: string): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return { dayIndex: days.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensDay: string; today: boolean };

/**
 * Statut d'ouverture. Gère les créneaux qui finissent après minuit
 * (ex. 12:00 – 01:00 : ouvert jusqu'à 01:00 le lendemain).
 */
export function openStatus(hours: readonly DayHours[], dayIndex: number, minutes: number): OpenStatus {
  const today = hours[dayIndex];
  const yesterday = hours[(dayIndex + 6) % 7];

  // Fin du créneau de la veille, après minuit.
  const yClose = toMinutes(yesterday.close);
  if (yClose < toMinutes(yesterday.open) && minutes < yClose) {
    return { open: true, closesAt: yesterday.close };
  }

  const open = toMinutes(today.open);
  const close = toMinutes(today.close);
  const overnight = close < open;
  if (minutes >= open && (overnight || minutes < close)) {
    return { open: true, closesAt: today.close };
  }
  if (minutes < open) {
    return { open: false, opensAt: today.open, opensDay: today.label, today: true };
  }
  const next = hours[(dayIndex + 1) % 7];
  return { open: false, opensAt: next.open, opensDay: next.label, today: false };
}

/** Regroupe les jours aux horaires identiques : « Lun – Jeu, Sam – Dim · 12:00 – 01:00 ». */
export function groupHours(hours: readonly DayHours[]): { days: string; hours: string }[] {
  const short = (d: DayHours) => d.label.slice(0, 3);
  const groups = new Map<string, number[]>();
  hours.forEach((d, i) => {
    const key = `${d.open} – ${d.close}`;
    groups.set(key, [...(groups.get(key) ?? []), i]);
  });
  return [...groups.entries()].map(([range, indexes]) => {
    const runs: number[][] = [];
    for (const i of indexes) {
      const last = runs.at(-1);
      if (last && last.at(-1) === i - 1) last.push(i);
      else runs.push([i]);
    }
    const days = runs
      .map((run) => (run.length > 1 ? `${short(hours[run[0]])} – ${short(hours[run.at(-1)!])}` : hours[run[0]].label))
      .join(", ");
    return { days, hours: range };
  });
}
