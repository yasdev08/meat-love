import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Phone, Clock } from "lucide-react";
import {
  categories,
  productsIn,
  signatureProducts,
  SMOKED_MEAT_INCLUDES,
  SMOKED_MEAT_SIDES,
  getProduct,
} from "@/data/menu";
import { site } from "@/data/site";
import { formatDA } from "@/lib/format";
import { galleryPhotos } from "@/lib/images";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/menu/ProductCard";
import { DishArt } from "@/components/illustrations/DishArt";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SetupHint } from "@/components/ui/SetupHint";

const container = "mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10";

/* ——— Signatures ——— */
export function Signatures() {
  return (
    <section id="signatures" aria-labelledby="signatures-title" className="py-24 sm:py-32">
      <div className={container}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Les signatures"
            title={<span id="signatures-title">Trois raisons d&apos;allumer le feu</span>}
          />
          <Reveal>
            <Link href="/menu" className="group inline-flex min-h-11 items-center gap-2 font-display text-lg font-bold uppercase tracking-[0.16em] text-cream hover:text-ivory">
              Toute la carte
              <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {signatureProducts.map((product, i) => (
            <Reveal key={product.id} delay={i * 120} className={cn(i === 0 && "md:col-span-2 xl:col-span-1")}>
              <div className="relative h-full">
                <span aria-hidden className="pointer-events-none absolute -top-7 left-4 z-10 font-display text-6xl font-black text-ivory/10">
                  0{i + 1}
                </span>
                <ProductCard product={product} className="h-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— Le fumoir : viandes fumées & packs ——— */
export function Smokehouse() {
  const cuts = productsIn("viandes-fumees").filter((p) => p.packs);
  const bouzelouf = getProduct("bouzelouf");
  const packs = cuts[0]?.packs ?? [];

  return (
    <section aria-labelledby="fumoir-title" className="relative overflow-hidden border-y border-ivory/10 bg-coal-900 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[40rem] w-[40rem] rounded-full bg-ember/15 blur-[120px]" />
      <div className={cn(container, "relative")}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Le fumoir"
              title={
                <span id="fumoir-title">
                  L&apos;agneau <span className="font-serif font-normal normal-case italic text-ember-bright">fumé</span>
                </span>
              }
              intro={<p>Trois pièces d&apos;agneau, quatre packs, et toute la générosité de la table Meat Love.</p>}
            />
            <Reveal delay={120} className="mt-10">
              <blockquote className="border-l-2 border-ember pl-6 font-serif text-2xl leading-snug text-cream italic sm:text-[1.7rem]">
                {SMOKED_MEAT_INCLUDES}
              </blockquote>
            </Reveal>

            <Reveal delay={200} className="mt-10">
              <p className="pb-3 font-display text-sm font-bold uppercase tracking-[0.24em] text-ash" id="packs-caption">
                Packs — Épaule, Tchang &amp; Collier d&apos;agneau
              </p>
              <div className="overflow-hidden rounded-2xl border border-ivory/10">
                <table aria-labelledby="packs-caption" className="w-full table-fixed text-left">
                  <thead className="bg-ivory/[0.04]">
                    <tr>
                      {packs.map((pack) => (
                        <th key={pack.id} scope="col" className="px-3 py-3 font-display text-sm font-bold uppercase tracking-[0.14em] text-cream sm:px-5">
                          {pack.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {packs.map((pack) => (
                        <td key={pack.id} className="border-t border-ivory/10 px-3 py-4 font-display text-lg font-bold tabular-nums text-glow sm:px-5 sm:text-2xl">
                          {formatDA(pack.price)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            {cuts.map((product, i) => (
              <Reveal key={product.id} delay={i * 100}>
                <ProductCard product={product} variant="feature" />
              </Reveal>
            ))}
            {bouzelouf ? (
              <Reveal>
                <ProductCard product={bouzelouf} variant="row" className="p-4" />
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Offert avec chaque viande ——— */
export function Complimentary() {
  return (
    <section aria-labelledby="offert-title" className="relative py-24 sm:py-32">
      <div className={container}>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Offert avec chaque viande"
            title={<span id="offert-title">La table est déjà dressée</span>}
            intro={
              <p>
                Avec chaque plat de viande fumée, toutes les entrées chaudes et froides offertes et toutes les sauces
                Meat Love.
              </p>
            }
          />
          <Reveal delay={120}>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-ivory/10 bg-ivory/10 sm:grid-cols-3">
              {SMOKED_MEAT_SIDES.map((side, i) => (
                <li key={side} className="group flex aspect-[4/3] flex-col justify-between bg-coal-950 p-5 transition-colors hover:bg-coal-900 sm:p-6">
                  <span className="font-sans text-xs tabular-nums text-ember-bright">0{i + 1}</span>
                  <span className="font-serif text-3xl capitalize italic sm:text-4xl">{side}</span>
                </li>
              ))}
              <li className="col-span-2 flex items-center justify-between gap-4 bg-ember px-6 py-6 text-coal-950 sm:col-span-3">
                <span className="font-display text-2xl font-black uppercase sm:text-3xl">+ Toutes les sauces Meat Love</span>
                <span className="font-display text-sm font-bold uppercase tracking-[0.24em]">Offert</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ——— Aperçu de la carte ——— */
export function MenuPreview() {
  return (
    <section aria-labelledby="carte-title" className="border-t border-ivory/10 bg-coal-900/50 py-24 sm:py-32">
      <div className={container}>
        <SectionHeading eyebrow="La carte" title={<span id="carte-title">Sept chapitres, un seul feu</span>} />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const items = productsIn(category.id);
            const paid = items.filter((p) => p.price > 0).map((p) => p.price);
            const lead = items[0];
            return (
              <Reveal as="li" key={category.id} delay={(i % 4) * 90} className={cn(category.id === "viandes-fumees" && "sm:col-span-2 lg:row-span-2")}>
                <Link
                  href={`/menu#${category.id}`}
                  className={cn(
                    "group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-ivory/10 bg-coal-950 p-6 transition-[border-color] duration-500 hover:border-ember/50",
                    category.id === "viandes-fumees" && "min-h-80 lg:min-h-full",
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "absolute top-8 right-4 text-ivory/25 transition-[color,transform] duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:text-cream/60",
                      category.id === "viandes-fumees" ? "size-56 sm:size-64 lg:top-12 lg:right-8 lg:size-72" : "size-28 sm:size-32",
                    )}
                  >
                    {lead ? <DishArt visual={lead.visual} className="dish-art size-full" /> : null}
                  </div>
                  <div className="relative flex items-center justify-between">
                    <span className="font-sans text-xs tabular-nums text-ember-bright">0{i + 1}</span>
                    <ArrowUpRight className="size-5 text-ash transition-[color,transform] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ivory" aria-hidden />
                  </div>
                  <div className="relative">
                    <h3 className={cn("font-display leading-[0.92] font-extrabold uppercase", category.id === "viandes-fumees" ? "text-5xl sm:text-6xl" : "text-3xl")}>
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-ash">
                      {items.length} produit{items.length > 1 ? "s" : ""}
                      {paid.length ? ` · dès ${formatDA(Math.min(...paid))}` : ""}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ——— Ambiance / galerie ——— */
export function Gallery() {
  if (galleryPhotos.length > 0) {
    return (
      <section aria-labelledby="galerie-title" className="py-24 sm:py-32">
        <div className={container}>
          <SectionHeading eyebrow="Ambiance" title={<span id="galerie-title">À la table Meat Love</span>} />
          <div className="mt-14 grid auto-rows-[14rem] grid-cols-2 gap-4 md:auto-rows-[18rem] md:grid-cols-4">
            {galleryPhotos.slice(0, 6).map((src, i) => (
              <Reveal
                key={src}
                delay={i * 80}
                className={cn("relative overflow-hidden rounded-[1.25rem]", i === 0 && "col-span-2 row-span-2", i === 3 && "md:col-span-2")}
              >
                <Image src={src} alt={`Meat Love — photo ${i + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] hover:scale-105" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Sans photos réelles : mosaïque éditoriale (illustrations + manifeste).
  const tiles = [
    { visual: "brisket-burger", text: "Smoked Brisket Burger", span: "col-span-2 row-span-2" },
    { visual: "lamb-neck", text: "Braise allumée à midi", span: "" },
    { visual: "smoked-chicken", text: "Poulet fumé", span: "" },
    { visual: "soup", text: "Produits frais du jour", span: "md:col-span-2" },
  ] as const;
  return (
    <section aria-labelledby="galerie-title" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeading eyebrow="Ambiance" title={<span id="galerie-title">Fumée, braise &amp; partage</span>} />
        <div className="mt-14 grid auto-rows-[12rem] grid-cols-2 gap-4 md:auto-rows-[16rem] md:grid-cols-4">
          {tiles.map((tile, i) => (
            <Reveal
              key={tile.text}
              delay={i * 90}
              className={cn(
                "group relative flex items-end overflow-hidden rounded-[1.25rem] border border-ivory/10 bg-coal-900 p-5",
                tile.span,
              )}
            >
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,color-mix(in_oklab,var(--color-ember)_40%,transparent),transparent_65%)]" />
              <DishArt visual={tile.visual} className="dish-art absolute inset-0 m-auto h-[80%] w-[80%] text-cream/70 transition-transform duration-[1400ms] ease-out-expo group-hover:scale-105" />
              <p className={cn("relative font-serif leading-none italic", i === 0 ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl")}>{tile.text}</p>
            </Reveal>
          ))}
        </div>
        <SetupHint className="mt-6">
          Galerie : les photos du restaurant et des plats remplaceront automatiquement ces visuels dès qu&apos;elles seront
          fournies.
        </SetupHint>
      </div>
    </section>
  );
}

/* ——— Histoire (extrait) ——— */
export function StoryTeaser() {
  return (
    <section aria-labelledby="histoire-title" className="relative overflow-hidden border-y border-ivory/10 bg-coal-900 py-28 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_oklab,var(--color-ember)_22%,transparent),transparent_70%)]" />
      <div className={cn(container, "relative text-center")}>
        <Reveal>
          <Eyebrow className="justify-center">Notre histoire</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 id="histoire-title" className="mx-auto mt-8 max-w-5xl font-serif text-[clamp(2.4rem,6vw,5.2rem)] leading-[1.02] text-balance">
            Produits frais du jour, pain brioché maison et <span className="text-ember-bright italic">braise allumée à midi.</span>
          </h2>
        </Reveal>
        <Reveal delay={200} className="mt-12">
          <ButtonLink href="/notre-histoire" variant="outline">
            Découvrir notre histoire
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ——— Accès & contact ——— */
export function VisitUs() {
  const hasAny = site.address || site.phone || site.openingHours;
  return (
    <section aria-labelledby="visite-title" className="py-24 sm:py-32">
      <div className={cn(container, "grid gap-12 lg:grid-cols-2 lg:items-end")}>
        <SectionHeading
          eyebrow="Nous rendre visite"
          title={<span id="visite-title">La braise vous attend</span>}
          intro={<p>Toutes nos coordonnées sont réunies sur la page contact. En attendant, composez votre commande depuis la carte.</p>}
        />
        <Reveal delay={120} className="space-y-4">
          {hasAny ? (
            <ul className="divide-y divide-ivory/10 rounded-[1.5rem] border border-ivory/10">
              {site.address ? (
                <li className="flex gap-4 p-5">
                  <MapPin className="mt-1 size-5 text-ember-bright" aria-hidden />
                  <span>
                    {site.address.street}, {site.address.city}
                  </span>
                </li>
              ) : null}
              {site.phone ? (
                <li className="flex gap-4 p-5">
                  <Phone className="mt-1 size-5 text-ember-bright" aria-hidden />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-glow">
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {site.openingHours ? (
                <li className="flex gap-4 p-5">
                  <Clock className="mt-1 size-5 text-ember-bright" aria-hidden />
                  <span>{site.openingHours.map((h) => `${h.days} : ${h.hours}`).join(" · ")}</span>
                </li>
              ) : null}
            </ul>
          ) : (
            <SetupHint>
              Adresse, téléphone et horaires apparaîtront ici dès qu&apos;ils auront été confirmés par le restaurant.
            </SetupHint>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Contact &amp; accès</ButtonLink>
            <ButtonLink href="/menu" variant="outline">
              Voir le menu
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
