"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { translations, type Language } from "@/lib/i18n";
import type { BlogPost } from "@/lib/mdx";
import "../morgenrot.css";

interface MorgenrotBlogClientProps {
  posts: BlogPost[];
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function MorgenrotBlogClient({ posts }: MorgenrotBlogClientProps) {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language].morgenrot;

  // Load language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      setLanguage(savedLang);
    }
  }, []);

  // Save language preference when it changes
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Filter posts by language with English fallback
  const filteredByLanguage = useMemo(() => {
    const postsByBase = new Map<string, BlogPost[]>();
    posts.forEach(post => {
      // Handle both formats: "slug-es" (Spanish) and "slug" (English without suffix)
      // Remove language suffix to get base slug
      let baseSlug = post.slug.replace(/-es$/, '').replace(/-en$/, '');
      
      if (!postsByBase.has(baseSlug)) {
        postsByBase.set(baseSlug, []);
      }
      postsByBase.get(baseSlug)!.push(post);
    });

    const result: BlogPost[] = [];
    postsByBase.forEach((versions) => {
      // First try to find exact language match based on frontmatter lang field
      let chosen = versions.find(p => p.lang === language);
      
      // If not found, fallback to English
      if (!chosen) {
        chosen = versions.find(p => p.lang === 'en');
      }
      
      // Last resort: take first available
      if (!chosen && versions.length > 0) {
        chosen = versions[0];
      }
      
      if (chosen) {
        result.push(chosen);
      }
    });

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts, language]);

  return (
    <div className="morgenrot-page">
      {/* Navigation Bar */}
      <nav className="morgenrot-nav">
        <div className="morgenrot-nav-container">
          <Link href="/morgenrot" className="morgenrot-nav-back">
            ← {language === 'en' ? 'Back to Morgenrot' : 'Volver a Morgenrot'}
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

      {/* Hero Section */}
      <section className="morgenrot-section" style={{ paddingTop: 'var(--spacing-4xl)', paddingBottom: 'var(--spacing-4xl)' }}>
        <div className="morgenrot-container">
          <h1 className="morgenrot-section-title" style={{ fontSize: 'var(--text-5xl)', marginBottom: 'var(--spacing-lg)' }}>
            {t.journal.title}
          </h1>
          <p className="journal-description" style={{ textAlign: 'center', fontSize: 'var(--text-xl)', color: 'var(--muted-foreground)', maxWidth: '800px', margin: '0 auto' }}>
            {t.journal.description}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="morgenrot-section">
        <div className="morgenrot-container">
          {filteredByLanguage.length > 0 ? (
            <div className="journal-grid">
              {filteredByLanguage.map((post) => {
                const readTime = calculateReadingTime(post.content);
                // Use the post's actual slug (which should match the selected language)
                const postSlug = post.slug;
                return (
                  <Link key={`${post.slug}-${language}`} href={`/morgenrot/blog/${postSlug}`}>
                    <article className="journal-card morgenrot-card">
                      <div className="journal-meta">
                        <span className="journal-lang-tag">[{post.lang.toUpperCase()}]</span>
                        <span className="journal-date">
                          {new Date(post.date).toLocaleDateString(
                            language === 'en' ? 'en-US' : 'es-ES',
                            { year: 'numeric', month: 'short', day: 'numeric' }
                          )}
                        </span>
                      </div>
                      <h3 className="journal-title">{post.title}</h3>
                      <p className="journal-excerpt">{post.description}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} style={{
                              padding: 'var(--spacing-xs) var(--spacing-sm)',
                              backgroundColor: 'var(--accent-light)',
                              color: 'var(--accent-foreground)',
                              borderRadius: 'var(--radius)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 600
                            }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="journal-link-container">
                        <span className="journal-link">
                          {t.journal.readMore} →
                        </span>
                        <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)', marginLeft: 'auto' }}>
                          {readTime} {language === 'en' ? 'min read' : 'min lectura'}
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-4xl)', color: 'var(--muted-foreground)' }}>
              <p style={{ fontSize: 'var(--text-xl)' }}>
                {language === 'en' 
                  ? 'No blog posts yet. Check back soon!' 
                  : 'Aún no hay publicaciones. ¡Vuelve pronto!'}
              </p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .morgenrot-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }

        .journal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: var(--spacing-2xl);
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
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
        }

        .journal-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary);
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
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .journal-link {
          color: var(--primary);
          font-size: var(--text-lg);
          font-weight: 600;
          transition: color var(--transition-fast);
        }

        .journal-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
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
    </div>
  );
}

