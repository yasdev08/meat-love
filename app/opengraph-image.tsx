import { ImageResponse } from "next/og";

export const alt = "Meat Love — Le feu. La viande. L'amour.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse at 50% 120%, #a63a19 0%, #2a120a 40%, #0a0807 70%)",
          color: "#f4ece0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 10, color: "#f27a3e", textTransform: "uppercase" }}>
          Smokehouse · Grill · Fait maison
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: 6, lineHeight: 1 }}>MEAT LOVE</div>
          <div style={{ fontSize: 56, marginTop: 24, color: "#e6d9c3", fontStyle: "italic" }}>
            Le feu. La viande. L&apos;amour.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a89a87" }}>
          Produits frais du jour, pain brioché maison et braise allumée à midi.
        </div>
      </div>
    ),
    size,
  );
}
