"use client";

import Link from "next/link";
import Image from "next/image";
import { GradientButton } from "@/components/ui/gradient-button";
import { useState, useEffect } from "react";
import { translations, type Language } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Project } from "@/lib/mdx";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  computer: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  document: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  globe: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  book: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  star: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

// Color class mapping
const colorClasses = {
  coral: {
    bg: 'from-brand-navy/50 to-brand-purple/30',
    hover: 'hover:border-brand-coral/50 hover:shadow-brand-coral/20',
    hoverBg: 'from-brand-coral/0 to-brand-coral/10',
    iconBg: 'bg-brand-coral/20 group-hover:bg-brand-coral/30',
    iconColor: 'text-brand-coral',
    titleHover: 'group-hover:text-brand-coral',
    tagBg: 'bg-brand-purple/50',
    linkColor: 'text-brand-coral group-hover:text-brand-orange',
  },
  orange: {
    bg: 'from-brand-burgundy/40 to-brand-coral/30',
    hover: 'hover:border-brand-orange/50 hover:shadow-brand-orange/20',
    hoverBg: 'from-brand-orange/0 to-brand-orange/10',
    iconBg: 'bg-brand-orange/20 group-hover:bg-brand-orange/30',
    iconColor: 'text-brand-orange',
    titleHover: 'group-hover:text-brand-orange',
    tagBg: 'bg-brand-coral/50',
    linkColor: 'text-brand-orange group-hover:text-brand-gold',
  },
  gold: {
    bg: 'from-brand-purple/40 to-brand-burgundy/30',
    hover: 'hover:border-brand-gold/50 hover:shadow-brand-gold/20',
    hoverBg: 'from-brand-gold/0 to-brand-gold/10',
    iconBg: 'bg-brand-gold/20 group-hover:bg-brand-gold/30',
    iconColor: 'text-brand-gold',
    titleHover: 'group-hover:text-brand-gold',
    tagBg: 'bg-brand-gold/50',
    linkColor: 'text-brand-gold group-hover:text-brand-orange',
  },
  burgundy: {
    bg: 'from-brand-coral/40 to-brand-burgundy/30',
    hover: 'hover:border-brand-coral/50 hover:shadow-brand-coral/20',
    hoverBg: 'from-brand-coral/0 to-brand-coral/10',
    iconBg: 'bg-brand-coral/20 group-hover:bg-brand-coral/30',
    iconColor: 'text-brand-coral',
    titleHover: 'group-hover:text-brand-coral',
    tagBg: 'bg-brand-burgundy/50',
    linkColor: 'text-brand-coral group-hover:text-brand-orange',
  },
  purple: {
    bg: 'from-brand-navy/50 to-brand-purple/30',
    hover: 'hover:border-brand-purple/50 hover:shadow-brand-purple/20',
    hoverBg: 'from-brand-purple/0 to-brand-purple/10',
    iconBg: 'bg-brand-purple/20 group-hover:bg-brand-purple/30',
    iconColor: 'text-brand-purple',
    titleHover: 'group-hover:text-brand-purple',
    tagBg: 'bg-brand-purple/50',
    linkColor: 'text-brand-purple group-hover:text-brand-gold',
  },
};

interface HomeClientProps {
  featuredProjects: Project[];
}

