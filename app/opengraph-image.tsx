import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#221509",
          color: "#f8f6ef",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, letterSpacing: 10, fontWeight: 500 }}>
          MAVRIKIOS
        </div>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, color: "#e3cd94", marginTop: 28 }}>
          Jewellery Boutique, Nicosia, since {siteConfig.since}
        </div>
      </div>
    ),
    { ...size }
  );
}
