"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCart } from "./CartProvider";
import { buttonClass } from "@/components/ui/Button";

/**
 * CTA « Commander » : ouvre le panier s'il contient des articles,
 * sinon mène à la carte pour le composer. Aucune commande n'est envoyée
 * depuis ce bouton.
 */
export function OrderButton({
  variant = "primary",
  className,
  children = "Commander",
  onClick,
}: {
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  children?: ReactNode;
  /** Appelé en plus de l'action (ex. fermer un menu). */
  onClick?: () => void;
}) {
  const { count, open } = useCart();
  if (count > 0) {
    return (
      <button type="button" onClick={() => {
          onClick?.();
          open();
        }} className={buttonClass(variant, className)}>
        {children}
      </button>
    );
  }
  return (
    <Link href="/menu#carte" onClick={onClick} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
