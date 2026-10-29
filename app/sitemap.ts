import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1, images: [`${site.url}/brand/meat-love-logo-badge.png`] },
    { url: `${site.url}/menu`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/notre-histoire`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];
}
