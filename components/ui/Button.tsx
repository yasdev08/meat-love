import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 font-display text-[1.05rem] font-bold uppercase tracking-[0.14em] transition-[background-color,color,border-color,transform,box-shadow] duration-500 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember text-coal-950 shadow-[0_10px_40px_-12px_var(--color-ember)] hover:bg-ember-bright hover:shadow-[0_14px_50px_-10px_var(--color-ember-bright)]",
  outline: "border border-ivory/25 text-ivory hover:border-ivory/70 hover:bg-ivory/5",
  ghost: "text-ivory hover:text-glow",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}
