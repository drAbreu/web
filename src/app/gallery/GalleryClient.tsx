"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { translations, type Language } from "@/lib/i18n";
import type { en } from "@/locales/en";
import galleryData from "@/data/gallery.json";
import equipmentData from "@/data/my-equipment.json";

// ── Types ────────────────────────────────────────────────────────────────────

interface GalleryPhoto {
  id: string;
  title: string;
  /** Spanish title; falls back to `title` when missing */
  title_es?: string;
  subject: string;
  subject_es?: string;
  category: "lunar" | "solar" | "planetary" | "dso" | "landscape" | "other";
  date: string;
  image_url: string;
  description: string;
  description_es?: string;
  location: string;
  location_es?: string;
  equipment: string[];
  tags: string[];
  print_available: boolean;
}

interface Equipment {
  id: string;
  name: string;
  short: string;
  affiliate_url: string;
  thumb: string;
}

type GalleryCopy = typeof en.gallery;

const photos = galleryData as GalleryPhoto[];
const equipmentMap = equipmentData as Record<string, Equipment>;

// ── Category config ───────────────────────────────────────────────────────────

const CATEGORY_TABS: { key: keyof GalleryCopy["categories"]; icon: string }[] = [
  { key: "all", icon: "✦" },
  { key: "planetary", icon: "🪐" },
  { key: "lunar", icon: "🌕" },
  { key: "solar", icon: "☀️" },
  { key: "dso", icon: "🌌" },
  { key: "other", icon: "📷" },
];

const CATEGORY_COLORS: Record<string, string> = {
  planetary: "#f4a566",
  lunar: "#ffc488",
  solar: "#ffdd99",
  dso: "#a78bfa",
  other: "#94a3b8",
};

