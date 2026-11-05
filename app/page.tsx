import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Complimentary, Gallery, MenuPreview, Signatures, Smokehouse, StoryTeaser, VisitUs } from "@/components/home/Sections";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
// Le titre et la description par défaut (app/layout.tsx) s'appliquent à l'accueil.

export default function HomePage() {
  return (
    <>
      <RestaurantJsonLd />
      <Hero />
      <Signatures />
      <Smokehouse />
      <MenuPreview />
      <Complimentary />
      <Gallery />
      <StoryTeaser />
      <VisitUs />
    </>
  );
}
