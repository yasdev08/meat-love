// Recense les photos réelles déposées dans public/images afin que le site
// les utilise automatiquement à la place des visuels illustrés.
//
//   public/images/menu/<id-produit>.(webp|jpg|jpeg|png|avif)
//   public/images/gallery/*.(webp|jpg|jpeg|png|avif)   (ordre alphabétique)
//   public/images/hero.(webp|jpg|jpeg|png|avif)
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";

const root = join(import.meta.dirname, "..");
const imagesDir = join(root, "public", "images");
const exts = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);

function list(dir) {
  const full = join(imagesDir, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((f) => exts.has(parse(f).ext.toLowerCase()))
    .sort();
}

const menu = Object.fromEntries(list("menu").map((f) => [parse(f).name, `/images/menu/${f}`]));
const gallery = list("gallery").map((f) => `/images/gallery/${f}`);
const heroFile = list("").find((f) => parse(f).name === "hero");

const manifest = { menu, gallery, hero: heroFile ? `/images/${heroFile}` : null };
writeFileSync(join(root, "data", "image-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `[images] ${Object.keys(menu).length} photo(s) produit, ${gallery.length} photo(s) galerie, hero: ${manifest.hero ?? "aucune"}`,
);
