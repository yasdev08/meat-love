import { categories, products, productsIn } from "@/data/menu";
import { site } from "@/data/site";
import { JsonLd } from "./JsonLd";

/**
 * Données structurées schema.org/Restaurant, à partir des seules informations
 * vérifiées (data/site.ts) et de la carte officielle (data/menu.ts).
 */
export function RestaurantJsonLd() {
  const prices = products.flatMap((p) => (p.packs ? p.packs.map((pk) => pk.price) : [p.price])).filter((n) => n > 0);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/meat-love-logo-badge.png`,
    image: [`${site.url}/brand/meat-love-logo-badge.png`, `${site.url}/opengraph-image`],
    servesCuisine: ["Viandes fumées", "Grillades au charbon", "Burgers", "Agneau", "Poulet grillé"],
    priceRange: `${Math.min(...prices)}–${Math.max(...prices)} DZD`,
    currenciesAccepted: "DZD",
    acceptsReservations: true,
    menu: `${site.url}/menu`,
    address: {
      "@type": "PostalAddress",
      addressCountry: site.address.country,
      ...(site.address.street ? { streetAddress: site.address.street } : {}),
      ...(site.address.city ? { addressLocality: site.address.city } : {}),
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
    },
    openingHoursSpecification: site.openingHours.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day.schemaDay}`,
      opens: day.open,
      closes: day.close,
    })),
    amenityFeature: site.services.map((service) => ({
      "@type": "LocationFeatureSpecification",
      name: service,
      value: true,
    })),
    hasMenu: {
      "@type": "Menu",
      url: `${site.url}/menu`,
      inLanguage: "fr",
      hasMenuSection: categories.map((category) => ({
        "@type": "MenuSection",
        name: category.name,
        ...(category.note ? { description: category.note } : {}),
        hasMenuItem: productsIn(category.id).map((product) => ({
          "@type": "MenuItem",
          name: product.name,
          ...(product.nameAr ? { alternateName: product.nameAr } : {}),
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
  if (site.phone) {
    data.telephone = site.phone.tel;
    data.potentialAction = {
      "@type": "OrderAction",
      target: { "@type": "EntryPoint", urlTemplate: `tel:${site.phone.tel}` },
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet", "http://purl.org/goodrelations/v1#DeliveryModePickUp"],
    };
  }
  if (site.map) data.hasMap = site.map.link;
  if (site.socials.length) data.sameAs = site.socials.map((s) => s.url);

  return <JsonLd data={data} />;
}
