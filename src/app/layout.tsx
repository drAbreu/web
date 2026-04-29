import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jorge Abreu-Vicente — Writer",
  description: "Astrophysicist, AI researcher, and writer. Author of Morgenrot (a memoir on anxiety and recovery) and Permafrost (sci-fi in progress). Stories published free, written in public.",
  keywords: ["writer", "science fiction", "memoir", "anxiety", "astrophysics", "Morgenrot", "Permafrost"],
  authors: [{ name: "Jorge Abreu-Vicente" }],
  creator: "Jorge Abreu-Vicente",
  metadataBase: new URL("https://datastar.space"),
  openGraph: {
    title: "Jorge Abreu-Vicente — Writer",
    description: "Astrophysicist, AI researcher, and writer. Stories published free, written in public.",
    url: "https://datastar.space",
    siteName: "Jorge Abreu-Vicente",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Abreu-Vicente — Writer",
    description: "Astrophysicist, AI researcher, and writer.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const dynamic = "force-static";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#080b16" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Home + About: Lora (serif display) + DM Sans (body/UI) */}
        {/* Permafrost: Oxanium (display) + Space Grotesk (UI) + Merriweather (body) */}
        {/* Morgenrot: Montserrat + Merriweather (loaded in morgenrot.css) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Oxanium:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
