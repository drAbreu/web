"use client";

import Link from "next/link";
import { useState } from "react";
import { translations, type Language } from "@/lib/i18n";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  const [language, setLanguage] = useState<Language>("en");
  const navT = translations[language];

  // Example blog posts - will be populated from MDX
  const posts = [
    {
      slug: "building-datastar",
      title: language === "en" ? "Building DATASTAR: A Journey into Modern Web Development" : "Construyendo DATASTAR: Un Viaje al Desarrollo Web Moderno",
      description: language === "en" 
        ? "A comprehensive guide on how we built the DATASTAR website using Next.js, MDX, and modern web technologies. Learn about our design decisions, challenges, and solutions."
        : "Una guía completa sobre cómo construimos el sitio web DATASTAR utilizando Next.js, MDX y tecnologías web modernas. Aprende sobre nuestras decisiones de diseño, desafíos y soluciones.",
      date: "2025-01-15",
      category: language === "en" ? "Web Development" : "Desarrollo Web",
      tags: ["Next.js", "MDX", "Web Design", "Tutorial"],
      author: "Jorge Abreu-Vicente, PhD",
      lang: language,
      readTime: "15 min"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar language={language} setLanguage={setLanguage} navTranslations={navT.nav} />

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

      {/* Blog Posts Grid */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group relative bg-gradient-to-br from-brand-navy/50 to-brand-purple/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-brand-coral/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-coral/20 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/0 to-brand-coral/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Metadata */}
                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(language === "en" ? "en-US" : "es-ES", { 
                          year: 'numeric', 
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-brand-purple/50 text-brand-orange text-xs rounded-full font-semibold">
                        {post.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-coral transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 leading-relaxed flex-1">
                      {post.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <div className="inline-flex items-center text-brand-coral group-hover:text-brand-orange transition-colors text-sm font-semibold">
                        {language === "en" ? "Read More" : "Leer Más"}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State (if no posts) */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {language === "en" ? "More Posts Coming Soon" : "Más Posts Próximamente"}
              </h3>
              <p className="text-gray-400">
                {language === "en" 
                  ? "We're working on new content. Check back soon!"
                  : "Estamos trabajando en nuevo contenido. ¡Vuelve pronto!"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm text-gray-400">
              © 2025 • Jorge Abreu-Vicente, PhD - All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="https://www.linkedin.com/in/abreujorge-dataresearch/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link href="https://github.com/drAbreu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