function formatDate(dateStr: string, lang: Language): string {
  const locale = lang === "es" ? "es-ES" : "en-GB";
  return new Date(dateStr + "T12:00:00").toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Resolved copy for `title`, `description`, `subject`, and `location` based on UI language. */
function galleryLocalized(photo: GalleryPhoto, lang: Language) {
  if (lang === "es") {
    return {
      title: photo.title_es ?? photo.title,
      description: photo.description_es ?? photo.description,
      subject: photo.subject_es ?? photo.subject,
      location: photo.location_es ?? photo.location,
    };
  }
  return {
    title: photo.title,
    description: photo.description,
    subject: photo.subject,
    location: photo.location,
  };
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  language,
  copy: g,
}: {
  photo: GalleryPhoto;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  language: Language;
  copy: GalleryCopy;
}) {
  const isAstro = photo.category !== "other" && photo.category !== "landscape";
  const gear = photo.equipment.map(id => equipmentMap[id]).filter(Boolean);
  const loc = galleryLocalized(photo, language);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(5,8,16,0.97)" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        onClick={e => e.stopPropagation()}
      >
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-widest mr-3"
            style={{ color: CATEGORY_COLORS[photo.category] ?? "#94a3b8" }}
          >
            {loc.subject}
          </span>
          <span className="text-white font-medium">{loc.title}</span>
          <span className="text-sm ml-4" style={{ color: "rgba(255,255,255,0.4)" }}>
            {formatDate(photo.date, language)} · {loc.location}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.6)" }}
          aria-label={g.close}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Main area */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Prev */}
        <button
          className="flex-shrink-0 flex items-center justify-center w-14 transition-colors hover:bg-white/5 disabled:opacity-20"
          onClick={e => {
            e.stopPropagation();
            onPrev();
          }}
          disabled={!hasPrev}
          aria-label={g.previousPhoto}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center p-4 min-w-0" onClick={e => e.stopPropagation()}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.image_url}
            alt={loc.title}
            className="max-w-full max-h-full object-contain"
            style={{ maxHeight: "calc(100vh - 180px)" }}
          />
        </div>

        {/* Next */}
        <button
          className="flex-shrink-0 flex items-center justify-center w-14 transition-colors hover:bg-white/5 disabled:opacity-20"
          onClick={e => {
            e.stopPropagation();
            onNext();
          }}
          disabled={!hasNext}
          aria-label={g.nextPhoto}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth={2}>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Bottom panel: description + equipment */}
      <div
        className="flex-shrink-0 border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(10,14,26,0.98)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto px-6 py-4">
          {/* Description */}
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            {loc.description}
          </p>

          {/* Equipment + AstroShop banner */}
          {isAstro && gear.length > 0 && (
            <div className="flex flex-wrap items-start gap-4">
              <span
                className="text-xs font-semibold uppercase tracking-widest self-center"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {g.gearUsed}
              </span>
              {gear.map(item => (
                <a
                  key={item.id}
                  href={item.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    textDecoration: "none",
                  }}
                  title={item.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.thumb} alt={item.name} className="w-8 h-8 object-contain rounded" />
                  <div>
                    <div className="text-xs font-medium leading-tight" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {item.short}
                    </div>
                    <div className="text-[10px]" style={{ color: "rgba(255,196,136,0.7)" }}>
                      {g.astroShopLink}
                    </div>
                  </div>
                </a>
              ))}

              {/* AstroShop banner */}
              <a
                href="https://www.astroshop.eu/?affiliate_id=abreudata"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto self-center hidden md:block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.astroshop.eu/banner/100/en/banner_468x60.gif"
                  alt={g.astroShopBannerAlt}
                  className="rounded opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: "40px", width: "auto" }}
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function GalleryClient() {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];
  const g = t.gallery;

  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all" ? photos : photos.filter(p => p.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () => setLightboxIndex(i => (i != null && i > 0 ? i - 1 : i)),
    []
  );
  const goNext = useCallback(
    () => setLightboxIndex(i => (i != null && i < filtered.length - 1 ? i + 1 : i)),
    [filtered.length]
  );

  useEffect(() => {
    document.title = g.documentTitle;
  }, [g.documentTitle]);

  // Category counts
  const counts: Record<string, number> = { all: photos.length };
  for (const p of photos) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }

  return (
    <div className="min-h-screen" style={{ background: "rgb(8,12,24)" }}>
      <Navbar language={language} setLanguage={setLanguage} navTranslations={t.nav} />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#ffc488" }}>
            {g.sectionLabel}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{g.title}</h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
            {g.descriptionLine1}
            <br className="hidden md:block" />
            {g.descriptionLine2}
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="flex justify-center px-4 pb-10">
        <div
          className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {CATEGORY_TABS.filter(c => c.key === "all" || (counts[c.key] ?? 0) > 0).map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat.key ? "rgba(255,255,255,0.1)" : "transparent",
                color: activeCategory === cat.key ? "#fff" : "rgba(255,255,255,0.5)",
                border:
                  activeCategory === cat.key
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid transparent",
              }}
            >
              <span>{cat.icon}</span>
              <span>{g.categories[cat.key]}</span>
              {counts[cat.key] != null && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                >
                  {counts[cat.key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <main className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((photo, idx) => {
            const loc = galleryLocalized(photo, language);
            return (
            <button
              key={photo.id}
              className="group relative overflow-hidden rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-white/30"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                aspectRatio: "4/3",
              }}
              onClick={() => openLightbox(idx)}
              aria-label={g.openPhotoAria.replace("{title}", loc.title)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.image_url}
                alt={loc.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,8,16,0.85) 0%, rgba(5,8,16,0.2) 50%, transparent 100%)",
                  opacity: 0.7,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full"
                  style={{
                    background: "rgba(5,8,16,0.7)",
                    color: CATEGORY_COLORS[photo.category] ?? "#94a3b8",
                    border: `1px solid ${CATEGORY_COLORS[photo.category] ?? "#94a3b8"}33`,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {loc.subject}
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                <div className="text-white font-semibold text-sm leading-tight mb-1 group-hover:text-white/90">
                  {loc.title}
                </div>
                <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {formatDate(photo.date, language)}
                </div>
              </div>

              {/* Expand icon on hover */}
              <div
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24" style={{ color: "rgba(255,255,255,0.3)" }}>
            {g.emptyCategory}
          </div>
        )}
      </main>

      {/* AstroShop banner strip */}
      <div
        className="py-6 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
          {g.equipmentStrip}
        </p>
        <a
          href="https://www.astroshop.eu/?affiliate_id=abreudata"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.astroshop.eu/banner/100/en/banner_468x60.gif"
            alt={g.astroShopBannerAlt}
            className="mx-auto opacity-70 hover:opacity-100 transition-opacity"
          />
        </a>
      </div>

      <Footer language={language} />

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          photo={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filtered.length - 1}
          language={language}
          copy={g}
        />
      )}
    </div>
  );
}
