"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { translations, type Language } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Project } from "@/lib/mdx";

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [language, setLanguage] = useState<Language>("en");
  const navT = translations[language];

  // Load language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      setLanguage(savedLang);
    }
  }, []);

  // Sync language with localStorage and persist changes
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Filter projects by language with English fallback
  const filteredProjects = (() => {
    // Group projects by base slug (without language suffix)
    const projectsByBase = new Map<string, Project[]>();

    projects.forEach(project => {
      // Get base slug (remove -en or -es suffix)
      const baseSlug = project.slug.replace(/-(?:en|es)$/, '');
      if (!projectsByBase.has(baseSlug)) {
        projectsByBase.set(baseSlug, []);
      }
      projectsByBase.get(baseSlug)!.push(project);
    });

    // For each base slug, pick the best language version
    const result: Project[] = [];
    projectsByBase.forEach((versions) => {
      // Try to find project in current language
      let chosen = versions.find(p => p.lang === language);

      // Fallback to English if no version in current language
      if (!chosen) {
        chosen = versions.find(p => p.lang === 'en');
      }

      // If still no match, use first available (backwards compatibility)
      if (!chosen) {
        chosen = versions[0];
      }

      if (chosen) {
        result.push(chosen);
      }
    });

    // Sort by order field
    return result.sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });
  })();

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
      coral: {
        bg: "from-brand-navy/50 to-brand-purple/30",
        border: "border-brand-coral/50",
        text: "text-brand-coral",
        shadow: "shadow-brand-coral/20"
      },
      orange: {
        bg: "from-brand-burgundy/40 to-brand-coral/30",
        border: "border-brand-orange/50",
        text: "text-brand-orange",
        shadow: "shadow-brand-orange/20"
      },
      gold: {
        bg: "from-brand-purple/40 to-brand-burgundy/30",
        border: "border-brand-gold/50",
        text: "text-brand-gold",
        shadow: "shadow-brand-gold/20"
      },
      burgundy: {
        bg: "from-brand-coral/40 to-brand-burgundy/30",
        border: "border-brand-coral/50",
        text: "text-brand-coral",
        shadow: "shadow-brand-coral/20"
      },
      purple: {
        bg: "from-brand-purple/40 to-brand-navy/30",
        border: "border-brand-purple/50",
        text: "text-brand-purple",
        shadow: "shadow-brand-purple/20"
      }
    };
    return colorMap[color] || colorMap.coral;
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar language={language} setLanguage={handleLanguageChange} navTranslations={navT.nav} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-coral text-sm font-semibold tracking-wider uppercase mb-4">
              {language === "en" ? "PORTFOLIO" : "PORTAFOLIO"}
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              {language === "en" ? "Projects & Research" : "Proyectos e Investigación"}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {language === "en"
                ? "From astrophysical simulations to machine learning applications in biomedical sciences, explore my work at the intersection of science and technology."
                : "Desde simulaciones astrofísicas hasta aplicaciones de machine learning en ciencias biomédicas, explora mi trabajo en la intersección de ciencia y tecnología."}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const colors = getColorClasses(project.color);
              return (
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <div className={`group relative bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:${colors.border} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:${colors.shadow} h-full`}>
                    {/* Project Image */}
                    {project.image && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}

                    <div className="relative z-10 p-6">
                      <h3 className={`text-2xl font-bold text-white mb-3 group-hover:${colors.text} transition-colors`}>
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-gray-400 mb-2 text-sm italic">{project.subtitle}</p>
                      )}
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 text-white text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={`inline-flex items-center ${colors.text} text-sm font-semibold`}>
                        {language === "en" ? "Learn More" : "Saber Más"}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
