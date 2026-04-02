import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery — DATASTAR",
  description: "Astrophotography and photography by Jorge Abreu-Vicente. Moon, Sun, planets, and more — captured from Lisbon with an 8\" SCT.",
  openGraph: {
    title: "Gallery — DATASTAR",
    description: "Astrophotography by Jorge Abreu-Vicente. Moon, Sun, planets, captured from Lisbon.",
    images: [
      {
        url: "https://res.cloudinary.com/df3dsbfgt/image/upload/q_auto/f_auto/v1775125396/2026-02-26-2058_copernico_eratostenes_alma_scy8ax.png",
        width: 1200,
        height: 800,
        alt: "Moon craters Copernicus and Eratosthenes",
      },
    ],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
