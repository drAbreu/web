"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { type Language } from "@/lib/i18n";
import type { BlogPost } from "@/lib/mdx";
import NewsletterSignup from "@/components/NewsletterSignup";
import "../morgenrot.css";

interface MorgenrotBlogClientProps {
  posts: BlogPost[];
}

function calculateReadingTime(content: string): number {
  return Math.ceil(content.trim().split(/\s+/).length / 200);
}

const copy = {
  en: {
    back: "← Back to Morgenrot",
    title: "Chapters & Journal",
    description: "Follow the trail — one entry at a time.",
    noEntries: "No entries yet. Check back soon!",
    minRead: "min read",
    readMore: "Read →",
    startHere: "START HERE",
    viewList: "List",
    viewCards: "Cards",
  },
  es: {
    back: "← Volver a Morgenrot",
    title: "Capítulos & Diario",
    description: "Sigue el sendero — una entrada a la vez.",
    noEntries: "Aún no hay entradas. ¡Vuelve pronto!",
    minRead: "min",
    readMore: "Leer →",
    startHere: "EMPIEZA AQUÍ",
    viewList: "Lista",
    viewCards: "Tarjetas",
  },
};

export default function MorgenrotBlogClient({ posts }: MorgenrotBlogClientProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [view, setView] = useState<"list" | "cards">("list");
  const t = copy[language];

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang === "en" || savedLang === "es") setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const filteredPosts = useMemo(() => {
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
          <Link href="/morgenrot" className="morgenrot-nav-back">{t.back}</Link>
          <div className="morgenrot-nav-lang">
            <button onClick={() => handleLanguageChange("en")} className={`morgenrot-lang-btn ${language === "en" ? "active" : ""}`}>EN</button>
            <button onClick={() => handleLanguageChange("es")} className={`morgenrot-lang-btn ${language === "es" ? "active" : ""}`}>ES</button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="morgenrot-section" style={{ paddingTop: "var(--spacing-4xl)", paddingBottom: "var(--spacing-3xl)" }}>
        <div className="morgenrot-container" style={{ textAlign: "center" }}>
          <h1 className="morgenrot-section-title" style={{ fontSize: "var(--text-5xl)", marginBottom: "var(--spacing-lg)" }}>
            {t.title}
          </h1>
          <p style={{ fontSize: "var(--text-xl)", color: "var(--muted-foreground)", maxWidth: "500px", margin: "0 auto var(--spacing-3xl)", lineHeight: "var(--leading-relaxed)", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
            {t.description}
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--spacing-2xl)" }}>
            <NewsletterSignup variant="light" language={language} projectName="Morgenrot" />
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="morgenrot-section" style={{ paddingTop: 0, paddingBottom: "var(--spacing-4xl)" }}>
        <div className="morgenrot-container">
          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--spacing-xl)", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "var(--text-base)", color: "var(--muted-foreground)", margin: 0 }}>
              {filteredPosts.length} {language === "en" ? "entries" : "entradas"}
            </p>
            <div style={{ display: "flex", gap: "0.25rem", background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.25rem" }}>
              <ToggleBtn label={t.viewList} icon="list" active={view === "list"} onClick={() => setView("list")} />
              <ToggleBtn label={t.viewCards} icon="grid" active={view === "cards"} onClick={() => setView("cards")} />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <p style={{ textAlign: "center", padding: "var(--spacing-4xl)", color: "var(--muted-foreground)", fontSize: "var(--text-xl)", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
              {t.noEntries}
            </p>
          ) : view === "cards" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "var(--spacing-2xl)" }}>
              {filteredPosts.map((post) => (
                <CardItem key={post.slug} post={post} language={language} t={t} />
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--border)" }}>
              {filteredPosts.map((post, i) => (
                <ReadingListItem key={post.slug} post={post} index={i} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .morgenrot-container {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }
        @media (max-width: 640px) {
          .morgenrot-container > div[style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function ToggleBtn({ label, icon, active, onClick }: { label: string; icon: "grid" | "list"; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.35rem 0.75rem",
        border: "none",
        borderRadius: "calc(var(--radius) - 2px)",
        background: active ? "var(--primary)" : "transparent",
        color: active ? "var(--primary-foreground)" : "var(--muted-foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {icon === "list" ? (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
          <rect x="0" y="0.5" width="13" height="2" rx="1" />
          <rect x="0" y="5.5" width="13" height="2" rx="1" />
          <rect x="0" y="10.5" width="13" height="2" rx="1" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
          <rect x="0" y="0" width="5.5" height="5.5" rx="1" />
          <rect x="7.5" y="0" width="5.5" height="5.5" rx="1" />
          <rect x="0" y="7.5" width="5.5" height="5.5" rx="1" />
          <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" />
        </svg>
      )}
      {label}
    </button>
  );
}

function ReadingListItem({ post, index, t }: { post: BlogPost; index: number; t: typeof copy.en }) {
  const rt = calculateReadingTime(post.content);
  const isPinned = post.slug.includes("beginning-of-morgenrot");

  return (
    <Link href={`/morgenrot/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "1rem",
          padding: "1rem 0",
          borderBottom: "1px solid var(--border)",
          cursor: "pointer",
          transition: "background 0.15s ease, padding 0.15s ease, margin 0.15s ease",
        }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--muted)"; el.style.padding = "1rem 0.75rem"; el.style.margin = "0 -0.75rem"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.padding = "1rem 0"; el.style.margin = "0"; }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--primary)", width: "2rem", flexShrink: 0, lineHeight: 1 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.3 }}>
          {post.title}
          {isPinned && (
            <span style={{ marginLeft: "0.625rem", fontSize: "var(--text-xs)", background: "var(--accent-light)", color: "var(--accent-foreground)", padding: "0.1rem 0.5rem", borderRadius: "var(--radius-full)", fontWeight: 600, verticalAlign: "middle" }}>
              {t.startHere}
            </span>
          )}
        </span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", flexShrink: 0, whiteSpace: "nowrap" }}>
          {rt} {t.minRead}
        </span>
      </div>
    </Link>
  );
}

function CardItem({ post, language, t }: { post: BlogPost; language: Language; t: typeof copy.en }) {
  const rt = calculateReadingTime(post.content);
  const isPinned = post.slug.includes("beginning-of-morgenrot");

  return (
    <Link href={`/morgenrot/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <article
        className="morgenrot-card"
        style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
      >
        {/* Image */}
        {post.image && (
          <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
            <img
              src={post.image}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {isPinned && (
              <div style={{
                position: "absolute", top: "0.75rem", left: "0.75rem",
                background: "var(--primary)", color: "var(--primary-foreground)",
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", padding: "0.25rem 0.625rem",
                borderRadius: "var(--radius)", fontFamily: "var(--font-sans)",
              }}>
                {language === "en" ? "START HERE" : "EMPIEZA AQUÍ"}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "1.25rem 1.25rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          {/* Date · reading time */}
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--muted-foreground)", margin: 0, display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <time>{new Date(post.date).toLocaleDateString(language === "en" ? "en-US" : "es-ES", { year: "numeric", month: "short", day: "numeric" })}</time>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{rt} {t.minRead}</span>
          </p>

          {/* Title */}
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.35, margin: 0 }}>
            {post.title}
          </h3>

          {/* Description */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.description}
          </p>

          {/* Read link */}
          <div style={{ marginTop: "auto", paddingTop: "0.75rem" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--primary)" }}>
              {t.readMore}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
