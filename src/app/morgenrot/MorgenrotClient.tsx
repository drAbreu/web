"use client";

import { useState } from "react";
import Link from "next/link";
import { translations, type Language } from "@/lib/i18n";
import { BlogPost } from "@/lib/mdx";
import MorgenrotHero from "@/components/morgenrot/MorgenrotHero";
import MorgenrotWhatIs from "@/components/morgenrot/MorgenrotWhatIs";
import MorgenrotGlimpse from "@/components/morgenrot/MorgenrotGlimpse";
import MorgenrotJournal from "@/components/morgenrot/MorgenrotJournal";
import MorgenrotAuthor from "@/components/morgenrot/MorgenrotAuthor";
import MorgenrotFooter from "@/components/morgenrot/MorgenrotFooter";
import "./morgenrot.css";

interface MorgenrotClientProps {
  morgenrotPosts?: BlogPost[];
}

export default function MorgenrotClient({ morgenrotPosts = [] }: MorgenrotClientProps) {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language].morgenrot;

  return (
    <div className="morgenrot-page">
      {/* Navigation Bar */}
      <nav className="morgenrot-nav">
        <div className="morgenrot-nav-container">
          <Link href="/" className="morgenrot-nav-back">
            {t.nav.backToMain}
          </Link>
          <div className="morgenrot-nav-lang">
            <button
              onClick={() => setLanguage("en")}
              className={`morgenrot-lang-btn ${language === "en" ? "active" : ""}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("es")}
              className={`morgenrot-lang-btn ${language === "es" ? "active" : ""}`}
            >
              ES
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <MorgenrotHero t={t} />

      {/* What Is Morgenrot */}
      <MorgenrotWhatIs t={t} />

      {/* Glimpse Inside */}
      <MorgenrotGlimpse t={t} />

      {/* Journal/Blog Section */}
      <MorgenrotJournal t={t} language={language} posts={morgenrotPosts} />

      {/* Author Section */}
      <MorgenrotAuthor t={t} />

      {/* Footer */}
      <MorgenrotFooter />
    </div>
  );
}
