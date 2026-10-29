import { site } from "@/data/site";
import { JsonLd } from "./JsonLd";

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.path === "/" ? "" : item.path}`,
        })),
      }}
    />
  );
}
