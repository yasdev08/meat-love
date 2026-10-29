"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { ClipboardCheck, Copy, MessageCircle, MessageSquareText, Phone } from "lucide-react";
import { site } from "@/data/site";
import { formatDA } from "@/lib/format";
import { localClock, openStatus } from "@/lib/hours";
import { ORDER_MODES, validateOrder, type OrderDetails, type OrderErrors, type OrderMode } from "@/lib/order";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui/Button";

const STORAGE_KEY = "meatlove.customer.v1";

interface CheckoutFormProps {
  subtotal: number;
  onSend: (details: OrderDetails, channel: "sms" | "whatsapp") => void;
  onCopy: (details: OrderDetails) => void;
  copied: boolean;
}

const inputClass =
  "w-full rounded-xl border border-ivory/15 bg-coal-950/60 px-4 py-3 text-base text-ivory placeholder:text-smoke transition-colors outline-none focus:border-ember focus-visible:outline-none aria-[invalid=true]:border-ember-bright";

function Field({ label, error, children, htmlFor }: { label: string; error?: string; children: ReactNode; htmlFor: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="font-display text-sm font-bold uppercase tracking-[0.18em] text-ash">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-ember-bright">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CheckoutForm({ subtotal, onSend, onCopy, copied }: CheckoutFormProps) {
  const id = useId();
  const [details, setDetails] = useState<OrderDetails>({ mode: "livraison", name: "", phone: "", address: "", time: "", notes: "" });
  const [errors, setErrors] = useState<OrderErrors>({});
  const [closedNotice, setClosedNotice] = useState<string | null>(null);

  // Préremplit avec les coordonnées de la dernière commande, et vérifie les horaires.
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- relecture unique du stockage local
        setDetails((d) => ({
          ...d,
          name: typeof saved.name === "string" ? saved.name : "",
          phone: typeof saved.phone === "string" ? saved.phone : "",
          address: typeof saved.address === "string" ? saved.address : "",
          mode: ORDER_MODES.some((m) => m.id === saved.mode) ? saved.mode : d.mode,
        }));
      }
    } catch {
      /* stockage indisponible */
    }
    const { dayIndex, minutes } = localClock(new Date(), site.timeZone);
    const status = openStatus(site.openingHours, dayIndex, minutes);
    if (!status.open) {
      setClosedNotice(
        `Le restaurant est fermé pour le moment. Ouverture ${status.today ? "aujourd'hui" : status.opensDay.toLowerCase()} à ${status.opensAt} — vous pouvez préparer votre commande dès maintenant.`,
      );
    }
  }, []);

  const update = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => {
    setDetails((d) => ({ ...d, [key]: value }));
    if (errors[key as keyof OrderErrors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function submit(channel: "sms" | "whatsapp") {
    const found = validateOrder(details);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: details.name, phone: details.phone, address: details.address, mode: details.mode }),
      );
    } catch {
      /* ignore */
    }
    onSend(details, channel);
  }

  const primary: "sms" | "whatsapp" = site.whatsapp ? "whatsapp" : "sms";

  return (
    <form
      noValidate
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        submit(primary);
      }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-6 py-6">
        {closedNotice ? (
          <p className="rounded-xl border border-ember/30 bg-ember/[0.07] px-4 py-3 text-sm leading-relaxed text-cream">{closedNotice}</p>
        ) : null}

        <fieldset>
          <legend className="font-display text-sm font-bold uppercase tracking-[0.18em] text-ash">Mode</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {ORDER_MODES.map((mode) => {
              const selected = details.mode === mode.id;
              return (
                <label
                  key={mode.id}
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center font-display text-sm font-bold uppercase tracking-[0.08em] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-glow",
                    selected ? "border-ember bg-ember text-coal-950" : "border-ivory/15 text-cream hover:border-ivory/40",
                  )}
                >
                  <input
                    type="radio"
                    name={`${id}-mode`}
                    value={mode.id}
                    checked={selected}
                    onChange={() => update("mode", mode.id as OrderMode)}
                    className="sr-only"
                  />
                  {mode.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <Field label="Nom" htmlFor={`${id}-name`} error={errors.name}>
          <input
            id={`${id}-name`}
            className={inputClass}
            autoComplete="name"
            value={details.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            placeholder="Votre nom"
          />
        </Field>

        <Field label="Téléphone" htmlFor={`${id}-phone`} error={errors.phone}>
          <input
            id={`${id}-phone`}
            className={inputClass}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={details.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
            placeholder="05xx xx xx xx"
          />
        </Field>

        {details.mode === "livraison" ? (
          <Field label="Adresse de livraison" htmlFor={`${id}-address`} error={errors.address}>
            <textarea
              id={`${id}-address`}
              className={cn(inputClass, "min-h-20 resize-y")}
              autoComplete="street-address"
              value={details.address}
              onChange={(e) => update("address", e.target.value)}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? `${id}-address-error` : undefined}
              placeholder="Quartier, rue, repère…"
            />
          </Field>
        ) : null}

        <Field label="Heure souhaitée" htmlFor={`${id}-time`}>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => update("time", "")}
              aria-pressed={!details.time}
              className={cn(
                "min-h-12 flex-1 rounded-xl border px-3 text-sm transition-colors",
                !details.time ? "border-ember bg-ember/10 text-ivory" : "border-ivory/15 text-cream hover:border-ivory/40",
              )}
            >
              Dès que possible
            </button>
            <input
              id={`${id}-time`}
              type="time"
              className={cn(inputClass, "w-36 [color-scheme:dark]", details.time && "border-ember")}
              value={details.time}
              onChange={(e) => update("time", e.target.value)}
              aria-label="Choisir une heure"
            />
          </div>
          <p className="text-xs text-ash">
            Dernière commande à {site.lastOrder}.
          </p>
        </Field>

        <Field label="Remarque (facultatif)" htmlFor={`${id}-notes`}>
          <textarea
            id={`${id}-notes`}
            className={cn(inputClass, "min-h-16 resize-y")}
            value={details.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Allergie, précision…"
            maxLength={300}
          />
        </Field>
      </div>

      <footer className="space-y-3 border-t border-ivory/10 bg-coal-950/50 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-ash">Total articles</span>
          <span className="font-display text-3xl font-extrabold tabular-nums">{formatDA(subtotal)}</span>
        </div>
        <button type="submit" className={buttonClass("primary", "w-full")}>
          {primary === "whatsapp" ? <MessageCircle className="size-5" aria-hidden /> : <MessageSquareText className="size-5" aria-hidden />}
          {primary === "whatsapp" ? "Envoyer sur WhatsApp" : "Envoyer la commande"}
        </button>
        <div className="grid grid-cols-2 gap-2">
          {primary === "whatsapp" && site.phone ? (
            <button type="button" onClick={() => submit("sms")} className={buttonClass("outline", "min-h-11 px-3 text-sm")}>
              <MessageSquareText className="size-4" aria-hidden /> SMS
            </button>
          ) : site.phone ? (
            <a href={`tel:${site.phone.tel}`} className={buttonClass("outline", "min-h-11 px-3 text-sm")}>
              <Phone className="size-4" aria-hidden /> Appeler
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => {
              const found = validateOrder(details);
              setErrors(found);
              if (Object.keys(found).length === 0) onCopy(details);
            }}
            className={buttonClass("outline", "min-h-11 px-3 text-sm")}
          >
            {copied ? <ClipboardCheck className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? "Copié" : "Copier"}
          </button>
        </div>
        <p className="text-xs leading-relaxed text-ash">
          {primary === "whatsapp" ? "WhatsApp" : "Votre messagerie SMS"} s&apos;ouvre avec la commande complète, adressée au{" "}
          {site.phone?.display ?? site.whatsapp}. Elle est transmise dès que vous appuyez sur « Envoyer ».
        </p>
      </footer>
    </form>
  );
}
