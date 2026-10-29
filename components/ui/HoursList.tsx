"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { localClock } from "@/lib/hours";
import { cn } from "@/lib/cn";

/** Horaires de la semaine, avec le jour courant (heure d'Alger) mis en évidence. */
export function HoursList({ className }: { className?: string }) {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- le jour courant n'existe qu'après le montage
    setToday(localClock(new Date(), site.timeZone).dayIndex);
  }, []);

  return (
    <dl className={cn("divide-y divide-ivory/10", className)}>
      {site.openingHours.map((day, i) => {
        const isToday = i === today;
        return (
          <div key={day.id} className={cn("flex items-center justify-between gap-4 py-2.5", isToday && "text-ivory")}>
            <dt className={cn("flex items-center gap-2", isToday ? "font-semibold" : "text-cream/80")}>
              {day.label}
              {isToday ? (
                <span className="rounded-full bg-ember/15 px-2 py-0.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ember-bright">
                  Aujourd&apos;hui
                </span>
              ) : null}
            </dt>
            <dd className={cn("font-display text-lg font-bold tabular-nums", isToday ? "text-glow" : "text-cream")}>
              {day.open} – {day.close}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
