import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About & Contact | Dr. Jorge Abreu-Vicente",
  description: "Learn about Dr. Jorge Abreu-Vicente, an astrophysicist turned AI/ML researcher specializing in biomedical sciences. Get in touch for collaborations and inquiries.",
  keywords: [
    "Jorge Abreu-Vicente",
    "astrophysicist",
    "data scientist",
    "AI researcher",
    "machine learning",
    "biomedical AI",
    "EMBO",
    "contact",
  ],
  openGraph: {
    title: "About & Contact | Dr. Jorge Abreu-Vicente",
    description: "Learn about Dr. Jorge Abreu-Vicente, an astrophysicist turned AI/ML researcher specializing in biomedical sciences.",
    type: "profile",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
