import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0e14",
          color: "#fdfcfa",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
