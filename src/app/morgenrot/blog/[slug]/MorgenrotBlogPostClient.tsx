"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { translations, type Language } from "@/lib/i18n";
import "../../morgenrot.css";

interface MorgenrotBlogPostClientProps {
  frontmatter: any;
  mdxContent: React.ReactElement;
  readingTime: number;
  headings: { text: string; id: string }[];
  slug: string;
  lang: string;
  alternateSlug?: string | null;
  alternateLang?: 'en' | 'es' | null;
}

export default function MorgenrotBlogPostClient({
  frontmatter,
  mdxContent,
  readingTime,
  headings,
  slug,
  lang: initialLang,
  alternateSlug,
  alternateLang
}: MorgenrotBlogPostClientProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>(initialLang as Language);
  const t = translations[language].morgenrot;

  // Load language preference on mount - but don't auto-redirect
  // Let the user manually switch languages to avoid 404s
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      setLanguage(savedLang);
    } else {
      // If no saved preference, use the post's language
      setLanguage(initialLang as Language);
    }
  }, [initialLang]);

  // Save language preference when it changes and navigate to correct version
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // If clicking on the alternate language, navigate to it
    if (lang === alternateLang && alternateSlug) {
      router.push(`/morgenrot/blog/${alternateSlug}`);
      return;
    }
    
    // Otherwise, determine the correct slug for the selected language
    let newSlug = slug;
    
    // Remove any existing language suffix
    const baseSlug = slug.replace(/-es$/, '').replace(/-en$/, '');
    
    // Add appropriate suffix based on language
    if (lang === 'es') {
      newSlug = `${baseSlug}-es`;
    } else {
      newSlug = baseSlug; // English doesn't have suffix
    }
    
    // Navigate to the correct language version if it exists
    if (newSlug !== slug) {
      router.push(`/morgenrot/blog/${newSlug}`);
    }
  };

  return (
    <div className="morgenrot-page">
      {/* Navigation Bar */}
      <nav className="morgenrot-nav">
        <div className="morgenrot-nav-container">
          <Link href="/morgenrot/blog" className="morgenrot-nav-back">
            ← {language === 'en' ? 'Back to Blog' : 'Volver al Blog'}
          </Link>
          <div className="morgenrot-nav-lang">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`morgenrot-lang-btn ${language === "en" ? "active" : ""}`}
              disabled={alternateLang === 'es' && !alternateSlug && language !== 'en'}
              title={alternateLang === 'es' && !alternateSlug && language !== 'en' ? (language === 'es' ? 'English version not available' : 'Versión en inglés no disponible') : ''}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("es")}
              className={`morgenrot-lang-btn ${language === "es" ? "active" : ""}`}
              disabled={alternateLang === 'en' && !alternateSlug && language !== 'es'}
              title={alternateLang === 'en' && !alternateSlug && language !== 'es' ? (language === 'en' ? 'Spanish version not available' : 'Versión en español no disponible') : ''}
            >
              ES
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="morgenrot-section" style={{ paddingTop: 'var(--spacing-4xl)', paddingBottom: 'var(--spacing-4xl)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Breadcrumbs */}
          <div 
            className="morgenrot-breadcrumb-nav"
            style={{ 
              marginBottom: '3rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(74, 155, 122, 0.3)',
              width: '100%',
              display: 'block',
              visibility: 'visible',
              opacity: 1
            }}
          >
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              fontSize: '0.875rem',
              color: '#666',
              width: '100%'
            }}>
              <Link 
                href="/morgenrot" 
                style={{ 
                  color: '#4a9b7a', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                Morgenrot
              </Link>
              <span style={{ color: '#999' }}>/</span>
              <Link 
                href="/morgenrot/blog" 
                style={{ 
                  color: '#4a9b7a', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {language === 'es' ? 'Blog' : 'Blog'}
              </Link>
              <span style={{ color: '#999' }}>/</span>
              <span style={{ 
                color: '#333',
                fontWeight: 600
              }}>
                {frontmatter.title}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <header style={{ marginBottom: 'var(--spacing-4xl)' }}>
            {/* Category */}
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <span style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-foreground)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600
              }}>
                {frontmatter.category}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-5xl)',
              fontWeight: 700,
              color: 'var(--foreground)',
              marginBottom: 'var(--spacing-lg)',
              lineHeight: 'var(--leading-tight)'
            }}>
              {frontmatter.title}
            </h1>

            {/* Description */}
            {frontmatter.description && (
              <p style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--spacing-xl)',
                lineHeight: 'var(--leading-relaxed)'
              }}>
                {frontmatter.description}
              </p>
            )}

            {/* Metadata */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--spacing-xl)',
              paddingBottom: 'var(--spacing-xl)',
              borderBottom: '1px solid var(--border)'
            }}>
              <span>{frontmatter.author}</span>
              <span>•</span>
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString(
                  language === 'en' ? 'en-US' : 'es-ES',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </time>
              <span>•</span>
              <span>
                {readingTime} {language === 'es' ? 'min lectura' : 'min read'}
              </span>
            </div>

            {/* Language Switcher */}
            {alternateSlug && alternateLang && (
              <div style={{
                marginBottom: 'var(--spacing-lg)',
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)'
              }}>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  {language === 'en' ? 'Also available in:' : 'También disponible en:'}
                </p>
                <Link
                  href={`/morgenrot/blog/${alternateSlug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    borderRadius: 'var(--radius)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>{alternateLang === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                  <span>{alternateLang === 'es' ? 'Leer en Español' : 'Read in English'}</span>
                </Link>
              </div>
            )}

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-xl)'
              }}>
                {frontmatter.tags.map((tag: string, i: number) => (
                  <span key={i} style={{
                    padding: 'var(--spacing-xs) var(--spacing-md)',
                    backgroundColor: 'var(--muted)',
                    color: 'var(--muted-foreground)',
                    borderRadius: 'var(--radius)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* MDX Content */}
          <article style={{
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--foreground)'
          }}>
            {mdxContent}
          </article>

          {/* Back to Blog */}
          <div style={{
            marginTop: 'var(--spacing-4xl)',
            paddingTop: 'var(--spacing-2xl)',
            borderTop: '1px solid var(--border)'
          }}>
            <Link href="/morgenrot/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              color: 'var(--primary)',
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'color var(--transition-fast)'
            }}>
              ← {language === 'es' ? 'Volver al Blog' : 'Back to Blog'}
            </Link>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .morgenrot-breadcrumb-nav {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
        }

        .morgenrot-breadcrumb-nav > div {
          display: flex !important;
          width: 100% !important;
        }
      `}</style>
    </div>
  );
}

