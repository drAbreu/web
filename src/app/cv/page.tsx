"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cvEn } from "@/locales/cv-en";
import { cvEs } from "@/locales/cv-es";
import { translations, type Language } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";

export default function CVPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState("");
  
  const t = language === "en" ? cvEn : cvEs;
  const navT = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          current = section.getAttribute("id") || "";
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Navbar */}
      <Navbar language={language} setLanguage={setLanguage} navTranslations={navT.nav} />

      {/* Spotlight Effect */}
      <SpotlightCursor 
        config={{
          radius: 350,
          brightness: 0.08,
          color: '#c97870', // brand-coral - subtle twilight accent
          smoothing: 0.1,
        }}
      />

      {/* Background with soft focus */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/solar_corona.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
      </div>

      {/* Fixed Navigation Sidebar - Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-1/3 max-w-md flex-col justify-between p-12 pt-28 z-10">
        <div>
          {/* Header */}
          <div className="mb-12">
            {/* Profile Image */}
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-coral/30 shadow-lg shadow-brand-coral/20">
                <Image
                  src="/datastar-full.png"
                  alt="Dr. Jorge Abreu-Vicente"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Dr. Jorge Abreu-Vicente
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              {t.tagline}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t.sections.about.content.substring(0, 200)}...
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            {[
              { id: "about", label: t.navigation.about },
              { id: "experience", label: t.navigation.experience },
              { id: "projects", label: t.navigation.projects },
              { id: "education", label: t.navigation.education },
              { id: "publications", label: t.navigation.publications },
              { id: "awards", label: t.navigation.awards },
              { id: "outreach", label: t.navigation.outreach },
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block group transition-all duration-300 ${
                  activeSection === section.id ? "text-brand-coral" : "text-gray-500 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-px transition-all duration-300 ${
                    activeSection === section.id ? "w-16 bg-brand-coral" : "w-8 bg-gray-600 group-hover:w-12 group-hover:bg-white"
                  }`}></div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {section.label}
                  </span>
                </div>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Links */}
        <div>
          {/* Language Switcher */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setLanguage("en")}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    language === "en"
                      ? "bg-brand-orange text-black"
                      : "text-gray-500 hover:text-white"
                  }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("es")}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    language === "es"
                      ? "bg-brand-orange text-black"
                      : "text-gray-500 hover:text-white"
                  }`}
            >
              ES
            </button>
          </div>

          {/* Academic Links */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link href="https://orcid.org/0000-0002-0211-6416" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors text-xs font-bold">
              ORCID
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="https://ui.adsabs.harvard.edu/search/q=abreu-vicente&sort=date%20desc%2C%20bibcode%20desc&p_=0" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors text-xs font-bold" title="NASA ADS Abstract System">
              NASA/ADS
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors text-xs font-bold">
              G. Scholar
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <Link href="https://www.linkedin.com/in/abreujorge-dataresearch/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link href="https://github.com/drAbreu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[33.333333%] lg:w-2/3 relative z-10 p-8 lg:p-24 pb-24">
        {/* Mobile Title */}
        <div className="lg:hidden mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Dr. Jorge Abreu-Vicente
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            {t.tagline}
          </p>
        </div>

        {/* About Section */}
        <section id="about" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-coral mb-6 lg:hidden">
            {t.sections.about.title}
          </h2>
          <div className="space-y-3 text-gray-300 leading-relaxed">
            {t.sections.about.content.split('. ').map((sentence, i) => (
              <p key={i} className="hover:text-white transition-colors">
                {sentence}{sentence && '.'}
              </p>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-8 sticky top-24 lg:top-0 bg-black/50 backdrop-blur-sm py-4 lg:relative lg:bg-transparent">
            {t.sections.experience.title}
          </h2>

          {/* Academic Experience */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-brand-coral mb-6">
              {t.sections.experience.academic.subtitle}
            </h3>
            <div className="space-y-8">
              {t.sections.experience.academic.items.map((job, i) => (
                <div
                  key={i}
                  className="group relative hover:bg-white/5 hover:shadow-lg hover:shadow-brand-coral/10 rounded-lg p-6 -mx-6 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-1 text-sm text-gray-500 font-mono">
                      {job.years}
                    </div>
                    <div className="lg:col-span-3">
                      <h4 className="text-lg font-semibold text-white group-hover:text-brand-gold transition-colors mb-1">
                        {job.title}
                      </h4>
                      <p className="text-gray-400 mb-1">{job.organization}</p>
                      <p className="text-sm text-gray-500 mb-3">{job.location}</p>
                      <p className="text-gray-400 leading-relaxed">
                        {job.description}
                      </p>
                      
                      {/* EMBO Resources - Only show for EMBO position */}
                      {job.organization.includes("EMBO") && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                            {language === "en" ? "Resources & Code" : "Recursos y Código"}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Link
                              href="https://github.com/source-data"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-gold transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                              </svg>
                              SourceData
                            </Link>
                            <Link
                              href="https://huggingface.co/EMBO"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-orange transition-colors text-sm"
                            >
                              🤗 HuggingFace
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Experience */}
          <div>
            <h3 className="text-lg font-semibold text-brand-coral mb-6">
              {t.sections.experience.industry.subtitle}
            </h3>
            <div className="space-y-8">
              {t.sections.experience.industry.items.map((job, i) => (
                <div
                  key={i}
                  className="group relative hover:bg-white/5 hover:shadow-lg hover:shadow-brand-coral/10 rounded-lg p-6 -mx-6 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-1 text-sm text-gray-500 font-mono">
                      {job.years}
                    </div>
                    <div className="lg:col-span-3">
                      <h4 className="text-lg font-semibold text-white group-hover:text-brand-gold transition-colors mb-1">
                        {job.title}
                      </h4>
                      <p className="text-gray-400 mb-1">{job.organization}</p>
                      <p className="text-sm text-gray-500 mb-3">{job.location}</p>
                      <p className="text-gray-400 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-8 sticky top-24 lg:top-0 bg-black/50 backdrop-blur-sm py-4 lg:relative lg:bg-transparent">
            {t.sections.projects.title}
          </h2>
          <div className="space-y-8">
            {t.sections.projects.items.map((project, i) => (
              <div
                key={i}
                className="group relative hover:bg-white/5 hover:shadow-lg hover:shadow-brand-orange/10 rounded-lg p-6 -mx-6 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-1 text-sm text-gray-500 font-mono">
                    {project.year}
                  </div>
                  <div className="lg:col-span-3">
                    {project.link ? (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg font-semibold text-white group-hover:text-brand-orange transition-colors mb-3"
                      >
                        {project.name}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    ) : (
                      <h4 className="text-lg font-semibold text-white group-hover:text-brand-orange transition-colors mb-3">
                        {project.name}
                      </h4>
                    )}
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-accent-teal/10 text-accent-teal text-xs rounded-full border border-accent-teal/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-8 sticky top-24 lg:top-0 bg-black/50 backdrop-blur-sm py-4 lg:relative lg:bg-transparent">
            {t.sections.education.title}
          </h2>
          <div className="space-y-8">
            {t.sections.education.items.map((edu, i) => (
              <div
                key={i}
                className="group relative hover:bg-white/5 hover:shadow-lg hover:shadow-brand-gold/10 rounded-lg p-6 -mx-6 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-1 text-sm text-gray-500 font-mono">
                    {edu.year}
                  </div>
                  <div className="lg:col-span-3">
                    <h4 className="text-lg font-semibold text-white group-hover:text-brand-gold transition-colors mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-400 mb-1">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mb-3">{edu.location}</p>
                    <p className="text-gray-400 leading-relaxed">
                      {edu.details}
                    </p>
                    {edu.link && (
                      <Link
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent-teal hover:text-accent-mint transition-colors mt-2"
                      >
                        View Thesis
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-8 sticky top-24 lg:top-0 bg-black/50 backdrop-blur-sm py-4 lg:relative lg:bg-transparent">
            {t.sections.publications.title}
          </h2>
          
          <p className="text-brand-coral text-lg mb-6">
            {t.sections.publications.refereed.total}
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-400 mb-4">
              {t.sections.publications.refereed.subtitle}
            </h3>
            <div className="space-y-4">
              {t.sections.publications.refereed.items.slice(0, 5).map((pub, i) => (
                <div
                  key={i}
                  className="group relative hover:bg-white/5 rounded-lg p-4 -mx-4 transition-all duration-300"
                >
                  <div className="flex gap-4">
                    <span className="text-sm text-gray-500 font-mono flex-shrink-0">
                      {pub.year}
                    </span>
                    <div>
                      <p className="text-white group-hover:text-accent-teal transition-colors mb-1">
                        {pub.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {pub.authors} • {pub.journal}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://orcid.org/0000-0002-0211-6416"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-teal hover:text-accent-mint transition-colors"
            >
              View on ORCID
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <Link
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-teal hover:text-accent-mint transition-colors"
            >
              Google Scholar
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-8 sticky top-24 lg:top-0 bg-black/50 backdrop-blur-sm py-4 lg:relative lg:bg-transparent">
            {t.sections.awards.title}
          </h2>
          <div className="space-y-6">
            {t.sections.awards.items.map((award, i) => (
              <div
                key={i}
                className="group relative hover:bg-white/5 rounded-lg p-4 -mx-4 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <span className="text-sm text-gray-500 font-mono flex-shrink-0">
                    {award.year}
                  </span>
                  <div>
                    <p className="text-white group-hover:text-brand-gold transition-colors mb-1">
                      {award.award}
                    </p>
                    <p className="text-sm text-gray-500">{award.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outreach Section */}
        <section id="outreach" className="mb-16 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-8 sticky top-24 lg:top-0 bg-black/50 backdrop-blur-sm py-4 lg:relative lg:bg-transparent">
            {t.sections.outreach.title}
          </h2>
          <div className="space-y-6">
            {t.sections.outreach.items.map((item, i) => (
              <div
                key={i}
                className="group relative hover:bg-white/5 rounded-lg p-6 -mx-6 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-1 text-sm text-gray-500 font-mono">
                    {item.years}
                  </div>
                  <div className="lg:col-span-3">
                    {item.link ? (
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white group-hover:text-brand-coral transition-colors mb-2"
                      >
                        {item.title}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    ) : (
                      <h4 className="text-white group-hover:text-brand-coral transition-colors mb-2">
                        {item.title}
                      </h4>
                    )}
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm border-t border-white/10 pt-12">
          <p>
            © 2025 Dr. Jorge Abreu-Vicente • {" "}
            <Link href="/" className="text-accent-teal hover:text-accent-mint transition-colors">
              DATASTAR
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}

