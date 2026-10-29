"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ClipboardCheck, Copy, MessageCircle, MessageSquareText, Phone, ShoppingBag, Trash2, X } from "lucide-react";
import { site } from "@/data/site";
import { formatDA } from "@/lib/format";
import { buildOrderMessage, buildSmsUrl, buildWhatsAppUrl, type OrderDetails } from "@/lib/order";
import { useCart } from "./CartProvider";
import { CheckoutForm } from "./CheckoutForm";
import { DishVisual } from "@/components/DishVisual";
import { Sheet } from "@/components/ui/Sheet";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { buttonClass } from "@/components/ui/Button";

type Step = "cart" | "checkout" | "sent";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, close, setQuantity, remove, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [sentVia, setSentVia] = useState<"sms" | "whatsapp" | null>(null);
  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    close();
    // Revient au panier à la prochaine ouverture (sauf si une commande vient d'être préparée).
    if (step === "checkout") setStep("cart");
  };

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  function send(details: OrderDetails, channel: "sms" | "whatsapp") {
    const message = buildOrderMessage(lines, site.name, details);
    const url =
      channel === "whatsapp" && site.whatsapp
        ? buildWhatsAppUrl(site.whatsapp, message)
        : site.phone
          ? buildSmsUrl(site.phone.tel, message)
          : null;
    if (!url) return;
    setSentVia(channel);
    setStep("sent");
    if (channel === "whatsapp") window.open(url, "_blank", "noopener,noreferrer");
    else window.location.href = url;
  }

  const title = step === "checkout" ? "Vos coordonnées" : step === "sent" ? "Dernière étape" : "Votre commande";

  return (
    <Sheet open={isOpen} onClose={handleClose} side="right" labelledBy="cart-title">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-ivory/10 px-6 py-5">
          <div className="flex min-w-0 items-center gap-2">
            {step === "checkout" ? (
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="-ml-3 grid size-11 shrink-0 place-items-center rounded-full text-ash transition-colors hover:bg-ivory/5 hover:text-ivory"
                aria-label="Retour au panier"
              >
                <ArrowLeft className="size-5" aria-hidden />
              </button>
            ) : null}
            <div className="min-w-0">
              <h2 id="cart-title" className="truncate font-display text-2xl font-extrabold uppercase tracking-wide">
                {title}
              </h2>
              <p className="text-sm text-ash">
                {count === 0 ? "Aucun article" : `${count} article${count > 1 ? "s" : ""} · ${formatDA(subtotal)}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="grid size-11 shrink-0 place-items-center rounded-full text-ash transition-colors hover:bg-ivory/5 hover:text-ivory"
            aria-label="Fermer le panier"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        {step === "sent" ? (
          <div className="flex flex-1 flex-col justify-center gap-6 overflow-y-auto px-6 py-10">
            <div className="grid size-16 place-items-center rounded-full bg-ember/15 text-ember-bright">
              {sentVia === "whatsapp" ? <MessageCircle className="size-7" aria-hidden /> : <MessageSquareText className="size-7" aria-hidden />}
            </div>
            <div>
              <p className="font-serif text-3xl leading-tight italic">Votre commande est prête à partir.</p>
              <p className="mt-3 leading-relaxed text-cream/80">
                {sentVia === "whatsapp" ? "WhatsApp s’est ouvert" : "Votre messagerie s’est ouverte"} avec le détail de votre commande.
                <strong className="text-ivory"> Appuyez sur « Envoyer »</strong> pour la transmettre à Meat Love.
              </p>
              {site.phone ? (
                <p className="mt-3 text-sm text-ash">
                  Rien ne s&apos;est ouvert ? Appelez-nous au{" "}
                  <a href={`tel:${site.phone.tel}`} className="whitespace-nowrap text-cream underline underline-offset-4">
                    {site.phone.display}
                  </a>
                  .
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3">
              {site.phone ? (
                <a href={`tel:${site.phone.tel}`} className={buttonClass("outline", "w-full")}>
                  <Phone className="size-4" aria-hidden /> Appeler le restaurant
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  clear();
                  setStep("cart");
                  close();
                }}
                className={buttonClass("primary", "w-full")}
              >
                C&apos;est envoyé
              </button>
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="mx-auto min-h-11 text-sm text-smoke underline-offset-4 hover:text-ivory hover:underline"
              >
                Modifier la commande
              </button>
            </div>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="relative grid size-24 place-items-center rounded-full border border-ivory/10">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-ember)_30%,transparent),transparent_70%)]" />
              <ShoppingBag className="relative size-9 text-cream" aria-hidden />
            </div>
            <div>
              <p className="font-serif text-3xl italic">Votre panier est vide.</p>
              <p className="mt-2 text-ash">La braise n&apos;attend que vous. Parcourez la carte pour composer votre commande.</p>
            </div>
            <Link href="/menu" onClick={handleClose} className={buttonClass("primary")}>
              Découvrir le menu
            </Link>
          </div>
        ) : step === "checkout" ? (
          <CheckoutForm
            subtotal={subtotal}
            onSend={send}
            onCopy={(details) => copy(buildOrderMessage(lines, site.name, details))}
            copied={copied}
          />
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ivory/10 overflow-y-auto overscroll-contain px-6">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-5">
                  <DishVisual product={line.product} label={false} sizes="80px" className="size-20 shrink-0 rounded-xl" />
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
              {site.phone || site.whatsapp ? (
                <button type="button" onClick={() => setStep("checkout")} className={buttonClass("primary", "w-full")}>
                  Commander
                </button>
              ) : (
                <button type="button" onClick={() => copy(buildOrderMessage(lines, site.name))} className={buttonClass("primary", "w-full")}>
                  {copied ? <ClipboardCheck className="size-5" aria-hidden /> : <Copy className="size-5" aria-hidden />}
                  {copied ? "Récapitulatif copié" : "Copier le récapitulatif"}
                </button>
              )}
              <p className="text-center text-xs text-ash">{site.services.join(" · ")}</p>
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
