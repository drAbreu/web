"use client";

import { useEffect, useRef } from "react";
import VideoBackground from "./VideoBackground";

interface MorgenrotHeroProps {
  t: any;
}

export default function MorgenrotHero({ t }: MorgenrotHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Trigger animations on mount
    const elements = hero.querySelectorAll(".hero-animate");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("morgenrot-reveal");
      }, index * 200);
    });
  }, []);

  const scrollToContent = () => {
    const whatIsSection = document.getElementById("what-is-morgenrot");
    if (whatIsSection) {
      whatIsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} className="morgenrot-hero">
      <VideoBackground>
        <div className="morgenrot-hero-content">
          <h1 className="morgenrot-hero-title hero-animate">
            {t.hero.title}
          </h1>

          <p className="morgenrot-hero-subtitle hero-animate">
            {t.hero.subtitle}
          </p>

          <div className="morgenrot-hero-badge hero-animate">
            {t.hero.comingSoon}
          </div>

          <p className="morgenrot-hero-editor-seeking hero-animate">
            {t.hero.editorSeeking}
          </p>

          <button
            onClick={scrollToContent}
            className="morgenrot-btn morgenrot-btn-primary hero-animate"
          >
            {t.hero.cta}
          </button>
        </div>
      </VideoBackground>

      {/* Scroll Down Indicator */}
      <div className="morgenrot-scroll-indicator hero-animate">
        <div className="scroll-arrow"></div>
      </div>

      <style jsx>{`
        .morgenrot-hero {
          position: relative;
          text-align: center;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .morgenrot-hero-content {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
          padding: var(--spacing-2xl) var(--spacing-lg);
        }

        .morgenrot-hero-title {
          font-family: var(--font-heading);
          font-size: var(--text-6xl);
          font-weight: 700;
          color: white;
          margin-bottom: var(--spacing-lg);
          letter-spacing: var(--tracking-wide);
          text-shadow: 0 4px 24px oklch(0 0 0 / 0.6), 0 2px 12px oklch(0 0 0 / 0.4);
          line-height: var(--leading-tight);
        }

        .morgenrot-hero-subtitle {
          font-family: var(--font-heading);
          font-size: var(--text-2xl);
          color: oklch(0.95 0.05 180);
          margin-bottom: var(--spacing-xl);
          font-weight: 400;
          text-shadow: 0 2px 16px oklch(0 0 0 / 0.5), 0 1px 8px oklch(0 0 0 / 0.3);
        }

        .morgenrot-hero-badge {
          display: inline-block;
          padding: var(--spacing-sm) var(--spacing-xl);
          background-color: var(--primary);
          color: var(--primary-foreground);
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: var(--text-sm);
          letter-spacing: var(--tracking-wider);
          margin-bottom: var(--spacing-lg);
          box-shadow: 0 4px 20px oklch(0.7227 0.1920 149.5793 / 0.4);
        }

        .morgenrot-hero-editor-seeking {
          font-size: var(--text-lg);
          color: oklch(0.92 0.03 180);
          margin-bottom: var(--spacing-2xl);
          max-width: 700px;
          line-height: var(--leading-relaxed);
          text-shadow: 0 2px 12px oklch(0 0 0 / 0.5);
          font-style: italic;
        }

        .morgenrot-scroll-indicator {
          position: absolute;
          bottom: var(--spacing-2xl);
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .scroll-arrow {
          width: 24px;
          height: 24px;
          border-right: 2px solid white;
          border-bottom: 2px solid white;
          transform: rotate(45deg);
          animation: scrollBounce 2s ease-in-out infinite;
          opacity: 0.8;
          box-shadow: 0 2px 8px oklch(0 0 0 / 0.3);
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(10px) rotate(45deg);
            opacity: 0.4;
          }
        }

        .hero-animate {
          opacity: 0;
        }

        @media (max-width: 768px) {
          .morgenrot-hero-title {
            font-size: var(--text-4xl);
          }

          .morgenrot-hero-subtitle {
            font-size: var(--text-xl);
          }

          .morgenrot-hero-editor-seeking {
            font-size: var(--text-base);
            padding: 0 var(--spacing-md);
          }

          .morgenrot-scroll-indicator {
            bottom: var(--spacing-lg);
          }
        }
      `}</style>
    </section>
  );
}
