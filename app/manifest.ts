import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meat Love",
    short_name: "Meat Love",
    description: "Viandes fumées, agneau, burgers et poulet grillé.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0807",
    theme_color: "#0a0807",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
