import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DATASTAR - Jorge Abreu-Vicente, PhD | Data Science & AI Research",
  description: "Empowering businesses with cutting-edge data engineering and AI solutions. Specializing in astrophysics, machine learning, and transforming complex data into actionable insights.",
  keywords: ["data science", "AI", "machine learning", "astrophysics", "research", "data engineering"],
  authors: [{ name: "Jorge Abreu-Vicente, PhD" }],
  creator: "Jorge Abreu-Vicente, PhD",
  publisher: "DATASTAR",
  metadataBase: new URL('https://datastar.space'),
  openGraph: {
    title: "DATASTAR - Jorge Abreu-Vicente, PhD",
    description: "Data Science, AI & Research",
    url: "https://datastar.space",
    siteName: "DATASTAR",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DATASTAR - Jorge Abreu-Vicente, PhD",
    description: "Data Science, AI & Research",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const dynamic = 'force-static'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a2845" />
        {/* Inter Font for Better Readability */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}