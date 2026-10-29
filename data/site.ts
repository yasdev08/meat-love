/**
 * Informations de l'établissement.
 *
 * IMPORTANT : ne renseigner que des informations vérifiées auprès du
 * restaurant. Toute valeur laissée à `null` est simplement masquée du site
 * public (et signalée dans les encarts « à compléter » si `showSetupHints`
 * est actif).
 */

export interface OpeningHours {
  /** Ex. « Samedi – Jeudi » */
  days: string;
  /** Ex. « 12:00 – 23:00 » */
  hours: string;
}

export interface SocialLink {
  network: "instagram" | "facebook" | "tiktok";
  url: string;
  handle?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  /** URL publique du site (sans slash final). Utilisée pour le SEO. */
  url: string;
  address: {
    street: string;
    city: string;
    postalCode?: string;
    country: string;
  } | null;
  /** Format international, ex. « +213 5 55 55 55 55 ». */
  phone: string | null;
  /** Numéro WhatsApp au format international. Active la commande WhatsApp. */
  whatsapp: string | null;
  openingHours: readonly OpeningHours[] | null;
  socials: readonly SocialLink[];
  /** Lien Google Maps (partage) et URL d'intégration (iframe). */
  map: { link: string; embedUrl?: string } | null;
  /**
   * Affiche des encarts discrets listant les informations manquantes.
   * Utile pour la présentation ; à désactiver avant la mise en ligne.
   */
  showSetupHints: boolean;
}

export const site: SiteConfig = {
  name: "Meat Love",
  tagline: "Le feu. La viande. L'amour.",
  description:
    "Viandes fumées, agneau, burgers au pain brioché maison et poulet grillé. Produits frais du jour, pain brioché maison et braise allumée à midi.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  // À compléter avec les informations vérifiées du restaurant :
  address: null,
  phone: null,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
  openingHours: null,
  socials: [],
  map: null,

  showSetupHints: process.env.NEXT_PUBLIC_SHOW_SETUP_HINTS !== "false",
};

/** Liste des informations à fournir avant la mise en ligne. */
export function missingBusinessInfo(config: SiteConfig = site): string[] {
  const missing: string[] = [];
  if (!config.address) missing.push("Adresse du restaurant");
  if (!config.phone) missing.push("Numéro de téléphone");
  if (!config.whatsapp) missing.push("Numéro WhatsApp (commande)");
  if (!config.openingHours) missing.push("Horaires d'ouverture");
  if (config.socials.length === 0) missing.push("Réseaux sociaux");
  if (!config.map) missing.push("Localisation Google Maps");
  return missing;
}
