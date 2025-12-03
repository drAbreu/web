"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { translations, type Language } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutClient() {
  const [language, setLanguage] = useState<Language>("en");
  const [imageError, setImageError] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const t = translations[language];

  // Load language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang);
    }
  }, []);

  // Save language preference when it changes
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // Using Formspree - replace with your form endpoint
      // Sign up at https://formspree.io/ and create a form to get your endpoint
      const response = await fetch("https://formspree.io/f/xkgdbezy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Contact from ${formData.name}: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abreujorge-dataresearch/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/drAbreu",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: "Medium",
      url: "https://medium.com/@datastar",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
    },
    {
      name: "ORCID",
      url: "https://orcid.org/0000-0002-0211-6416",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar language={language} setLanguage={handleLanguageChange} navTranslations={t.nav} />

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.about.title}
            </h1>
            <p className="text-xl text-gray-400">{t.about.subtitle}</p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-brand-navy/50 to-brand-purple/30 backdrop-blur-sm rounded-2xl p-8 border border-brand-coral/30 shadow-2xl">
                  {/* Profile Photo */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-brand-coral/50 shadow-lg shadow-brand-coral/20 bg-brand-navy flex items-center justify-center p-2">
                      <Image
                        src={imageError ? "/datastar-logo.png" : "/author-photo.png"}
                        alt={t.about.profile.name}
                        width={144}
                        height={144}
                        className="object-cover rounded-full"
                        priority
                        unoptimized
                        onError={() => setImageError(true)}
                      />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {t.about.profile.name}
                    </h2>
                    <p className="text-brand-coral font-semibold mb-3">
                      {t.about.profile.title}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t.about.profile.summary}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-6 pb-6 border-b border-white/10">
                    <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{t.about.profile.location}</span>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-3">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-brand-coral/30 text-gray-300 hover:text-white rounded-lg transition-all duration-300 group border border-white/10 hover:border-brand-coral/50"
                      >
                        <span className="group-hover:scale-110 transition-transform">
                          {social.icon}
                        </span>
                        <span className="text-sm font-medium">{social.name}</span>
                        <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Biography & Contact Form */}
            <div className="lg:col-span-2 space-y-12">
              {/* Biography Section */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-brand-coral rounded-full"></span>
                  {t.about.biography.title}
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  {t.about.biography.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Contact Form Section */}
              <section className="bg-gradient-to-br from-brand-navy/30 to-brand-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-brand-coral/20">
                <h2 className="text-3xl font-bold text-white mb-3 flex items-center gap-3">
                  <span className="w-1 h-8 bg-brand-gold rounded-full"></span>
                  {t.about.contact.title}
                </h2>
                <p className="text-gray-400 mb-8">{t.about.contact.description}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        {t.about.contact.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-coral/50 focus:ring-2 focus:ring-brand-coral/20 transition-all"
                        placeholder={t.about.contact.form.name}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        {t.about.contact.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-coral/50 focus:ring-2 focus:ring-brand-coral/20 transition-all"
                        placeholder={t.about.contact.form.email}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      {t.about.contact.form.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-coral/50 focus:ring-2 focus:ring-brand-coral/20 transition-all"
                      placeholder={t.about.contact.form.subject}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {t.about.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-coral/50 focus:ring-2 focus:ring-brand-coral/20 transition-all resize-none"
                      placeholder={t.about.contact.form.message}
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-brand-coral to-brand-orange text-white font-semibold rounded-lg shadow-lg hover:shadow-brand-coral/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {formStatus === "sending"
                        ? t.about.contact.form.sending
                        : t.about.contact.form.send}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {formStatus === "success" && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t.about.contact.form.success}
                    </div>
                  )}

                  {formStatus === "error" && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t.about.contact.form.error}
                    </div>
                  )}
                </form>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
