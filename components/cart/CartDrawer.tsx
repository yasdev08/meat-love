"use client";

import Link from "next/link";
import { useState } from "react";
import { ClipboardCheck, Copy, MessageCircle, Phone, ShoppingBag, Trash2, X } from "lucide-react";
import { site } from "@/data/site";
import { formatDA } from "@/lib/format";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/order";
import { useCart } from "./CartProvider";
import { DishVisual } from "@/components/DishVisual";
import { Sheet } from "@/components/ui/Sheet";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { buttonClass } from "@/components/ui/Button";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, close, setQuantity, remove, clear } = useCart();
  const [copied, setCopied] = useState(false);

  const message = buildOrderMessage(lines, site.name);
  const whatsappUrl = site.whatsapp ? buildWhatsAppUrl(site.whatsapp, message) : null;

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Sheet open={isOpen} onClose={close} side="right" labelledBy="cart-title">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-ivory/10 px-6 py-5">
          <div>
            <h2 id="cart-title" className="font-display text-2xl font-extrabold uppercase tracking-wide">
              Votre commande
            </h2>
            <p className="text-sm text-ash">
              {count === 0 ? "Aucun article" : `${count} article${count > 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid size-11 place-items-center rounded-full text-ash transition-colors hover:bg-ivory/5 hover:text-ivory"
            aria-label="Fermer le panier"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="relative grid size-24 place-items-center rounded-full border border-ivory/10">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-ember)_30%,transparent),transparent_70%)]" />
              <ShoppingBag className="relative size-9 text-cream" aria-hidden />
            </div>
            <div>
              <p className="font-serif text-3xl italic">Votre panier est vide.</p>
              <p className="mt-2 text-ash">La braise n&apos;attend que vous. Parcourez la carte pour composer votre commande.</p>
            </div>
            <Link href="/menu" onClick={close} className={buttonClass("primary")}>
              Découvrir le menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ivory/10 overflow-y-auto overscroll-contain px-6">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-5">
                  <DishVisual product={line.product} sizes="80px" className="size-20 shrink-0 rounded-xl" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-lg leading-tight font-bold break-words uppercase">{line.product.name}</p>
                        <p className="text-sm text-ash">
                          {line.pack ? <span className="text-cream">{line.pack.label} · </span> : null}
                          <span className="tabular-nums">{formatDA(line.unitPrice)}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.key)}
                        className="-mt-1 -mr-2 grid size-10 shrink-0 place-items-center rounded-full text-smoke transition-colors hover:bg-ivory/5 hover:text-ember-bright"
                        aria-label={`Retirer ${line.product.name}${line.pack ? ` (${line.pack.label})` : ""}`}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <QuantityStepper
                        size="sm"
                        allowZero
                        value={line.quantity}
                        onChange={(q) => setQuantity(line.key, q)}
                        label={`Quantité pour ${line.product.name}`}
                      />
                      <span className="font-display text-lg font-bold tabular-nums text-glow">{formatDA(line.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-4 border-t border-ivory/10 bg-coal-950/50 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-ash">Sous-total</span>
                <span className="font-display text-3xl font-extrabold tabular-nums">{formatDA(subtotal)}</span>
              </div>

              {whatsappUrl ? (
                <>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "w-full")}>
                    <MessageCircle className="size-5" aria-hidden />
                    Commander via WhatsApp
                  </a>
                  <p className="text-xs leading-relaxed text-ash">
                    Le récapitulatif s&apos;ouvre dans WhatsApp. La commande n&apos;est transmise au restaurant qu&apos;une fois
                    le message envoyé, et confirmée par le restaurant.
                  </p>
                </>
              ) : (
                <>
                  <button type="button" onClick={copySummary} className={buttonClass("primary", "w-full")}>
                    {copied ? <ClipboardCheck className="size-5" aria-hidden /> : <Copy className="size-5" aria-hidden />}
                    {copied ? "Récapitulatif copié" : "Copier le récapitulatif"}
                  </button>
                  {site.phone ? (
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={buttonClass("outline", "w-full")}>
                      <Phone className="size-4" aria-hidden />
                      Appeler le restaurant
                    </a>
                  ) : null}
                  <p className="text-xs leading-relaxed text-ash">
                    La commande en ligne sera activée prochainement. Ce panier prépare votre récapitulatif ; il
                    n&apos;est pas encore transmis au restaurant.
                  </p>
                </>
              )}

              <button
                type="button"
                onClick={clear}
                className="mx-auto block min-h-11 text-sm text-smoke underline-offset-4 transition-colors hover:text-ivory hover:underline"
              >
                Vider le panier
              </button>
            </footer>
          </>
        )}
      </div>
    </Sheet>
  );
}
