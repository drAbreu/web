"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { translations, type Language } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { BlogPost } from "@/lib/mdx";

type SortOption = 'date' | 'title' | 'category';

interface BlogClientProps {
  posts: BlogPost[];
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');
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

  // Filter posts by language with English fallback
  const filteredByLanguage = useMemo(() => {
    const postsByBase = new Map<string, BlogPost[]>();
    posts.forEach(post => {
      const baseSlug = post.slug.replace(/-(?:en|es)$/, '');
      if (!postsByBase.has(baseSlug)) {
        postsByBase.set(baseSlug, []);
      }
      postsByBase.get(baseSlug)!.push(post);
    });

    const result: BlogPost[] = [];
    postsByBase.forEach((versions) => {
      let chosen = versions.find(p => p.lang === language);
      if (!chosen) {
        chosen = versions.find(p => p.lang === 'en');
      }
      if (!chosen) {
        chosen = versions[0];
      }
      if (chosen) {
        result.push(chosen);
      }
    });

    return result;
  }, [posts, language]);

  // Get all unique categories with counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredByLanguage.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [filteredByLanguage]);

  // Filter by category and sort
  const filteredPosts = useMemo(() => {
    let result = selectedCategory
      ? filteredByLanguage.filter(p => p.category === selectedCategory)
      : filteredByLanguage;

    // Sort posts
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return result;
  }, [filteredByLanguage, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar language={language} setLanguage={handleLanguageChange} navTranslations={navT.nav} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-coral text-sm font-semibold tracking-wider uppercase mb-4">
              {language === "en" ? "BLOG" : "BLOG"}
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              {language === "en" ? "Thoughts & Insights" : "Pensamientos e Ideas"}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {language === "en"
                ? "Exploring data science, AI, astrophysics, and the intersection of science and technology. Technical deep-dives, tutorials, and reflections on research and development."
                : "Explorando ciencia de datos, IA, astrofísica y la intersección de ciencia y tecnología. Análisis técnicos profundos, tutoriales y reflexiones sobre investigación y desarrollo."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories and Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Sort Options */}
                <div className="bg-brand-navy/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    {language === "en" ? "Sort By" : "Ordenar Por"}
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSortBy('date')}
                      className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                        sortBy === 'date'
                          ? 'bg-brand-coral text-white font-semibold'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {language === "en" ? "Latest First" : "Más Recientes"}
                    </button>
                    <button
                      onClick={() => setSortBy('title')}
                      className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                        sortBy === 'title'
                          ? 'bg-brand-coral text-white font-semibold'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {language === "en" ? "Title (A-Z)" : "Título (A-Z)"}
                    </button>
                    <button
                      onClick={() => setSortBy('category')}
                      className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                        sortBy === 'category'
                          ? 'bg-brand-coral text-white font-semibold'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {language === "en" ? "Category" : "Categoría"}
                    </button>
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="bg-brand-navy/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {language === "en" ? "Categories" : "Categorías"}
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors text-sm flex items-center justify-between ${
                        selectedCategory === null
                          ? 'bg-brand-orange text-white font-semibold'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{language === "en" ? "All Posts" : "Todos"}</span>
                      <span className="text-xs bg-white/10 px-2 py-0.5 rounded">{filteredByLanguage.length}</span>
                    </button>
                    {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map(([category, count]) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors text-sm flex items-center justify-between ${
                          selectedCategory === category
                            ? 'bg-brand-orange text-white font-semibold'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{category}</span>
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded ml-2">{count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Post Count */}
                <div className="text-center text-sm text-gray-500">
                  {filteredPosts.length} {language === "en" ? "post" : "publicación"}{filteredPosts.length !== 1 && (language === "en" ? "s" : "es")}
                </div>
              </div>
            </aside>

            {/* Blog Posts Grid */}
            <div className="flex-1">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => {
                    const readTime = calculateReadingTime(post.content);
                    return (
                      <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <article className="group relative bg-gradient-to-br from-brand-navy/50 to-brand-purple/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-brand-coral/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-coral/20 h-full flex flex-col">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/0 to-brand-coral/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Image */}
                          {post.image && (
                            <div className="relative w-full h-48 overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                          )}

                          <div className="relative z-10 p-6 flex-1 flex flex-col">
                            {/* Metadata */}
                            <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                              <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </time>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {readTime} {language === "en" ? "min" : "min"}
                              </span>
                            </div>

                            {/* Category Badge */}
                            <div className="mb-3">
                              <span className="px-3 py-1 bg-brand-purple/50 text-brand-orange text-xs rounded-full font-semibold">
                                {post.category}
                              </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-brand-coral transition-colors line-clamp-2">
                              {post.title}
                            </h2>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1 line-clamp-3">
                              {post.description}
                            </p>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.slice(0, 3).map((tag, i) => (
                                  <span key={i} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                                    #{tag}
                                  </span>
                                ))}
                                {post.tags.length > 3 && (
                                  <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded">
                                    +{post.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Author & Read More */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <span className="text-xs text-gray-500 truncate">{post.author}</span>
                              <div className="inline-flex items-center text-brand-coral group-hover:text-brand-orange transition-colors text-sm font-semibold">
                                {language === "en" ? "Read" : "Leer"}
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === "en" ? "No Posts Found" : "No Se Encontraron Posts"}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {language === "en"
                      ? "Try adjusting your filters or check back soon for new content!"
                      : "¡Intenta ajustar tus filtros o vuelve pronto para nuevo contenido!"}
                  </p>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-6 py-2 bg-brand-coral hover:bg-brand-orange text-white rounded-lg transition-colors"
                    >
                      {language === "en" ? "Clear Filters" : "Limpiar Filtros"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
