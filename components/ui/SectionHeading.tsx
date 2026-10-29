import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 font-display text-sm font-bold uppercase tracking-[0.34em] text-ember-bright", className)}>
      <span aria-hidden className="h-px w-8 bg-ember" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow className={cn(align === "center" && "justify-center")}>{eyebrow}</Eyebrow> : null}
      <Heading className="mt-5 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9] font-extrabold uppercase text-balance">
        {title}
      </Heading>
      {intro ? <div className="mt-6 text-lg leading-relaxed text-cream/80 text-pretty">{intro}</div> : null}
    </Reveal>
  );
}
