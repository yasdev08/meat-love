import { categories, productsIn } from "@/data/menu";
import { site } from "@/data/site";

/**
 * Données structurées schema.org/Restaurant. N'inclut que les informations
 * vérifiées : adresse, téléphone, horaires et réseaux uniquement s'ils sont
 * renseignés dans data/site.ts.
 */
export function RestaurantJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: site.url,
    menu: `${site.url}/menu`,
    logo: `${site.url}/brand/meat-love-logo-badge.png`,
    image: `${site.url}/brand/meat-love-logo-badge.png`,
    servesCuisine: ["Viandes fumées", "Grillades", "Burgers"],
    hasMenu: {
      "@type": "Menu",
      url: `${site.url}/menu`,
      hasMenuSection: categories.map((category) => ({
        "@type": "MenuSection",
        name: category.name,
        hasMenuItem: productsIn(category.id).map((product) => ({
          "@type": "MenuItem",
          name: product.name,
          ...(product.description ? { description: product.description } : {}),
          offers: (product.packs ?? [{ label: undefined, price: product.price }]).map((offer) => ({
            "@type": "Offer",
            ...(offer.label ? { name: offer.label } : {}),
            price: offer.price,
            priceCurrency: "DZD",
          })),
        })),
      })),
    },
  };
  if (site.address) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    };
  }
  if (site.phone) data.telephone = site.phone;
  if (site.socials.length) data.sameAs = site.socials.map((s) => s.url);

  return (
    <script
      type="application/ld+json"
      // JSON sérialisé côté serveur à partir de données statiques ; « < » échappé.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
