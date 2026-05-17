"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import type { BlogPost } from "@/lib/mdx";
import type { Language } from "@/lib/i18n";
import "./permafrost.css";

interface Props {
  posts: BlogPost[];
}

function readingTime(content: string) {
  return Math.ceil(content.trim().split(/\s+/).length / 200);
}

const t = {
  en: {
    eyebrow: "A Science Fiction Novel — In Progress",
    heroTitle: "INTERSTELLAR\nPERMAFROST",
    subtitle: "When 3I/ATLAS entered the solar system, scientists called it a comet. Some called it a message. Others called it proof of God. What it really was may have been worse than any of them imagined.",
    tagline: "Written in public. Published free. Shaped by readers.",
    posts: "Chapters & Dispatches",
    noChapters: "First chapter coming soon. Subscribe to be notified.",
    readMore: "Read →",
    minRead: "min read",
    back: "← Home",
    viewCards: "Cards",
    viewList: "List",
  },
  es: {
    eyebrow: "Una Novela de Ciencia Ficción — En Proceso",
    heroTitle: "PERMAFROST\nINTERESTELAR",
    subtitle: "Cuando 3I/ATLAS entró en el sistema solar, los científicos lo llamaron cometa. Algunos lo llamaron mensaje. Otros lo llamaron prueba de Dios. Lo que realmente era puede haber sido peor de lo que cualquiera imaginó.",
    tagline: "Escrita en público. Publicada gratis. Moldeada por lectores.",
    posts: "Capítulos & Despachos",
    noChapters: "Primer capítulo próximamente. Suscríbete para ser notificado.",
    readMore: "Leer →",
    minRead: "min lectura",
    back: "← Inicio",
    viewCards: "Tarjetas",
    viewList: "Lista",
  },
};

