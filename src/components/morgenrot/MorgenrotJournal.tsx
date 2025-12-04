"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/mdx";

interface MorgenrotJournalProps {
  t: any;
  language: string;
  posts?: BlogPost[];
}

export default function MorgenrotJournal({ t, language, posts = [] }: MorgenrotJournalProps) {
  // Filter posts by language and limit to 3 for preview
  const displayPosts = posts
    .filter(post => post.lang === language)
    .slice(0, 3);

  return (
    <section className="morgenrot-section journal-section">
      <h2 className="morgenrot-section-title">{t.journal.title}</h2>
      <p className="journal-description">{t.journal.description}</p>

      {displayPosts.length > 0 ? (
        <>
          <div className="journal-grid">
            {displayPosts.map((post) => (
              <Link key={post.slug} href={`/morgenrot/blog/${post.slug}`}>
                <article className="journal-card morgenrot-card">
                  <div className="journal-meta">
                    <span className="journal-lang-tag">[{post.lang.toUpperCase()}]</span>
                    <span className="journal-date">{new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <h3 className="journal-title">{post.title}</h3>
                  <p className="journal-excerpt">{post.description}</p>
                  <div className="journal-link-container">
                    <span className="journal-link">
                      {t.journal.readMore} →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
      </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-4xl)', color: 'var(--muted-foreground)' }}>
          <p style={{ fontSize: 'var(--text-xl)' }}>
            {language === 'en' 
              ? 'Blog posts coming soon. Check back for updates on the Morgenrot journey!' 
              : 'Publicaciones próximamente. ¡Vuelve para ver actualizaciones sobre el viaje de Morgenrot!'}
          </p>
        </div>
      )}

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
          text-decoration: none;
          color: inherit;
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
