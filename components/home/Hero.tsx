import Image from "next/image";
import { ArrowDown, Phone } from "lucide-react";
import { site } from "@/data/site";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { heroPhoto } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { OrderButton } from "@/components/cart/OrderButton";
import logo from "@/public/brand/meat-love-logo-light.png";
import { EmberField } from "./EmberField";

const RING_TEXT = "Produits frais du jour • Pain brioché maison • Braise allumée à midi • ";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-[var(--header-h)]">
      {/* Fond : photo réelle si fournie, sinon composition « braise et fumée ». */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-coal-950">
        {heroPhoto ? (
          <>
            <Image src={heroPhoto} alt="" fill priority sizes="100vw" className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-coal-950 via-coal-950/70 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute -bottom-[30%] left-1/2 h-[80vmax] w-[120vmax] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-ember)_55%,transparent),color-mix(in_oklab,var(--color-ember-deep)_25%,transparent)_45%,transparent)] opacity-70 animate-flicker" />
            <div className="absolute top-[10%] -left-[20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(244_236_224/0.07),transparent)] blur-2xl animate-drift" />
            <div className="absolute top-[30%] right-[-25%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(closest-side,rgb(244_236_224/0.05),transparent)] blur-2xl animate-drift [animation-delay:-12s]" />
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-coal-950 to-transparent" />
      </div>
      <EmberField className="absolute inset-0 -z-10 size-full" />

      <div className="mx-auto grid w-full max-w-[88rem] items-end gap-12 px-4 pb-14 sm:px-6 sm:pb-20 lg:grid-cols-[1.25fr_1fr] lg:px-10 lg:pb-24">
        <div>
          <p className="hero-in flex items-center gap-3 font-display text-sm font-bold uppercase tracking-[0.34em] text-ember-bright">
            <span aria-hidden className="h-px w-10 bg-ember" />
            Smokehouse · Grill · Fait maison
          </p>
          <h1 id="hero-title" className="mt-6 font-display leading-[0.9] font-black uppercase">
            <span className="hero-in block whitespace-nowrap text-[clamp(3.5rem,13vw,9.25rem)] [animation-delay:80ms]">Le feu.</span>
            <span className="hero-in block whitespace-nowrap text-[clamp(3.5rem,13vw,9.25rem)] [animation-delay:180ms]">La viande.</span>
            <span className="hero-in mt-1 block font-serif text-[clamp(3.8rem,14vw,10rem)] leading-[0.9] font-normal normal-case italic text-ember-bright [animation-delay:280ms]">
              L&apos;amour.
            </span>
          </h1>
          <p className="hero-in mt-8 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl [animation-delay:400ms]">
            Produits frais du jour, pain brioché maison et braise allumée à midi.
          </p>
          <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:500ms]">
            <ButtonLink href="/menu">Découvrir le menu</ButtonLink>
            <OrderButton variant="outline">Commander</OrderButton>
          </div>
          <div className="hero-in mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 [animation-delay:600ms]">
            <OpenStatus />
            {site.phone ? (
              <a href={`tel:${site.phone.tel}`} className="inline-flex min-h-11 items-center gap-2 text-cream transition-colors hover:text-glow sm:min-h-0">
                <Phone className="size-4 text-ember-bright" aria-hidden />
                <span className="font-display text-lg font-bold tracking-wide">{site.phone.display}</span>
              </a>
            ) : null}
            <span className="text-ash">{site.services.join(" · ")}</span>
          </div>
        </div>

        {/* Médaillon : viande fumée sur la braise, texte circulaire. */}
        <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[30rem] lg:block">
          <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_50%_70%,color-mix(in_oklab,var(--color-ember)_45%,transparent),color-mix(in_oklab,var(--color-coal-900)_90%,transparent)_70%)] shadow-[0_0_120px_-10px_var(--color-ember-deep)]" />
          <div className="absolute inset-[14%] rounded-full border border-ivory/10" />
          <Image src={logo} alt="" sizes="320px" priority className="absolute inset-0 m-auto h-auto w-[50%] drop-shadow-[0_8px_30px_rgb(0_0_0/0.6)]" />
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-[spin_60s_linear_infinite] text-cream/70">
            <defs>
              <path id="hero-ring" d="M100 100 m-88 0 a88 88 0 1 1 176 0 a88 88 0 1 1 -176 0" />
            </defs>
            <text className="font-display text-[9.4px] font-bold uppercase" letterSpacing="2.6" fill="currentColor">
              <textPath href="#hero-ring">{RING_TEXT}</textPath>
            </text>
          </svg>
        </div>
      </div>

      <a
        href="#signatures"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-ash uppercase transition-colors hover:text-ivory md:flex"
      >
        Défiler
        <ArrowDown className="size-4 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
