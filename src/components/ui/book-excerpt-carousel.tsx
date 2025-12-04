"use client";

import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

export interface BookExcerpt {
  id: string | number;
  label: string;
  category: string;
  text: string;
}

export interface BookExcerptCarouselProps {
  excerpts: BookExcerpt[];
  /** How many cards to show behind the main card */
  visibleBehind?: number;
}

export const BookExcerptCarousel = ({ excerpts, visibleBehind = 2 }: BookExcerptCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = excerpts.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    cardRefs.current[activeIndex]?.classList.add('is-dragging');
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    cardRefs.current[activeIndex]?.classList.remove('is-dragging');
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!excerpts?.length) return null;

  const goPrevious = useCallback(() => navigate(activeIndex - 1), [activeIndex, navigate]);
  const goNext = useCallback(() => navigate(activeIndex + 1), [activeIndex, navigate]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goPrevious();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goPrevious, goNext]);

  return (
    <section className="book-excerpt-carousel relative pb-16">
      {/* Navigation Arrows */}
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={goPrevious}
        aria-label="Previous card"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      
      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={goNext}
        aria-label="Next card"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Card Counter */}
      <div className="card-counter">
        {activeIndex + 1} / {totalCards}
      </div>

      {excerpts.map((excerpt, index) => {
        const isActive = index === activeIndex;
        const displayOrder = (index - activeIndex + totalCards) % totalCards;

        const style: CSSProperties = {};
        if (displayOrder === 0) {
          style.transform = `translateX(${dragOffset}px)`;
          style.opacity = 1;
          style.zIndex = totalCards;
        } else if (displayOrder <= visibleBehind) {
          const scale = 1 - 0.06 * displayOrder;
          const translateX = displayOrder % 2 === 1 ? -30 * displayOrder : 30 * displayOrder;
          const translateY = -10 * displayOrder;
          style.transform = `scale(${scale}) translateX(${translateX}px) translateY(${translateY}px)`;
          style.opacity = Math.max(0.3, 0.5 - 0.1 * displayOrder);
          style.zIndex = totalCards - displayOrder;
        } else {
          style.transform = 'scale(0)';
          style.opacity = 0;
          style.zIndex = 0;
        }

        return (
          <div
            ref={el => { cardRefs.current[index] = el; }}
            key={excerpt.id || index}
            className="excerpt-card glass-effect"
            style={style}
            onMouseDown={(e) => handleDragStart(e, index)}
            onTouchStart={(e) => handleDragStart(e, index)}
          >
            <div className="excerpt-card-content">
              <div className="excerpt-label">{excerpt.label}</div>
              <div className="excerpt-category">{excerpt.category}</div>
              <p className="excerpt-text">{excerpt.text}</p>
            </div>
          </div>
        );
      })}

      {/* Pagination Dots */}
      <div className="pagination">
        {excerpts.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to excerpt ${index + 1}`}
            onClick={() => navigate(index)}
            className={`pagination-dot ${activeIndex === index ? 'active' : ''}`}
          />
        ))}
      </div>

      <style jsx>{`
        .book-excerpt-carousel {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-4xl) var(--spacing-4xl);
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--primary);
          background: var(--card);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 300ms ease;
          box-shadow: 0 4px 12px oklch(0.5234 0.1347 144.1672 / 0.15);
        }

        .carousel-arrow:hover {
          background: var(--primary);
          color: var(--primary-foreground);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px oklch(0.5234 0.1347 144.1672 / 0.25);
        }

        .carousel-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }

        .carousel-arrow-left {
          left: var(--spacing-lg);
        }

        .carousel-arrow-right {
          right: var(--spacing-lg);
        }

        .card-counter {
          position: absolute;
          top: var(--spacing-lg);
          right: var(--spacing-lg);
          z-index: 1000;
          background: var(--primary);
          color: var(--primary-foreground);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          box-shadow: 0 2px 8px oklch(0.5234 0.1347 144.1672 / 0.2);
        }

        .excerpt-card {
          position: absolute;
          width: 85%;
          max-width: 900px;
          padding: var(--spacing-3xl) var(--spacing-4xl);
          background: linear-gradient(
            135deg,
            var(--card) 0%,
            var(--muted) 100%
          );
          border: 2px solid var(--border);
          border-radius: var(--radius-xl);
          box-shadow: 
            0 8px 24px oklch(0.5234 0.1347 144.1672 / 0.08),
            0 4px 12px oklch(0 0 0 / 0.04);
          cursor: grab;
          transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 400ms ease,
                      box-shadow 300ms ease,
                      border-color 300ms ease;
          backdrop-filter: blur(10px);
        }

        .excerpt-card.is-dragging {
          cursor: grabbing;
        }

        .excerpt-card:hover {
          box-shadow: 
            0 12px 32px oklch(0.5234 0.1347 144.1672 / 0.12),
            0 6px 16px oklch(0 0 0 / 0.06);
          border-color: oklch(0.5234 0.1347 144.1672 / 0.3);
        }

        .excerpt-card-content {
          position: relative;
          z-index: 1;
        }

        .excerpt-label {
          font-family: var(--font-heading);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--primary);
          margin-bottom: var(--spacing-md);
          letter-spacing: var(--tracking-wide);
        }

        .excerpt-category {
          font-size: var(--text-sm);
          color: var(--muted-foreground);
          font-style: italic;
          margin-bottom: var(--spacing-xl);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border);
        }

        .excerpt-text {
          font-size: var(--text-lg);
          line-height: var(--leading-relaxed);
          color: var(--foreground);
          white-space: pre-line;
          letter-spacing: var(--tracking-normal);
        }

        .pagination {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: center;
          position: absolute;
          bottom: var(--spacing-xl);
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .pagination-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--primary);
          background-color: transparent;
          cursor: pointer;
          transition: all 300ms ease;
          padding: 0;
        }

        .pagination-dot:hover {
          background-color: oklch(0.5234 0.1347 144.1672 / 0.3);
          transform: scale(1.3);
        }

        .pagination-dot.active {
          background-color: var(--primary);
          width: 32px;
          border-radius: 6px;
          border-color: var(--primary);
        }

        .glass-effect {
          background: linear-gradient(
            135deg,
            var(--card) 0%,
            var(--muted) 100%
          );
        }

        @media (max-width: 1024px) {
          .carousel-arrow {
            width: 40px;
            height: 40px;
          }

          .carousel-arrow-left {
            left: var(--spacing-sm);
          }

          .carousel-arrow-right {
            right: var(--spacing-sm);
          }

          .card-counter {
            top: var(--spacing-sm);
            right: var(--spacing-sm);
          }
        }

        @media (max-width: 768px) {
          .book-excerpt-carousel {
            padding: var(--spacing-4xl) var(--spacing-xl);
          }

          .carousel-arrow {
            width: 36px;
            height: 36px;
          }

          .carousel-arrow-left {
            left: var(--spacing-xs);
          }

          .carousel-arrow-right {
            right: var(--spacing-xs);
          }

          .excerpt-card {
            width: 95%;
            padding: var(--spacing-2xl) var(--spacing-xl);
          }

          .excerpt-label {
            font-size: var(--text-2xl);
          }

          .excerpt-text {
            font-size: var(--text-base);
          }

          .card-counter {
            font-size: var(--text-xs);
            padding: var(--spacing-xs) var(--spacing-sm);
          }
        }
      `}</style>
    </section>
  );
};

