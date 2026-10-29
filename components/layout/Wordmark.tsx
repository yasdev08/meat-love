import { cn } from "@/lib/cn";

/** Monogramme flamme-cœur de la maison. */
export function FlameHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ml-flame" x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0" stopColor="var(--color-ember-deep)" />
          <stop offset="0.55" stopColor="var(--color-ember)" />
          <stop offset="1" stopColor="var(--color-glow)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ml-flame)"
        d="M12 22.5C6.8 18.6 3.3 15.2 3.3 10.9 3.3 8 5.4 5.9 8 5.9c1.6 0 3 .8 4 2.1.3-2.4-.4-4.6-1.6-6.5 5.5 1.8 10.3 6.4 10.3 11.4 0 4-3.5 6.9-8.7 9.6Z"
      />
      <path fill="var(--color-coal-950)" opacity="0.55" d="M12.4 19.4c-2.3-1.6-3.6-3.2-3.6-5 0-1.3.9-2.2 2-2.2.8 0 1.4.4 1.8 1 .5-1.1.4-2.3-.1-3.4 2.6 1.3 4.2 3.4 4.2 5.4 0 1.8-1.6 3.1-4.3 4.2Z" />
    </svg>
  );
}

export function Wordmark({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display font-black uppercase leading-none", className)}>
      <span className={cn("tracking-[0.08em]", size === "lg" ? "text-5xl sm:text-6xl" : "text-[1.7rem]")}>Meat</span>
      <FlameHeart className={cn(size === "lg" ? "size-11 sm:size-14" : "size-6", "-mt-1 shrink-0")} />
      <span className={cn("tracking-[0.08em]", size === "lg" ? "text-5xl sm:text-6xl" : "text-[1.7rem]")}>Love</span>
    </span>
  );
}
