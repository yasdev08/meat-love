import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Clock, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import { missingBusinessInfo, site } from "@/data/site";
import { normalizeWhatsAppNumber } from "@/lib/order";
import { cn } from "@/lib/cn";
import { SocialIcon, socialLabel } from "@/components/layout/SocialIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SetupHint } from "@/components/ui/SetupHint";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";

export const metadata: Metadata = {
  title: "Contact & accès",
  description: "Contacter Meat Love : coordonnées, horaires, localisation et réseaux sociaux.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact · Meat Love", url: "/contact" },
};

const container = "mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10";

function InfoCard({ icon, title, children, hint }: { icon: ReactNode; title: string; children: ReactNode | null; hint: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-ivory/10 bg-coal-900 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-ember/15 text-ember-bright">{icon}</span>
        <h2 className="font-display text-xl font-bold uppercase tracking-[0.14em]">{title}</h2>
      </div>
      {children ?? <SetupHint>{hint}</SetupHint>}
      {!children && !site.showSetupHints ? <p className="text-ash">Bientôt disponible.</p> : null}
    </div>
  );
}

export default function ContactPage() {
  const whatsappDigits = site.whatsapp ? normalizeWhatsAppNumber(site.whatsapp) : null;
  const missing = missingBusinessInfo();

  return (
    <>
      <RestaurantJsonLd />
      <header className="relative overflow-hidden pt-[calc(var(--header-h)+4rem)] pb-14 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-[-10%] h-[34rem] w-[34rem] rounded-full bg-ember/20 blur-[120px]" />
        <div className={cn(container, "relative")}>
          <Reveal>
            <Eyebrow>Contact &amp; accès</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(3.6rem,12vw,9rem)] leading-[0.84] font-black uppercase">
              Venez <span className="font-serif font-normal normal-case italic text-ember-bright">à la braise</span>
            </h1>
          </Reveal>
        </div>
      </header>

      <section aria-label="Coordonnées" className="pb-24 sm:pb-32">
        <div className={cn(container, "grid gap-6 lg:grid-cols-2")}>
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <InfoCard icon={<MapPin className="size-5" aria-hidden />} title="Adresse" hint="Adresse à confirmer avec le restaurant.">
              {site.address ? (
                <address className="not-italic text-lg leading-relaxed text-cream">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                  <br />
                  {site.address.country}
                </address>
              ) : null}
            </InfoCard>

            <InfoCard icon={<Phone className="size-5" aria-hidden />} title="Téléphone" hint="Numéro de téléphone à confirmer.">
              {site.phone ? (
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-lg text-cream hover:text-glow">
                  {site.phone}
                </a>
              ) : null}
            </InfoCard>

            <InfoCard
              icon={<MessageCircle className="size-5" aria-hidden />}
              title="WhatsApp"
              hint="Numéro WhatsApp à confirmer. Une fois ajouté, il active l'envoi des commandes depuis le panier."
            >
              {whatsappDigits ? (
                <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="text-lg text-cream hover:text-glow">
                  {site.whatsapp}
                </a>
              ) : null}
            </InfoCard>

            <InfoCard icon={<Clock className="size-5" aria-hidden />} title="Horaires" hint="Horaires d'ouverture à confirmer.">
              {site.openingHours ? (
                <dl className="space-y-2 text-cream">
                  {site.openingHours.map((slot) => (
                    <div key={slot.days} className="flex justify-between gap-4 border-b border-ivory/10 pb-2 last:border-0">
                      <dt>{slot.days}</dt>
                      <dd className="tabular-nums">{slot.hours}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </InfoCard>

            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <InfoCard icon={<Share2 className="size-5" aria-hidden />} title="Réseaux sociaux" hint="Liens Instagram, Facebook ou TikTok à confirmer.">
                {site.socials.length > 0 ? (
                  <ul className="flex flex-wrap gap-3">
                    {site.socials.map((social) => (
                      <li key={social.url}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-ivory/15 px-4 text-cream hover:border-ember hover:text-ember-bright"
                        >
                          <SocialIcon network={social.network} className="size-5" />
                          {social.handle ?? socialLabel[social.network]}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </InfoCard>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-ivory/10 bg-coal-900">
            {site.map?.embedUrl ? (
              <iframe
                src={site.map.embedUrl}
                title={`Carte — ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full grayscale-[0.6] invert-[0.92] hue-rotate-180"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgb(244_236_224/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(244_236_224/0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--color-ember)_18%,transparent),transparent_60%)]" />
                <MapPin className="relative size-10 text-ember-bright" aria-hidden />
                <p className="relative font-serif text-3xl italic">Plan d&apos;accès</p>
                <SetupHint className="relative max-w-sm text-left">
                  La carte s&apos;affichera ici une fois la localisation Google Maps confirmée. Aucun repère n&apos;est placé
                  sans adresse vérifiée.
                </SetupHint>
                {!site.showSetupHints ? <p className="relative text-ash">Bientôt disponible.</p> : null}
              </div>
            )}
            {site.map?.link ? (
              <a
                href={site.map.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-4 bottom-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-coal-950/85 px-5 font-display font-bold uppercase tracking-[0.14em] backdrop-blur hover:text-glow"
              >
                <MapPin className="size-4" aria-hidden /> Itinéraire
              </a>
            ) : null}
          </Reveal>
        </div>

        {site.showSetupHints && missing.length > 0 ? (
          <div className={cn(container, "mt-10")}>
            <Reveal className="rounded-[1.5rem] border border-dashed border-glow/30 p-6 sm:p-8">
              <h2 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-glow">À fournir avant la mise en ligne</h2>
              <ul className="mt-4 grid gap-2 text-cream/80 sm:grid-cols-2 lg:grid-cols-3">
                {missing.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden className="size-1.5 rounded-full bg-ember" /> {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ash">Ces encarts n&apos;apparaissent qu&apos;en mode présentation et disparaissent du site publié.</p>
            </Reveal>
          </div>
        ) : null}

        <div className={cn(container, "mt-16 flex flex-col gap-3 sm:flex-row")}>
          <ButtonLink href="/menu">Découvrir le menu</ButtonLink>
        </div>
      </section>
    </>
  );
}
