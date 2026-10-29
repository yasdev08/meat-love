import { cartSubtotal, type CartLine } from "./cart";
import { formatDAPlain } from "./format";

/** Construit le récapitulatif texte de la commande (WhatsApp, copie). */
export function buildOrderMessage(lines: readonly CartLine[], restaurantName = "Meat Love"): string {
  const body = lines.map((line) => {
    const pack = line.pack ? ` — ${line.pack.label}` : "";
    return `• ${line.quantity} × ${line.product.name}${pack} : ${formatDAPlain(line.lineTotal)}`;
  });
  return [
    `Bonjour ${restaurantName}, je souhaite commander :`,
    "",
    ...body,
    "",
    `Total : ${formatDAPlain(cartSubtotal(lines))}`,
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
