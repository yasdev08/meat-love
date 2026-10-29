"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatDA } from "@/lib/format";

export function CartButton() {
  const { count, subtotal, open, pulse } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      className="relative grid size-12 place-items-center rounded-full border border-ivory/15 text-ivory transition-colors hover:border-ivory/50 hover:bg-ivory/5"
      aria-label={count > 0 ? `Ouvrir le panier : ${count} article${count > 1 ? "s" : ""}, ${formatDA(subtotal)}` : "Ouvrir le panier (vide)"}
    >
      <ShoppingBag className="size-5" aria-hidden />
      {count > 0 ? (
        <span
          key={pulse}
          className="absolute -top-1 -right-1 grid h-6 min-w-6 animate-bump place-items-center rounded-full bg-ember px-1.5 font-display text-sm font-extrabold text-coal-950 tabular-nums"
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
