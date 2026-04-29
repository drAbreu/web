"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Language } from "@/lib/i18n";
import "../permafrost.css";

interface Props {
  frontmatter: Record<string, unknown>;
  mdxContent: React.ReactElement;
  readingTime: number;
  headings: { text: string; id: string }[];
  slug: string;
  lang: string;
  alternateSlug: string | null;
  alternateLang: "en" | "es" | null;
}

const labels = {
  en: {
    back: "← All Chapters",
    minRead: "min read",
    switchLang: "ES",
  },
  es: {
    back: "← Todos los Capítulos",
    minRead: "min lectura",
    switchLang: "EN",
  },
};

export default function PermafrostPostClient({
  frontmatter: fm,
  mdxContent,
  readingTime,
  slug,
  lang: initialLang,
  alternateSlug,
  alternateLang,
}: Props) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>(initialLang as Language);
  const l = labels[language];

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved === "en" || saved === "es") setLanguage(saved);
    else setLanguage(initialLang as Language);
  }, [initialLang]);

  const handleLang = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    if (lang === alternateLang && alternateSlug) {
      router.push(`/permafrost/${alternateSlug}`);
    }
  };

  const title = String(fm.title ?? "");
  const description = String(fm.description ?? "");
  const date = String(fm.date ?? "");
  const image = fm.image ? String(fm.image) : null;
  const tags = Array.isArray(fm.tags) ? (fm.tags as string[]) : [];

  return (
    <div className="permafrost-page">
      {/* Nav */}
      <nav className="pf-nav">
        <Link href="/permafrost" className="pf-nav-back">
          {l.back}
        </Link>
        <div className="pf-nav-lang">
          <button
            className={`pf-lang-btn ${language === "en" ? "active" : ""}`}
            onClick={() => handleLang("en")}
          >
            EN
          </button>
          <button
            className={`pf-lang-btn ${language === "es" ? "active" : ""}`}
            onClick={() => handleLang("es")}
            disabled={!alternateSlug && language === "en"}
            title={!alternateSlug && language === "en" ? "Spanish version coming soon" : undefined}
          >
            ES
          </button>
        </div>
      </nav>

      {/* Post */}
      <article className="pf-post">
        <header className="pf-post-header">
          <p className="pf-post-eyebrow">Permafrost</p>
          <h1 className="pf-post-title">{title}</h1>
          {description && <p className="pf-post-description">{description}</p>}
          <div className="pf-post-meta">
            <span>
              {new Date(date).toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{readingTime} {l.minRead}</span>
            {tags.length > 0 && (
              <>
                <span>·</span>
                <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                  {tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="pf-tag">#{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {image && (
          <img src={image} alt={title} className="pf-post-cover" />
        )}

        <div className="pf-prose">{mdxContent}</div>

        {/* Newsletter CTA at end of post */}
        <div className="pf-newsletter" style={{ marginTop: "4rem" }}>
          <p style={{ fontFamily: "var(--pf-font-ui)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--pf-ice)", marginBottom: "0.5rem" }}>
            {language === "en" ? "Enjoying Permafrost?" : "¿Disfrutando Permafrost?"}
          </p>
          <p style={{ fontFamily: "var(--pf-font-ui)", fontSize: "0.9rem", color: "var(--pf-text-muted)", marginBottom: "1.25rem" }}>
            {language === "en"
              ? "Subscribe to get new chapters by email as they're published."
              : "Suscríbete para recibir nuevos capítulos por correo cuando se publiquen."}
          </p>
          <Link
            href="/permafrost"
            style={{ color: "var(--pf-ice)", fontFamily: "var(--pf-font-ui)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            {language === "en" ? "Subscribe on the main page →" : "Suscribirte en la página principal →"}
          </Link>
        </div>

        {/* Back link */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--pf-border)" }}>
          <Link href="/permafrost" className="pf-nav-back">
            {l.back}
          </Link>
        </div>
      </article>

      <footer className="pf-footer">
        <p>© {new Date().getFullYear()} Jorge Abreu-Vicente — Permafrost</p>
      </footer>
    </div>
  );
}
