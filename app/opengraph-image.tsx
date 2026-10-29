import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Meat Love — Le feu. La viande. L'amour.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/meat-love-logo-light.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(ellipse at 70% 120%, #9b2b1c 0%, #2a110b 42%, #0a0807 72%)",
          color: "#f4ece0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#ef6542", textTransform: "uppercase" }}>
            Smokehouse · Grill · Fait maison
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 900, lineHeight: 1, marginTop: 28 }}>
            <span>Le feu.</span>
            <span>La viande.</span>
            <span style={{ color: "#ef6542", fontStyle: "italic" }}>L&apos;amour.</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a89a87", marginTop: 32 }}>
            Produits frais du jour, pain brioché maison et braise allumée à midi.
          </div>
        </div>
        <img src={logoSrc} width={440} height={360} alt="" style={{ objectFit: "contain" }} />
      </div>
    ),
    size,
  );
}
