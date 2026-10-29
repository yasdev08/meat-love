import type { Metadata } from "next";
import type { VisualKey } from "@/data/menu";
import { SMOKED_MEAT_INCLUDES } from "@/data/menu";
import { cn } from "@/lib/cn";
import { DishArt } from "@/components/illustrations/DishArt";
import { EmberField } from "@/components/home/EmberField";
import { ButtonLink } from "@/components/ui/Button";
import { OrderButton } from "@/components/cart/OrderButton";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Notre histoire — le feu, la viande, l'amour",
  description:
    "Meat Love : produits frais du jour, pain brioché maison et braise allumée à midi. Une cuisine de feu et de fumée autour de l'agneau, des burgers et du poulet.",
  alternates: { canonical: "/notre-histoire" },
  openGraph: { title: "Notre histoire · Meat Love", url: "/notre-histoire" },
};

const container = "mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10";

const pillars: { title: string; text: string; visual: VisualKey }[] = [
  {
    title: "Produits frais du jour",
    text: "Tout commence par le produit. Frais du jour, il donne le ton de chaque assiette qui quitte la cuisine.",
    visual: "chicken-plate",
  },
  {
    title: "Pain brioché maison",
    text: "Le pain brioché est fait maison. Moelleux et doré, il accompagne la viande sans jamais lui voler la vedette.",
    visual: "brioche",
  },
  {
    title: "Braise allumée à midi",
    text: "À midi, la braise s'allume. Commence alors le travail du feu : la chaleur, la fumée, la patience.",
    visual: "lamb-shoulder",
  },
];

export default function StoryPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden pt-[calc(var(--header-h)+5rem)] pb-24 sm:pb-36">
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-20 h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_oklab,var(--color-ember)_32%,transparent),transparent_70%)]" />
        <EmberField density={28} className="absolute inset-0 -z-10 size-full" />
        <div className={container}>
          <Reveal>
            <Eyebrow>Notre histoire</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-8 font-display text-[clamp(3.6rem,13vw,10rem)] leading-[0.84] font-black uppercase">
              Une cuisine
              <br />
              de <span className="font-serif font-normal normal-case italic text-ember-bright">feu</span>
            </h1>
          </Reveal>
          <Reveal delay={200} className="mt-12 max-w-2xl">
            <p className="font-serif text-2xl leading-snug text-cream sm:text-3xl">
              Le feu. La viande. L&apos;amour. Chez Meat Love, ces trois mots tiennent lieu de recette : une cuisine de braise
              et de fumée, franche et généreuse.
            </p>
          </Reveal>
        </div>
      </header>

      <section aria-label="Nos engagements" className="border-t border-ivory/10">
        {pillars.map((pillar, i) => (
          <div key={pillar.title} className={cn("border-b border-ivory/10", i % 2 === 1 && "bg-coal-900")}>
            <div className={cn(container, "grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20")}>
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <p className="font-display text-[clamp(5rem,14vw,11rem)] leading-none font-black text-ivory/[0.07] tabular-nums">0{i + 1}</p>
                <h2 className="-mt-8 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-extrabold uppercase sm:-mt-12">
                  {pillar.title}
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/80">{pillar.text}</p>
              </Reveal>
              <Reveal delay={120} className="relative mx-auto aspect-square w-full max-w-md">
                <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_75%,color-mix(in_oklab,var(--color-ember)_40%,transparent),transparent_70%)]" />
                <div aria-hidden className="absolute inset-[8%] rounded-full border border-ivory/10" />
                <DishArt visual={pillar.visual} className="dish-art absolute inset-[14%] text-cream/85" />
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      <section aria-labelledby="table-title" className="py-24 sm:py-36">
        <div className={cn(container, "grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20")}>
          <Reveal>
            <Eyebrow>L&apos;hospitalité</Eyebrow>
            <h2 id="table-title" className="mt-6 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] font-extrabold uppercase">
              La table, généreuse
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-serif text-2xl leading-snug text-cream italic sm:text-3xl">{SMOKED_MEAT_INCLUDES}</p>
            <p className="mt-8 text-lg leading-relaxed text-cream/75">
              Épaule d&apos;agneau, Lamb Tchang, collier d&apos;agneau ou Bouzelouf : la viande fumée est au centre de la table,
              entourée de tout ce qui l&apos;accompagne.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-ivory/10 bg-coal-900 py-24 text-center sm:py-32">
        <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-[100%] bg-ember/25 blur-3xl" />
        <div className={cn(container, "relative")}>
          <Reveal>
            <h2 id="cta-title" className="font-serif text-[clamp(2.6rem,7vw,5.5rem)] leading-none">
              À table<span className="text-ember-bright">.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/menu">Découvrir le menu</ButtonLink>
            <OrderButton variant="outline">Commander</OrderButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
