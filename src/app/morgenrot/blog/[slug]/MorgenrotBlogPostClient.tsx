"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type Language } from "@/lib/i18n";
import "../../morgenrot.css";

interface MorgenrotBlogPostClientProps {
  frontmatter: any;
  mdxContent: React.ReactElement;
  readingTime: number;
  headings: { text: string; id: string }[];
  slug: string;
  lang: string;
  alternateSlug?: string | null;
  alternateLang?: "en" | "es" | null;
}

export default function MorgenrotBlogPostClient({
  frontmatter,
  mdxContent,
  readingTime,
  slug,
  lang: initialLang,
  alternateSlug,
  alternateLang,
}: MorgenrotBlogPostClientProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>(initialLang as Language);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang);
    } else {
      setLanguage(initialLang as Language);
    }
  }, [initialLang]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);

    if (lang === alternateLang && alternateSlug) {
      router.push(`/morgenrot/blog/${alternateSlug}`);
      return;
    }

    const baseSlug = slug.replace(/-es$/, "").replace(/-en$/, "");
    const newSlug = lang === "es" ? `${baseSlug}-es` : baseSlug;
    if (newSlug !== slug) {
      router.push(`/morgenrot/blog/${newSlug}`);
    }
  };

  return (
    <div className="morgenrot-page">
      {/* Nav */}
      <nav className="morgenrot-nav">
        <div className="morgenrot-nav-container">
          <Link href="/morgenrot/blog" className="morgenrot-nav-back">
            ← {language === "es" ? "Volver al Blog" : "Back to Blog"}
          </Link>
          <div className="morgenrot-nav-lang">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`morgenrot-lang-btn ${language === "en" ? "active" : ""}`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("es")}
              className={`morgenrot-lang-btn ${language === "es" ? "active" : ""}`}
            >
              ES
            </button>
          </div>
        </div>
      </nav>

      {/* Article */}
      <main className="morgenrot-section" style={{ paddingTop: "var(--spacing-4xl)", paddingBottom: "var(--spacing-4xl)" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Header */}
          <header style={{ marginBottom: "var(--spacing-4xl)" }}>
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-5xl)",
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: "var(--spacing-lg)",
              lineHeight: "var(--leading-tight)",
            }}>
              {frontmatter.title}
            </h1>

            {frontmatter.description && (
              <p style={{
                fontSize: "var(--text-xl)",
                color: "var(--muted-foreground)",
                marginBottom: "var(--spacing-xl)",
                lineHeight: "var(--leading-relaxed)",
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
              }}>
                {frontmatter.description}
              </p>
            )}

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: "var(--muted-foreground)",
              marginBottom: "var(--spacing-4xl)",
              paddingBottom: "var(--spacing-xl)",
              borderBottom: "1px solid var(--border)",
            }}>
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString(
                  language === "es" ? "es-ES" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </time>
              {" · "}
              {readingTime} {language === "es" ? "min lectura" : "min read"}
            </p>
          </header>

          {/* Body */}
          <article style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--leading-relaxed)",
            color: "var(--foreground)",
          }}>
            {mdxContent}
          </article>

          {/* Footer nav */}
          <div style={{
            marginTop: "var(--spacing-4xl)",
            paddingTop: "var(--spacing-2xl)",
            borderTop: "1px solid var(--border)",
          }}>
            <Link href="/morgenrot/blog" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--spacing-sm)",
              color: "var(--primary)",
              fontSize: "var(--text-lg)",
              fontWeight: 600,
              textDecoration: "none",
            }}>
              ← {language === "es" ? "Volver al Blog" : "Back to Blog"}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
