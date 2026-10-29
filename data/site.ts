/**
 * Informations de l'établissement.
 *
 * Source : site officiel du restaurant (meat-love.lovable.app). Ne renseigner
 * que des informations vérifiées : toute valeur à `null` est masquée.
 */

export type DayId = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche";

export interface DayHours {
  id: DayId;
  label: string;
  /** Code schema.org du jour. */
  schemaDay: string;
  /** Heure d'ouverture « HH:MM ». */
  open: string;
  /** Heure de fermeture « HH:MM » ; si elle est inférieure à l'ouverture, elle tombe le lendemain. */
  close: string;
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
    street?: string;
    city?: string;
    postalCode?: string;
    /** Code pays ISO. */
    country: string;
  };
  /** Numéro affiché, format local. */
  phone: { display: string; tel: string } | null;
  /** Numéro WhatsApp au format international. Active la commande WhatsApp. */
  whatsapp: string | null;
  openingHours: readonly DayHours[];
  hoursNote: string;
  lastOrder: string;
  services: readonly string[];
  socials: readonly SocialLink[];
  /** Lien Google Maps (partage) et URL d'intégration (iframe) si disponible. */
  map: { link: string; embedUrl?: string } | null;
  /** Fuseau horaire du restaurant (statut « ouvert maintenant »). */
  timeZone: string;
  /**
   * Affiche des encarts discrets listant les informations manquantes.
   * Activer avec NEXT_PUBLIC_SHOW_SETUP_HINTS=true.
   */
  showSetupHints: boolean;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Fourni automatiquement par Vercel au moment du build.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

const allDays = (open: string, close: string, exceptions: Partial<Record<DayId, [string, string]>> = {}): DayHours[] =>
  (
    [
      ["lundi", "Lundi", "Monday"],
      ["mardi", "Mardi", "Tuesday"],
      ["mercredi", "Mercredi", "Wednesday"],
      ["jeudi", "Jeudi", "Thursday"],
      ["vendredi", "Vendredi", "Friday"],
      ["samedi", "Samedi", "Saturday"],
      ["dimanche", "Dimanche", "Sunday"],
    ] as const
  ).map(([id, label, schemaDay]) => {
    const [o, c] = exceptions[id] ?? [open, close];
    return { id, label, schemaDay, open: o, close: c };
  });

export const site: SiteConfig = {
  name: "Meat Love",
  tagline: "Le feu. La viande. L'amour.",
  description:
    "Meat Love, restaurant de viandes fumées et grillades au charbon : agneau fumé en packs, burgers smashés, poulet grillé et sauces maison. Sur place, à emporter ou en livraison. Ouvert 7j/7 jusqu'à 01:00.",
  url: resolveSiteUrl(),

  address: { country: "DZ" },
  phone: { display: "0797 98 11 97", tel: "+213797981197" },
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
  openingHours: allDays("12:00", "01:00", { vendredi: ["19:00", "01:00"] }),
  hoursNote: "Ouvert 7j/7",
  lastOrder: "00:45",
  services: ["Sur place", "À emporter", "Livraison"],
  socials: [
    { network: "instagram", url: "https://www.instagram.com/meatlovebymed_", handle: "@meatlovebymed_" },
    { network: "facebook", url: "https://www.facebook.com/share/1BgmspFsf2/", handle: "Meat Love" },
    { network: "tiktok", url: "https://www.tiktok.com/@meatlove37", handle: "@meatlove37" },
  ],
  map: { link: "https://maps.app.goo.gl/giNRigu7ACjQyc389" },
  timeZone: "Africa/Algiers",

  showSetupHints: process.env.NEXT_PUBLIC_SHOW_SETUP_HINTS === "true",
};

/** Liste des informations encore à fournir. */
export function missingBusinessInfo(config: SiteConfig = site): string[] {
  const missing: string[] = [];
  if (!config.address.street || !config.address.city) missing.push("Adresse écrite (rue, ville)");
  if (!config.phone) missing.push("Numéro de téléphone");
  if (!config.whatsapp) missing.push("Numéro WhatsApp (commande en ligne)");
  if (!config.map?.embedUrl) missing.push("Carte Google Maps intégrée");
  return missing;
}
