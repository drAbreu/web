"use client";

import { BookExcerptCarousel } from "@/components/ui/book-excerpt-carousel";

interface MorgenrotGlimpseProps {
  t: any;
}

export default function MorgenrotGlimpse({ t }: MorgenrotGlimpseProps) {
  const excerpts = t.glimpse.flashCards?.cards.map((card: any, index: number) => ({
    id: index,
    label: card.label,
    category: card.category,
    text: card.text,
  })) || [];

  return (
    <section className="morgenrot-section glimpse-section">
      <div className="glimpse-content">
        {/* Book Excerpts Carousel */}
        {t.glimpse.flashCards && excerpts.length > 0 && (
          <div className="flash-cards-section">
            <BookExcerptCarousel excerpts={excerpts} visibleBehind={2} />
          </div>
        )}
      </div>

      <style jsx>{`
        .glimpse-section {
          background: linear-gradient(
            180deg,
            var(--background) 0%,
            var(--muted) 30%,
            var(--muted) 70%,
            var(--background) 100%
          );
          position: relative;
        }

        .glimpse-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, oklch(0.5234 0.1347 144.1672 / 0.02) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, oklch(0.8952 0.0504 146.0366 / 0.02) 0%, transparent 50%);
          pointer-events: none;
          opacity: 0.6;
        }

        .glimpse-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .flash-cards-section {
          margin-bottom: var(--spacing-3xl);
        }
      `}</style>
    </section>
  );
}