export default function PermafrostClient({ posts }: Props) {
  const [language, setLanguage] = useState<Language>("en");
  const [view, setView] = useState<"cards" | "list">("cards");
  const txt = t[language];

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved === "en" || saved === "es") setLanguage(saved);
  }, []);

  const handleLang = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const filtered = useMemo(() => {
    return posts
      .filter((p) => p.lang === language)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [posts, language]);

  return (
    <div className="permafrost-page">
      {/* Nav */}
      <nav className="pf-nav">
        <Link href="/" className="pf-nav-back">
          {txt.back}
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
          >
            ES
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pf-hero">
        <p className="pf-hero-eyebrow">{txt.eyebrow}</p>
        <h1 className="pf-hero-title" style={{ whiteSpace: "pre-line" }}>{txt.heroTitle}</h1>
        <p className="pf-hero-subtitle">{txt.subtitle}</p>
        <p className="pf-hero-tagline">{txt.tagline}</p>
        <div className="pf-divider" />

        {/* Newsletter */}
        <NewsletterBlock language={language} />
      </section>

      {/* Chapters */}
      <section className="pf-section">
        <div className="pf-toolbar">
          <h2 className="pf-section-title">{txt.posts}</h2>
          <div className="pf-view-toggle">
            <button
              className={`pf-view-btn ${view === "cards" ? "active" : ""}`}
              onClick={() => setView("cards")}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="0" y="0" width="6" height="6" rx="1" />
                <rect x="8" y="0" width="6" height="6" rx="1" />
                <rect x="0" y="8" width="6" height="6" rx="1" />
                <rect x="8" y="8" width="6" height="6" rx="1" />
              </svg>
              {txt.viewCards}
            </button>
            <button
              className={`pf-view-btn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="0" y="1" width="14" height="2" rx="1" />
                <rect x="0" y="6" width="14" height="2" rx="1" />
                <rect x="0" y="11" width="14" height="2" rx="1" />
              </svg>
              {txt.viewList}
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: "var(--pf-text-muted)", fontFamily: "var(--pf-font-ui)", textAlign: "center", padding: "4rem 0" }}>
            {txt.noChapters}
          </p>
        ) : view === "cards" ? (
          <div className="pf-card-grid">
            {filtered.map((post, i) => (
              <CardItem key={post.slug} post={post} index={i} txt={txt} />
            ))}
          </div>
        ) : (
          <div className="pf-list">
            {filtered.map((post, i) => (
              <ListItem key={post.slug} post={post} index={i} txt={txt} language={language} />
            ))}
          </div>
        )}
      </section>

      <footer className="pf-footer">
        <p>© {new Date().getFullYear()} Jorge Abreu-Vicente, PhD — Permafrost</p>
      </footer>
    </div>
  );
}

function CardItem({ post, index, txt }: { post: BlogPost; index: number; txt: typeof t.en }) {
  const rt = readingTime(post.content);
  return (
    <Link href={`/permafrost/${post.slug}`} className="pf-card">
      {post.image ? (
        <img src={post.image} alt={post.title} className="pf-card-image" />
      ) : (
        <div className="pf-card-image-placeholder">✦</div>
      )}
      <div className="pf-card-body">
        <div className="pf-card-meta">
          <span className="pf-card-chapter">
            Chapter {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <h3 className="pf-card-title">{post.title}</h3>
        <p className="pf-card-excerpt">{post.description}</p>
        <div className="pf-card-footer">
          <span className="pf-card-read">{txt.readMore}</span>
          <span>{rt} {txt.minRead}</span>
        </div>
      </div>
    </Link>
  );
}

function ListItem({
  post,
  index,
  txt,
  language,
}: {
  post: BlogPost;
  index: number;
  txt: typeof t.en;
  language: Language;
}) {
  const rt = readingTime(post.content);
  return (
    <Link href={`/permafrost/${post.slug}`} className="pf-list-item">
      <span className="pf-list-chapter">Chapter {String(index + 1).padStart(2, "0")}</span>
      <div className="pf-list-content">
        <h3 className="pf-list-title">{post.title}</h3>
        <p className="pf-list-excerpt">{post.description}</p>
      </div>
      <div className="pf-list-meta">
        <span>
          {new Date(post.date).toLocaleDateString(
            language === "en" ? "en-US" : "es-ES",
            { year: "numeric", month: "short" }
          )}
        </span>
        <span>{rt} {txt.minRead}</span>
      </div>
    </Link>
  );
}

function NewsletterBlock({ language }: { language: Language }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const labels = {
    en: {
      title: "Follow the story",
      desc: "New chapters by email, when they arrive.",
      placeholder: "your@email.com",
      button: "Subscribe",
      thanks: "You're in. Thanks!",
    },
    es: {
      title: "Sigue la historia",
      desc: "Nuevos capítulos por correo, cuando lleguen.",
      placeholder: "tu@correo.com",
      button: "Suscribirme",
      thanks: "¡Apuntado! Gracias.",
    },
  };
  const l = labels[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with your newsletter service endpoint (Buttondown, ConvertKit, Substack, etc.)
    // Example for Buttondown: POST to https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME
    console.log("Newsletter subscription:", email);
    setStatus("sent");
    setEmail("");
  };

  return (
    <div className="pf-newsletter" style={{ maxWidth: "480px", margin: "0 auto" }}>
      <p style={{ fontFamily: "var(--pf-font-ui)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--pf-ice)", marginBottom: "0.5rem" }}>
        {l.title}
      </p>
      <p style={{ fontFamily: "var(--pf-font-ui)", fontSize: "0.9rem", color: "var(--pf-text-muted)", marginBottom: "1.25rem" }}>
        {l.desc}
      </p>
      {status === "sent" ? (
        <p style={{ color: "var(--pf-aurora)", fontFamily: "var(--pf-font-ui)", fontSize: "0.9rem" }}>{l.thanks}</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={l.placeholder}
            style={{
              flex: "1 1 200px",
              padding: "0.6rem 1rem",
              background: "var(--pf-bg)",
              border: "1px solid var(--pf-border)",
              borderRadius: "var(--pf-radius)",
              color: "var(--pf-text)",
              fontFamily: "var(--pf-font-ui)",
              fontSize: "0.875rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.6rem 1.5rem",
              background: "var(--pf-ice)",
              color: "oklch(0.09 0.025 248)",
              border: "none",
              borderRadius: "var(--pf-radius)",
              fontFamily: "var(--pf-font-ui)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {l.button}
          </button>
        </form>
      )}
    </div>
  );
}
