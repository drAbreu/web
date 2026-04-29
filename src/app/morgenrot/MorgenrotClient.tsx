"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { BlogPost } from "@/lib/mdx";
import type { Language } from "@/lib/i18n";
import NewsletterSignup from "@/components/NewsletterSignup";
import "./morgenrot.css";

interface Props {
  morgenrotPosts: BlogPost[];
}

function readingTime(content: string) {
  return Math.ceil(content.trim().split(/\s+/).length / 200);
}

const copy = {
  en: {
    back: "← Home",
    eyebrow: "Memoir · Mental Health · Acceptance",
    title: "The Morgenrot Trail",
    subtitle: "The golden glow, herald of a life in harmony with panic and anxiety.",
    posts: "Chapters & Journal",
    noChapters: "First chapter coming soon. Subscribe to be notified.",
    readMore: "Read →",
    minRead: "min read",
    viewCards: "Cards",
    viewList: "List",
  },
  es: {
    back: "← Inicio",
    eyebrow: "Memorias · Salud Mental · Aceptación",
    title: "El Sendero Morgenrot",
    subtitle: "El resplandor dorado, heraldo de una vida en armonía con el pánico y la ansiedad.",
    posts: "Capítulos & Diario",
    noChapters: "Primer capítulo próximamente. Suscríbete para ser notificado.",
    readMore: "Leer →",
    minRead: "min lectura",
    viewCards: "Tarjetas",
    viewList: "Lista",
  },
};

