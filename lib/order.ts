import { cartSubtotal, type CartLine } from "./cart";
import { formatDAPlain } from "./format";

export type OrderMode = "livraison" | "emporter" | "surplace";

export const ORDER_MODES: { id: OrderMode; label: string }[] = [
  { id: "livraison", label: "Livraison" },
  { id: "emporter", label: "À emporter" },
  { id: "surplace", label: "Sur place" },
];

export interface OrderDetails {
  mode: OrderMode;
  name: string;
  phone: string;
  /** Obligatoire en livraison. */
  address?: string;
  /** « Dès que possible » ou heure souhaitée « HH:MM ». */
  time?: string;
  notes?: string;
}

/** Numéro algérien : 05/06/07 + 8 chiffres, ou +213 / 00213 suivi de 9 chiffres. */
export function isValidAlgerianPhone(value: string): boolean {
  const digits = value.replace(/[\s.\-()]/g, "");
  return /^(?:0[5-7]\d{8}|0[2-4]\d{7}|(?:\+|00)213[5-7]\d{8}|(?:\+|00)213[2-4]\d{7})$/.test(digits);
}

export type OrderErrors = Partial<Record<"name" | "phone" | "address", string>>;

export function validateOrder(details: OrderDetails): OrderErrors {
  const errors: OrderErrors = {};
  if (details.name.trim().length < 2) errors.name = "Indiquez votre nom.";
  if (!isValidAlgerianPhone(details.phone)) errors.phone = "Numéro invalide (ex. 0550 12 34 56).";
  if (details.mode === "livraison" && (details.address ?? "").trim().length < 6) {
    errors.address = "Indiquez l'adresse de livraison.";
  }
  return errors;
}

/** Construit le récapitulatif texte de la commande (SMS, WhatsApp, copie). */
export function buildOrderMessage(
  lines: readonly CartLine[],
  restaurantName = "Meat Love",
  details?: OrderDetails,
): string {
  const body = lines.map((line) => {
    const pack = line.pack ? ` — ${line.pack.label}` : "";
    return `• ${line.quantity} × ${line.product.name}${pack} : ${formatDAPlain(line.lineTotal)}`;
  });

  const header = details
    ? [
        `Commande ${restaurantName} — ${ORDER_MODES.find((m) => m.id === details.mode)?.label}`,
        `Nom : ${details.name.trim()}`,
        `Tél : ${details.phone.trim()}`,
        ...(details.mode === "livraison" && details.address ? [`Adresse : ${details.address.trim()}`] : []),
        `Heure : ${details.time?.trim() || "Dès que possible"}`,
      ]
    : [`Bonjour ${restaurantName}, je souhaite commander :`];

  return [
    ...header,
    "",
    ...body,
    "",
    `Total articles : ${formatDAPlain(cartSubtotal(lines))}`,
    ...(details?.notes?.trim() ? ["", `Remarque : ${details.notes.trim()}`] : []),
  ].join("\n");
}

/** Ne garde que les chiffres d'un numéro international (format attendu par wa.me). */
export function normalizeWhatsAppNumber(number: string): string | null {
  const digits = number.replace(/\D/g, "").replace(/^00/, "");
  return digits.length >= 8 ? digits : null;
}

export function buildWhatsAppUrl(number: string, message: string): string | null {
  const digits = normalizeWhatsAppNumber(number);
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Lien SMS pré-rempli (syntaxe compatible iOS et Android). */
export function buildSmsUrl(tel: string, message: string): string {
  return `sms:${tel}?&body=${encodeURIComponent(message)}`;
}
