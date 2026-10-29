"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/cart";
import { cn } from "@/lib/cn";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  /** Autorise la descente à 0 (suppression de la ligne). */
  allowZero?: boolean;
  size?: "md" | "sm";
}

export function QuantityStepper({ value, onChange, label, allowZero, size = "md" }: QuantityStepperProps) {
  const min = allowZero ? 0 : 1;
  const btn = cn(
    "grid place-items-center rounded-full text-ivory transition-colors hover:bg-ivory/10 disabled:opacity-30 disabled:hover:bg-transparent",
    size === "md" ? "size-11" : "size-10",
  );
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border border-ivory/15 bg-coal-950/40">
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={value === 1 && allowZero ? "Retirer" : "Diminuer la quantité"}
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <output aria-live="polite" className={cn("min-w-8 text-center font-display font-bold tabular-nums", size === "md" ? "text-xl" : "text-lg")}>
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(MAX_QUANTITY, value + 1))}
        disabled={value >= MAX_QUANTITY}
        aria-label="Augmenter la quantité"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
