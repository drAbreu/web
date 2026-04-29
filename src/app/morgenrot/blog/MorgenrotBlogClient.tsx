"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { translations, type Language } from "@/lib/i18n";
import type { BlogPost } from "@/lib/mdx";
import NewsletterSignup from "@/components/NewsletterSignup";
import "../morgenrot.css";

interface MorgenrotBlogClientProps {
  posts: BlogPost[];
}

function calculateReadingTime(content: string): number {
  return Math.ceil(content.trim().split(/\s+/).length / 200);
}

export default function MorgenrotBlogClient({ posts }: MorgenrotBlogClientProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [view, setView] = useState<"cards" | "list">("cards");
  const t = translations[language].morgenrot;

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang === "en" || savedLang === "es") setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const filteredByLanguage = useMemo(() => {
    return posts
      .filter((p) => p.lang === language)
      .sort((a, b) => {
        const aPin = a.slug.includes("beginning-of-morgenrot");
        const bPin = b.slug.includes("beginning-of-morgenrot");
        if (aPin && !bPin) return -1;
        if (!aPin && bPin) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [posts, language]);

  return (
    <div className="morgenrot-page">
      {/* Nav */}
      <nav className="morgenrot-nav">
        <div className="morgenrot-nav-container">
          <Link href="/morgenrot" className="morgenrot-nav-back">
            ← {language === "en" ? "Back to Morgenrot" : "Volver a Morgenrot"}
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

      {/* Hero */}
      <section className="morgenrot-section" style={{ paddingTop: "var(--spacing-4xl)", paddingBottom: "var(--spacing-3xl)" }}>
        <div className="morgenrot-container" style={{ textAlign: "center" }}>
          <h1 className="morgenrot-section-title" style={{ fontSize: "var(--text-5xl)", marginBottom: "var(--spacing-lg)" }}>
            {t.journal.title}
          </h1>
          <p style={{ fontSize: "var(--text-xl)", color: "var(--muted-foreground)", maxWidth: "700px", margin: "0 auto var(--spacing-3xl)", lineHeight: "var(--leading-relaxed)" }}>
            {t.journal.description}
          </p>

          {/* Newsletter */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--spacing-2xl)" }}>
            <NewsletterSignup variant="light" language={language} projectName="Morgenrot" />
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="morgenrot-section" style={{ paddingTop: 0 }}>
        <div className="morgenrot-container">
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "var(--spacing-2xl)",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "var(--text-lg)", color: "var(--foreground)" }}>
              {filteredByLanguage.length} {language === "en" ? "entries" : "entradas"}
            </p>

            {/* View toggle */}
            <div
              style={{
                display: "flex",
                gap: "0.25rem",
                background: "var(--muted)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.25rem",
              }}
            >
              <ToggleBtn label={language === "en" ? "Cards" : "Tarjetas"} icon="grid" active={view === "cards"} onClick={() => setView("cards")} />
              <ToggleBtn label={language === "en" ? "List" : "Lista"} icon="list" active={view === "list"} onClick={() => setView("list")} />
            </div>
          </div>

          {filteredByLanguage.length === 0 ? (
            <div style={{ textAlign: "center", padding: "var(--spacing-4xl)", color: "var(--muted-foreground)" }}>
              <p style={{ fontSize: "var(--text-xl)" }}>
                {language === "en" ? "No entries yet. Check back soon!" : "Aún no hay entradas. ¡Vuelve pronto!"}
              </p>
            </div>
          ) : view === "cards" ? (
            <div className="journal-grid">
              {filteredByLanguage.map((post) => (
                <CardItem key={post.slug} post={post} language={language} t={t} />
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filteredByLanguage.map((post, i) => (
                <ListItem key={post.slug} post={post} index={i} language={language} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .morgenrot-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }

        .journal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--spacing-2xl);
        }

        @media (max-width: 640px) {
          .journal-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function ToggleBtn({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: "grid" | "list";
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.375rem 0.875rem",
        borderRadius: "calc(var(--radius) - 2px)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: active ? 600 : 400,
        color: active ? "var(--primary-foreground)" : "var(--muted-foreground)",
        background: active ? "var(--primary)" : "transparent",
        transition: "all 0.15s ease",
      }}
    >
      {icon === "grid" ? (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
          <rect x="0" y="0" width="5.5" height="5.5" rx="1" />
          <rect x="7.5" y="0" width="5.5" height="5.5" rx="1" />
          <rect x="0" y="7.5" width="5.5" height="5.5" rx="1" />
          <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
          <rect x="0" y="0.5" width="13" height="2" rx="1" />
          <rect x="0" y="5.5" width="13" height="2" rx="1" />
          <rect x="0" y="10.5" width="13" height="2" rx="1" />
        </svg>
      )}
      {label}
    </button>
  );
}

function CardItem({
  post,
  language,
  t,
}: {
  post: BlogPost;
  language: Language;
  t: { journal: { readMore: string } };
}) {
  const readTime = calculateReadingTime(post.content);
  const isPinned = post.slug.includes("beginning-of-morgenrot");

  return (
    <Link href={`/morgenrot/blog/${post.slug}`}>
      <article className="journal-card morgenrot-card">
        {post.image && (
          <div className="journal-image-container">
            <img src={post.image} alt={post.title} className="journal-image" />
            {isPinned && (
              <div className="pinned-badge">
                📌 {language === "en" ? "START HERE" : "EMPIEZA AQUÍ"}
              </div>
            )}
          </div>
        )}
        <div className="journal-content">
          <div className="journal-meta">
            <span className="journal-date">
              {new Date(post.date).toLocaleDateString(
                language === "en" ? "en-US" : "es-ES",
                { year: "numeric", month: "short", day: "numeric" }
              )}
            </span>
            <span style={{ color: "var(--muted-foreground)", fontSize: "var(--text-sm)" }}>
              {readTime} {language === "en" ? "min" : "min"}
            </span>
          </div>
          <h3 className="journal-title">{post.title}</h3>
          <p className="journal-excerpt">{post.description}</p>
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm)", marginBottom: "var(--spacing-lg)" }}>
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "var(--spacing-xs) var(--spacing-sm)",
                    backgroundColor: "var(--accent-light)",
                    color: "var(--accent-foreground)",
                    borderRadius: "var(--radius)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="journal-link-container">
            <span className="journal-link">{t.journal.readMore} →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ListItem({
  post,
  index,
  language,
  t,
}: {
  post: BlogPost;
  index: number;
  language: Language;
  t: { journal: { readMore: string } };
}) {
  const readTime = calculateReadingTime(post.content);
  const isPinned = post.slug.includes("beginning-of-morgenrot");

  return (
    <Link
      href={`/morgenrot/blog/${post.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1.25rem",
          padding: "1.25rem 0",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.15s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--muted)"; (e.currentTarget as HTMLElement).style.padding = "1.25rem 0.75rem"; (e.currentTarget as HTMLElement).style.margin = "0 -0.75rem"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.padding = "1.25rem 0"; (e.currentTarget as HTMLElement).style.margin = "0"; }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--primary)",
            width: "2.5rem",
            flexShrink: 0,
            paddingTop: "0.1rem",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-xl)",
                fontWeight: 600,
                color: "var(--foreground)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </h3>
            {isPinned && (
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  background: "var(--accent-light)",
                  color: "var(--accent-foreground)",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                }}
              >
                START HERE
              </span>
            )}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--muted-foreground)", lineHeight: 1.55, margin: 0 }}>
            {post.description}
          </p>
        </div>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.2rem",
            flexShrink: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--muted-foreground)",
            minWidth: "6rem",
            textAlign: "right",
          }}
        >
          <span>
            {new Date(post.date).toLocaleDateString(
              language === "en" ? "en-US" : "es-ES",
              { year: "numeric", month: "short" }
            )}
          </span>
          <span>{readTime} min</span>
        </div>
      </article>
    </Link>
  );
}
