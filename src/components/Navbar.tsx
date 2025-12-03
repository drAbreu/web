"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GradientButton } from "@/components/ui/gradient-button";
import type { Language } from "@/lib/i18n";

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  navTranslations: {
    home: string;
    projects: string;
    blog: string;
    services: string;
    research: string;
    about: string;
    cv: string;
    contact: string;
  };
}

export default function Navbar({ language, setLanguage, navTranslations }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down (and not at the top)
      else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setMobileMenuOpen(false); // Close mobile menu when hiding
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-[rgb(13,21,32)]/98 backdrop-blur-md border-b border-white/10 shadow-lg transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image
                src="/datastar-logo.png"
                alt="DATASTAR"
                width={200}
                height={60}
                className="h-10 w-auto drop-shadow-2xl"
              />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="text-sm px-4 py-2 text-white/90 font-medium transition-all hover:text-white">
                {navTranslations.home}
              </Link>
              <Link href="/projects" className="text-sm px-4 py-2 text-white/70 hover:text-white transition-all">
                {navTranslations.projects}
              </Link>
              <Link href="/blog" className="text-sm px-4 py-2 text-white/70 hover:text-white transition-all">
                {navTranslations.blog}
              </Link>
              <Link href="/cv" className="text-sm px-4 py-2 text-white/70 hover:text-white transition-all">
                {navTranslations.cv}
              </Link>
              <Link href="/about" className="text-sm px-4 py-2 text-white/70 hover:text-white transition-all">
                {navTranslations.about}
              </Link>
            </nav>

            {/* Language Switcher & Contact Button */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    language === "en"
                      ? "bg-brand-orange text-black"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("es")}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    language === "es"
                      ? "bg-brand-orange text-black"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  ES
                </button>
              </div>

              <Link href="/contact">
                <GradientButton className="text-sm">
                  {navTranslations.contact}
                </GradientButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-brand-gold transition-colors"
              aria-label="Toggle menu"
            >
              {!mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-navy/95 backdrop-blur-lg border-t border-white/10">
            <nav className="px-4 py-6 space-y-4">
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                <span className="text-white/70 text-sm">{language === "en" ? "Language:" : "Idioma:"}</span>
                <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                      language === "en"
                        ? "bg-brand-orange text-black"
                        : "text-white/70"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("es")}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                      language === "es"
                        ? "bg-brand-orange text-black"
                        : "text-white/70"
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>

              <Link 
                href="/" 
                className="block text-white/90 font-medium py-2 hover:text-brand-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navTranslations.home}
              </Link>
              <Link 
                href="/projects" 
                className="block text-white/70 py-2 hover:text-brand-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navTranslations.projects}
              </Link>
              <Link 
                href="/blog" 
                className="block text-white/70 py-2 hover:text-brand-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navTranslations.blog}
              </Link>
              <Link 
                href="/cv" 
                className="block text-white/70 py-2 hover:text-brand-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navTranslations.cv}
              </Link>
              <Link 
                href="/about" 
                className="block text-white/70 py-2 hover:text-brand-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navTranslations.about}
              </Link>
              <Link 
                href="/contact" 
                className="block pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <GradientButton className="w-full justify-center">
                  {navTranslations.contact}
                </GradientButton>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

