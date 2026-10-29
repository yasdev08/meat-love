"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { localClock, openStatus, type OpenStatus as Status } from "@/lib/hours";
import { cn } from "@/lib/cn";

function compute(): Status {
  const { dayIndex, minutes } = localClock(new Date(), site.timeZone);
  return openStatus(site.openingHours, dayIndex, minutes);
}

/**
 * Pastille « Ouvert / Fermé » calculée à l'heure d'Alger. Rendue côté client
 * uniquement (l'heure n'est pas connue au moment de la génération statique).
 */
export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- l'heure locale n'existe qu'après le montage
    setStatus(compute());
    const timer = window.setInterval(() => setStatus(compute()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const label = !status
    ? `${site.hoursNote} · jusqu'à 01:00`
    : status.open
      ? `Ouvert maintenant · jusqu'à ${status.closesAt}`
      : `Fermé · ouvre ${status.today ? "aujourd'hui" : status.opensDay.toLowerCase()} à ${status.opensAt}`;

  return (
    <span className={cn("inline-flex items-center gap-2.5 text-sm text-cream", className)}>
      <span aria-hidden className="relative flex size-2.5">
        {status?.open ? <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" /> : null}
        <span className={cn("relative size-2.5 rounded-full", !status ? "bg-ash" : status.open ? "bg-emerald-400" : "bg-ember")} />
      </span>
      <span>{label}</span>
    </span>
  );
}
