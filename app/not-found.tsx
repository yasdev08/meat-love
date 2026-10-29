import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-4 pt-[var(--header-h)] text-center">
      <p className="font-display text-[clamp(6rem,22vw,14rem)] leading-none font-black text-ivory/10">404</p>
      <h1 className="-mt-6 font-serif text-4xl italic sm:text-5xl">Cette page s&apos;est envolée en fumée.</h1>
      <p className="mt-4 text-ash">La page demandée n&apos;existe pas ou a été déplacée.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
        <ButtonLink href="/menu" variant="outline">
          Voir le menu
        </ButtonLink>
      </div>
    </section>
  );
}
