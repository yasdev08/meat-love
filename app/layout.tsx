import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Serif, Inter_Tight, Noto_Kufi_Arabic } from "next/font/google";
import { site } from "@/data/site";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductDialogProvider } from "@/components/menu/ProductDialog";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin", "latin-ext"],
  variable: "--font-big-shoulders",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});
const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const sans = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-inter-tight", display: "swap" });
const arabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi-arabic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Meat Love — Viandes fumées, grillades au charbon & burgers",
    template: "%s · Meat Love",
  },
  description: site.description,
  applicationName: "Meat Love",
  keywords: [
    "Meat Love",
    "restaurant",
    "viandes fumées",
    "agneau fumé",
    "épaule d'agneau",
    "grillades au charbon",
    "burger",
    "smash burger",
    "smoked brisket burger",
    "poulet fumé",
    "livraison",
    "à emporter",
    "Algérie",
  ],
  category: "restaurant",
  creator: "Meat Love",
  formatDetection: { telephone: true, address: false, email: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    siteName: "Meat Love",
    title: "Meat Love — Le feu. La viande. L'amour.",
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "Meat Love — Le feu. La viande. L'amour.", description: site.description },
  alternates: { canonical: "/" },
  other: site.phone ? { "contact:phone_number": site.phone.tel } : {},
};

export const viewport: Viewport = {
  themeColor: "#0a0807",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${serif.variable} ${sans.variable} ${arabic.variable} antialiased`}>
      <body className="grain min-h-dvh overflow-x-clip">
        <CartProvider>
          <ProductDialogProvider>
            <SiteHeader />
            <main id="contenu" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
            <CartDrawer />
          </ProductDialogProvider>
        </CartProvider>
      </body>
    </html>
  );
}
