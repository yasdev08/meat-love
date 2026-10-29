import manifest from "@/data/image-manifest.json";

type Manifest = { menu: Record<string, string>; gallery: string[]; hero: string | null };
const images = manifest as Manifest;

/** Photo réelle du produit si elle a été déposée dans public/images/menu. */
export function productPhoto(productId: string): string | null {
  return images.menu[productId] ?? null;
}

export const galleryPhotos: readonly string[] = images.gallery;
export const heroPhoto: string | null = images.hero;