export default function HomeClient({ featuredProjects }: HomeClientProps) {
  const [language, setLanguage] = useState<Language>("en");

  const t = translations[language];

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

  // Filter projects by language
  const filteredProjects = (() => {
    const projectsByBase = new Map<string, Project[]>();
    featuredProjects.forEach(project => {
      const baseSlug = project.slug.replace(/-(?:en|es)$/, '');
      if (!projectsByBase.has(baseSlug)) {
        projectsByBase.set(baseSlug, []);
      }
      projectsByBase.get(baseSlug)!.push(project);
    });

    const result: Project[] = [];
    projectsByBase.forEach((versions) => {
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

    return result.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  })();

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar language={language} setLanguage={handleLanguageChange} navTranslations={t.nav} />

      {/* Hero Section with Astronomy Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/moon_with_cloud.jpg"
            alt="Celestial background"
            fill
            className="object-cover opacity-40"
            priority
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-coral to-brand-gold">
                {t.hero.subtitle}
              </span>
              <span className="block mt-6 text-white text-2xl sm:text-3xl lg:text-4xl font-normal">
                {t.hero.title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
              {t.hero.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-gold mb-2">
                  10+
                </div>
                <div className="text-sm text-gray-400">{t.hero.stats.years}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-orange mb-2">
                  10+
                </div>
                <div className="text-sm text-gray-400">{t.hero.stats.publications}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-gold mb-2">
                  AI/ML
                </div>
                <div className="text-sm text-gray-400">{t.hero.stats.aiml}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-burgundy to-brand-coral mb-2">
                  ✍️
                </div>
                <div className="text-sm text-gray-400">{t.hero.stats.book}</div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="px-5 py-2 bg-brand-navy/50 backdrop-blur-sm text-white rounded-full text-sm border border-brand-purple/50">
                🔭 {t.hero.expertise.astronomy}
              </span>
              <span className="px-5 py-2 bg-brand-navy/50 backdrop-blur-sm text-white rounded-full text-sm border border-brand-purple/50">
                🤖 {t.hero.expertise.dataScience}
              </span>
              <span className="px-5 py-2 bg-brand-navy/50 backdrop-blur-sm text-white rounded-full text-sm border border-brand-purple/50">
                🧬 {t.hero.expertise.aiBiomedicine}
              </span>
              <span className="px-5 py-2 bg-brand-navy/50 backdrop-blur-sm text-white rounded-full text-sm border border-brand-purple/50">
                📚 {t.hero.expertise.mentalHealth}
              </span>
              <span className="px-5 py-2 bg-brand-navy/50 backdrop-blur-sm text-white rounded-full text-sm border border-brand-purple/50">
                🗣 {t.hero.expertise.outreach}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/projects">
                <GradientButton className="px-8 py-3 text-lg">
                  {t.hero.cta.research}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </GradientButton>
              </Link>
              <Link href="/cv">
                <button className="px-8 py-3 rounded-full text-white border-2 border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm text-lg font-semibold">
                  {t.hero.cta.cv}
                </button>
              </Link>
            </div>

            {/* Academic Links */}
            <div className="mt-12 flex justify-center gap-6">
              <Link 
                href="https://orcid.org/0000-0002-0211-6416" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors text-sm"
              >
                {t.hero.academicLinks.orcid}
              </Link>
              <Link 
                href="https://ui.adsabs.harvard.edu/search/p_=0&q=abreu-vicente&sort=date%20desc%2C%20bibcode%20desc" 
            target="_blank"
            rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors text-sm"
              >
                {t.hero.academicLinks.featuredResearch}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-gray-400 text-sm">{t.hero.scroll}</span>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-coral text-sm font-semibold tracking-wider uppercase mb-4">{t.projects.sectionLabel}</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.projects.title}
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              {t.projects.description}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Dynamic Featured Projects */}
            {filteredProjects.map((project) => {
              const colors = colorClasses[project.color] || colorClasses.coral;
              const icon = iconMap[project.icon || 'computer'] || iconMap.computer;

              return (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="block">
                  <div className={`group relative bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-2xl p-6 border border-white/10 ${colors.hover} transition-all duration-500 hover:scale-105 hover:shadow-2xl h-full`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                        <div className={colors.iconColor}>
                          {icon}
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold text-white mb-3 ${colors.titleHover} transition-colors`}>
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-gray-400 mb-2 text-sm italic">
                          {project.subtitle}
                        </p>
                      )}
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, i) => (
                          <span key={i} className={`px-3 py-1 ${colors.tagBg} text-white text-xs rounded-full`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={`inline-flex items-center ${colors.linkColor} transition-colors text-sm font-semibold`}>
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

            {/* Call to Action Card */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-brand-orange/50 transition-all duration-500 hover:scale-105 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-brand-orange/30 transition-colors">
                  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t.projects.viewAll.title}
                </h3>
                <p className="text-gray-400 mb-6 text-sm">
                  {t.projects.viewAll.description}
                </p>
                <Link href="/projects">
                  <GradientButton>
                    {t.projects.viewAll.button}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </GradientButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