export default function MorgenrotClient({ morgenrotPosts }: Props) {
  const [language, setLanguage] = useState<Language>("en");
  const [view, setView] = useState<"cards" | "list">("cards");
  const t = copy[language];

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved === "en" || saved === "es") setLanguage(saved);
  }, []);

  const handleLang = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Strict filtering — show only posts that exist in the selected language
  const posts = morgenrotPosts
    .filter((p) => p.lang === language)
    .sort((a, b) => {
      const aPin = a.slug.includes("beginning-of-morgenrot");
      const bPin = b.slug.includes("beginning-of-morgenrot");
      if (aPin && !bPin) return -1;
      if (!aPin && bPin) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="morgenrot-page">
      {/* Nav */}
      <nav className="morgenrot-nav">
        <div className="morgenrot-nav-container">
          <Link href="/" className="morgenrot-nav-back">
            {t.back}
          </Link>
          <div className="morgenrot-nav-lang">
            <button
              onClick={() => handleLang("en")}
              className={`morgenrot-lang-btn ${language === "en" ? "active" : ""}`}
            >
              EN
            </button>
            <button
              onClick={() => handleLang("es")}
              className={`morgenrot-lang-btn ${language === "es" ? "active" : ""}`}
            >
              ES
            </button>
          </div>
        </div>
      </nav>

      {/* ── Video banner (compact) ── */}
      <div className="mg-video-banner">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="mg-video"
          aria-hidden="true"
        >
          <source src="/_imgs/calm_hero/forest_with_light.mp4" type="video/mp4" />
        </video>
        <div className="mg-video-overlay" />
        <div className="mg-video-content">
          <p className="mg-video-eyebrow">{t.eyebrow}</p>
          <h1 className="mg-video-title">{t.title}</h1>
          <p className="mg-video-subtitle">{t.subtitle}</p>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <section className="morgenrot-section" style={{ paddingTop: "var(--spacing-3xl)", paddingBottom: "var(--spacing-3xl)" }}>
        <div className="morgenrot-container" style={{ display: "flex", justifyContent: "center" }}>
          <NewsletterSignup variant="light" language={language} projectName="Morgenrot" />
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="morgenrot-section" style={{ paddingTop: 0, paddingBottom: "var(--spacing-4xl)" }}>
        <div className="morgenrot-container">
          {/* Toolbar */}
          <div className="mg-toolbar">
            <h2 className="mg-section-label">{t.posts}</h2>
            <div className="mg-view-toggle">
              <ViewBtn label={t.viewCards} icon="grid" active={view === "cards"} onClick={() => setView("cards")} />
              <ViewBtn label={t.viewList} icon="list" active={view === "list"} onClick={() => setView("list")} />
            </div>
          </div>

          {posts.length === 0 ? (
            <p className="mg-empty">{t.noChapters}</p>
          ) : view === "cards" ? (
            <div className="mg-card-grid">
              {posts.map((post) => (
                <CardItem key={post.slug} post={post} language={language} t={t} />
              ))}
            </div>
          ) : (
            <div className="mg-list">
              {posts.map((post, i) => (
                <ListItem key={post.slug} post={post} index={i} language={language} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem var(--spacing-lg)",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          color: "var(--muted-foreground)",
        }}
      >
        <p>© {new Date().getFullYear()} Jorge Abreu-Vicente — Morgenrot</p>
      </footer>

      <style jsx>{`
        .morgenrot-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }

        /* ── Video banner ── */
        .mg-video-banner {
          position: relative;
          height: 280px;
          overflow: hidden;
        }
        .mg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .mg-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(30, 20, 10, 0.35) 0%,
            rgba(20, 14, 6, 0.60) 100%
          );
        }
        .mg-video-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 1.5rem;
        }
        .mg-video-eyebrow {
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.70);
          margin-bottom: 0.625rem;
        }
        .mg-video-title {
          font-family: var(--font-heading) !important;
          font-size: clamp(2.5rem, 8vw, 4.5rem) !important;
          font-weight: 700 !important;
          color: white !important;
          margin-bottom: 0.5rem !important;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5) !important;
          line-height: 1 !important;
          letter-spacing: 0.04em !important;
        }
        .mg-video-subtitle {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: rgba(255, 255, 255, 0.70);
          font-style: italic;
          max-width: 520px;
        }

        /* ── Toolbar ── */
        .mg-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-2xl);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .mg-section-label {
          font-family: var(--font-heading) !important;
          font-size: var(--text-lg) !important;
          font-weight: 600 !important;
          color: var(--foreground) !important;
          margin: 0 !important;
        }
        .mg-view-toggle {
          display: flex;
          gap: 0.25rem;
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 0.25rem;
        }

        /* ── Card grid ── */
        .mg-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-2xl);
        }

        /* ── List ── */
        .mg-list {
          display: flex;
          flex-direction: column;
        }

        /* ── Empty state ── */
        .mg-empty {
          text-align: center;
          padding: var(--spacing-4xl);
          color: var(--muted-foreground);
          font-size: var(--text-xl);
          font-family: var(--font-body);
          font-style: italic;
        }

        @media (max-width: 640px) {
          .mg-video-banner { height: 220px; }
          .mg-card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

function ViewBtn({
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
  t: typeof copy.en;
}) {
  const rt = readingTime(post.content);
  const isPinned = post.slug.includes("beginning-of-morgenrot");

  return (
    <Link href={`/morgenrot/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
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
            <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
              {rt} {t.minRead}
            </span>
          </div>
          <h3 className="journal-title">{post.title}</h3>
          <p className="journal-excerpt">{post.description}</p>
          <div className="journal-link-container">
            <span className="journal-link">{t.readMore}</span>
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
  t: typeof copy.en;
}) {
  const rt = readingTime(post.content);
  const isPinned = post.slug.includes("beginning-of-morgenrot");

  return (
    <Link href={`/morgenrot/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <article
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1.25rem",
          padding: "1.25rem 0",
          borderBottom: "1px solid var(--border)",
          cursor: "pointer",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "var(--muted)";
          el.style.margin = "0 -0.75rem";
          el.style.padding = "1.25rem 0.75rem";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = "transparent";
          el.style.margin = "0";
          el.style.padding = "1.25rem 0";
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--primary)",
            width: "2.5rem",
            flexShrink: 0,
            paddingTop: "0.15rem",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
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
                {language === "en" ? "START HERE" : "EMPIEZA AQUÍ"}
              </span>
            )}
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              color: "var(--muted-foreground)",
              lineHeight: 1.55,
              margin: "0.25rem 0 0",
            }}
          >
            {post.description}
          </p>
        </div>
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
            minWidth: "5.5rem",
            textAlign: "right",
          }}
        >
          <span>
            {new Date(post.date).toLocaleDateString(
              language === "en" ? "en-US" : "es-ES",
              { year: "numeric", month: "short" }
            )}
          </span>
          <span>{rt} min</span>
        </div>
      </article>
    </Link>
  );
}
