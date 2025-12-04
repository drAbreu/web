"use client";

import Link from "next/link";

interface MorgenrotJournalProps {
  t: any;
  language: string;
}

export default function MorgenrotJournal({ t, language }: MorgenrotJournalProps) {
  // Placeholder posts - these will be replaced with real MDX blog posts later
  const placeholderPosts = [
    {
      id: 1,
      title: language === "en" ? "The Beginning of the Journey" : "El Comienzo del Viaje",
      excerpt:
        language === "en"
          ? "Reflections on starting this project and what it means to share such a personal story..."
          : "Reflexiones sobre comenzar este proyecto y lo que significa compartir una historia tan personal...",
      date: "2025-01-15",
      language: language,
    },
    {
      id: 2,
      title: language === "en" ? "On Writing About Anxiety" : "Sobre Escribir Sobre la Ansiedad",
      excerpt:
        language === "en"
          ? "The challenges and rewards of putting these experiences into words..."
          : "Los desafíos y recompensas de poner estas experiencias en palabras...",
      date: "2025-01-08",
      language: language,
    },
    {
      id: 3,
      title: language === "en" ? "Hope in Dark Times" : "Esperanza en Tiempos Oscuros",
      excerpt:
        language === "en"
          ? "Finding light when everything seems impossible. Lessons learned along the way..."
          : "Encontrando luz cuando todo parece imposible. Lecciones aprendidas en el camino...",
      date: "2025-01-01",
      language: language,
    },
  ];

  return (
    <section className="morgenrot-section journal-section">
      <h2 className="morgenrot-section-title">{t.journal.title}</h2>
      <p className="journal-description">{t.journal.description}</p>

      <div className="journal-grid">
        {placeholderPosts.map((post, index) => (
          <article key={post.id} className="journal-card morgenrot-card">
            <div className="journal-meta">
              <span className="journal-lang-tag">[{post.language.toUpperCase()}]</span>
              <span className="journal-date">{post.date}</span>
            </div>
            <h3 className="journal-title">{post.title}</h3>
            <p className="journal-excerpt">{post.excerpt}</p>
            <div className="journal-link-container">
              <span className="journal-link">
                {t.journal.readMore} →
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="view-all-container">
        <span className="view-all-link">
          {t.journal.viewAll} →
        </span>
      </div>

      <style jsx>{`
        .journal-section {
          background-color: var(--muted);
        }

        .journal-description {
          text-align: center;
          font-size: var(--text-xl);
          color: var(--muted-foreground);
          margin-bottom: var(--spacing-4xl);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: var(--leading-relaxed);
        }

        .journal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: var(--spacing-2xl);
          margin-bottom: var(--spacing-3xl);
        }

        .journal-card {
          display: flex;
          flex-direction: column;
          background-color: var(--card);
          transition: all var(--transition-base);
          padding: var(--spacing-2xl);
          min-height: 320px;
        }

        .journal-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
          border-color: var(--accent);
        }

        .journal-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          font-size: var(--text-base);
          color: var(--muted-foreground);
        }

        .journal-lang-tag {
          background-color: var(--accent-light);
          color: var(--accent-foreground);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius);
          font-weight: 600;
          font-family: var(--font-mono);
        }

        .journal-date {
          color: var(--muted-foreground);
        }

        .journal-title {
          font-family: var(--font-heading);
          font-size: var(--text-2xl);
          font-weight: 600;
          margin-bottom: var(--spacing-lg);
          color: var(--foreground);
          line-height: var(--leading-tight);
        }

        .journal-excerpt {
          font-size: var(--text-lg);
          color: var(--muted-foreground);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--spacing-xl);
          flex-grow: 1;
        }

        .journal-link-container {
          margin-top: auto;
        }

        .journal-link {
          color: var(--primary);
          font-size: var(--text-lg);
          font-weight: 600;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .journal-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        .view-all-container {
          text-align: center;
          margin-top: var(--spacing-3xl);
        }

        .view-all-link {
          display: inline-block;
          color: var(--primary);
          font-size: var(--text-xl);
          font-weight: 600;
          cursor: pointer;
          padding: var(--spacing-lg) var(--spacing-2xl);
          border: 2px solid var(--primary);
          border-radius: var(--radius-xl);
          transition: all var(--transition-base);
        }

        .view-all-link:hover {
          background-color: var(--primary);
          color: var(--primary-foreground);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 768px) {
          .journal-grid {
            grid-template-columns: 1fr;
          }

          .journal-card {
            padding: var(--spacing-xl);
            min-height: 280px;
          }

          .journal-title {
            font-size: var(--text-xl);
          }

          .journal-excerpt {
            font-size: var(--text-base);
          }
        }
      `}</style>
    </section>
  );
}
