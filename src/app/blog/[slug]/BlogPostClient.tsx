"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { translations, type Language } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthorCard from "@/components/AuthorCard";
import TableOfContents from '@/app/projects/[slug]/TableOfContents';
import ShareButtons from '@/app/projects/[slug]/ShareButtons';

interface BlogPostClientProps {
  frontmatter: any;
  mdxContent: React.ReactElement;
  readingTime: number;
  headings: { text: string; id: string }[];
  slug: string;
  lang: string;
}

export default function BlogPostClient({
  frontmatter,
  mdxContent,
  readingTime,
  headings,
  slug,
  lang: initialLang
}: BlogPostClientProps) {
  const [language, setLanguage] = useState<Language>(initialLang as Language);
  const navT = translations[language];

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

  return (
    <div className="min-h-screen bg-black">
      <Navbar language={language} setLanguage={handleLanguageChange} navTranslations={navT.nav} />

      {/* Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Main Content */}
            <article className="flex-1 max-w-4xl">
              {/* Breadcrumbs */}
              <nav className="mb-6 text-sm">
                <ol className="flex items-center gap-2 text-gray-400">
                  <li>
                    <Link href="/" className="hover:text-brand-gold transition-colors">
                      {language === 'es' ? 'Inicio' : 'Home'}
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/blog" className="hover:text-brand-gold transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-white truncate">{frontmatter.title}</li>
                </ol>
              </nav>

              {/* Article Header */}
              <header className="mb-12">
                {/* Category */}
                <div className="mb-6">
                  <span className="px-3 py-1 bg-brand-purple/30 text-brand-gold text-sm rounded-full font-semibold">
                    {frontmatter.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  {frontmatter.title}
                </h1>

                {/* Description */}
                {frontmatter.description && (
                  <p className="text-xl text-gray-400 mb-6">
                    {frontmatter.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{frontmatter.author}</span>
                  </div>
                  <span>•</span>
                  <time dateTime={frontmatter.date}>
                    {new Date(frontmatter.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {readingTime} {language === 'es' ? 'min lectura' : 'min read'}
                  </span>
                </div>

                {/* Tags */}
                {frontmatter.tags && frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {frontmatter.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Share Buttons */}
                <div className="mt-6">
                  <ShareButtons
                    title={frontmatter.title}
                    slug={slug}
                    lang={language}
                  />
                </div>
              </header>

              {/* MDX Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                {mdxContent}
              </div>

              {/* Author Card */}
              <AuthorCard language={language} />

              {/* Footer Navigation */}
              <footer className="mt-16 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {language === 'es' ? 'Todos los Posts' : 'All Posts'}
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    {language === 'es' ? 'Inicio' : 'Home'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </Link>
                </div>
              </footer>
            </article>

            {/* Table of Contents Sidebar */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-64 sticky top-24 self-start">
                <TableOfContents headings={headings} lang={language} />
              </aside>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
