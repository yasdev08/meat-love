import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone, Share2, ShoppingBag } from "lucide-react";
import { missingBusinessInfo, site } from "@/data/site";
import { normalizeWhatsAppNumber } from "@/lib/order";
import { cn } from "@/lib/cn";
import { SocialIcon, socialLabel } from "@/components/layout/SocialIcon";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { HoursList } from "@/components/ui/HoursList";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SetupHint } from "@/components/ui/SetupHint";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Contact, horaires & accès",
  description: `Appelez Meat Love au ${site.phone?.display ?? ""} pour commander ou réserver. Ouvert 7j/7 de 12:00 à 01:00 (vendredi dès 19:00). Sur place, à emporter ou en livraison. Itinéraire Google Maps.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact & horaires · Meat Love", url: "/contact" },
};

const container = "mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10";

function InfoCard({ icon, title, children, className }: { icon: ReactNode; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-[1.5rem] border border-ivory/10 bg-coal-900 p-6 sm:p-8", className)}>
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-ember/15 text-ember-bright">{icon}</span>
        <h2 className="font-display text-xl font-bold uppercase tracking-[0.14em]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const whatsappDigits = site.whatsapp ? normalizeWhatsAppNumber(site.whatsapp) : null;
  const missing = missingBusinessInfo();

  return (
    <>
      <RestaurantJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Contact", path: "/contact" }]} />
      <header className="relative overflow-hidden pt-[calc(var(--header-h)+4rem)] pb-14 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-[-10%] h-[34rem] w-[34rem] rounded-full bg-ember/20 blur-[120px]" />
        <div className={cn(container, "relative")}>
          <Reveal>
            <Eyebrow>Contact &amp; accès</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(3.6rem,12vw,9rem)] leading-[0.84] font-black uppercase">
              Venez <span className="font-serif font-normal normal-case italic text-ember-bright">à la braise</span>
            </h1>
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <OpenStatus className="text-base" />
          </Reveal>
        </div>
      </header>

      <section aria-label="Coordonnées" className="pb-24 sm:pb-32">
        <div className={cn(container, "grid gap-6 lg:grid-cols-2")}>
          <Reveal className="grid content-start gap-6 sm:grid-cols-2">
            {site.phone ? (
              <InfoCard icon={<Phone className="size-5" aria-hidden />} title="Commander" className="sm:col-span-2">
                <a href={`tel:${site.phone.tel}`} className="font-display text-4xl font-black tracking-wide text-ivory hover:text-glow sm:text-5xl">
                  {site.phone.display}
                </a>
                <p className="text-cream/80">Pour commander ou réserver : appelez-nous, on s&apos;occupe du reste.</p>
                <a href={`tel:${site.phone.tel}`} className={buttonClass("primary", "self-start")}>
                  <Phone className="size-5" aria-hidden /> Appeler
                </a>
              </InfoCard>
            ) : null}

            <InfoCard icon={<ShoppingBag className="size-5" aria-hidden />} title="Services">
              <ul className="flex flex-wrap gap-2">
                {site.services.map((service) => (
                  <li key={service} className="rounded-full border border-ivory/15 px-4 py-2 text-cream">
                    {service}
                  </li>
                ))}
              </ul>
            </InfoCard>

            {site.map ? (
              <InfoCard icon={<MapPin className="size-5" aria-hidden />} title="Adresse">
                {site.address.street ? (
                  <address className="not-italic text-lg leading-relaxed text-cream">
                    {site.address.street}
                    {site.address.city ? (
                      <>
                        <br />
                        {site.address.postalCode} {site.address.city}
                      </>
                    ) : null}
                  </address>
                ) : null}
                <a
                  href={site.map.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-cream underline-offset-4 hover:text-glow hover:underline"
                >
                  Voir l&apos;itinéraire sur Google Maps <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </InfoCard>
            ) : null}

            {whatsappDigits ? (
              <InfoCard icon={<MessageCircle className="size-5" aria-hidden />} title="WhatsApp">
                <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="text-lg text-cream hover:text-glow">
                  {site.whatsapp}
                </a>
              </InfoCard>
            ) : null}

            {site.socials.length > 0 ? (
              <InfoCard icon={<Share2 className="size-5" aria-hidden />} title="Suivez-nous" className="sm:col-span-2">
                <ul className="flex flex-wrap gap-3">
                  {site.socials.map((social) => (
                    <li key={social.url}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-ivory/15 px-4 text-cream transition-colors hover:border-ember hover:text-ember-bright"
                        aria-label={`${socialLabel[social.network]} : ${social.handle ?? site.name}`}
                      >
                        <SocialIcon network={social.network} className="size-5" />
                        <span>{socialLabel[social.network]}</span>
                        {social.handle && social.handle !== site.name ? <span className="text-ash">{social.handle}</span> : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            ) : null}
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            <InfoCard icon={<Clock className="size-5" aria-hidden />} title="Horaires">
              <HoursList />
              <p className="text-sm text-ash">
                {site.hoursNote} — dernière commande à {site.lastOrder}.
              </p>
            </InfoCard>

            {site.map ? (
              <a
                href={site.map.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative isolate flex min-h-64 flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-[1.5rem] border border-ivory/10 bg-coal-900 p-8 text-center transition-colors hover:border-ember/50"
              >
                <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(244_236_224/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(244_236_224/0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
                <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--color-ember)_22%,transparent),transparent_60%)]" />
                <span className="relative grid size-16 place-items-center rounded-full bg-ember text-coal-950 shadow-[0_0_60px_-5px_var(--color-ember)] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
                  <MapPin className="size-7" aria-hidden />
                </span>
                <span className="font-serif text-3xl italic">Nous trouver</span>
                <span className={buttonClass("outline", "pointer-events-none")}>
                  Ouvrir dans Google Maps <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </a>
            ) : null}
          </Reveal>
        </div>

        {site.showSetupHints && missing.length > 0 ? (
          <div className={cn(container, "mt-10")}>
            <SetupHint>À compléter : {missing.join(", ")}.</SetupHint>
          </div>
        ) : null}

        <div className={cn(container, "mt-16 flex flex-col gap-3 sm:flex-row")}>
          <ButtonLink href="/menu">Découvrir le menu</ButtonLink>
        </div>
      </section>
    </>
  );
}
