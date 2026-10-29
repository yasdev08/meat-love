"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  /** `right` : tiroir latéral (panier, navigation). `center` : feuille basse sur mobile, fenêtre centrée sur grand écran. */
  side: "right" | "center";
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

/** Panneau modal accessible basé sur <dialog> (focus piégé, Échap, retour du focus). */
export function Sheet({ open, onClose, side, labelledBy, className, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Clic sur le fond (hors contenu) : fermeture.
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "sheet overscroll-contain bg-coal-900 text-ivory shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)] outline-none",
        side === "right" &&
          "sheet-right fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-[min(100vw,28rem)] border-l border-ivory/10",
        side === "center" &&
          "sheet-bottom mx-0 mt-auto mb-0 max-h-[92dvh] w-full max-w-none rounded-t-[1.75rem] border-t border-ivory/10 md:m-auto md:max-h-[88dvh] md:w-[min(92vw,60rem)] md:rounded-[1.75rem] md:border",
        className,
      )}
    >
      {children}
    </dialog>
  );
}
