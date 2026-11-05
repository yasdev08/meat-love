import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meat Love",
    short_name: "Meat Love",
    description: "Viandes fumées, grillades au charbon, burgers et sauces maison.",
    categories: ["food", "restaurant"],
    start_url: "/",
    display: "standalone",
    background_color: "#0a0807",
    theme_color: "#0a0807",
    lang: "fr",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
