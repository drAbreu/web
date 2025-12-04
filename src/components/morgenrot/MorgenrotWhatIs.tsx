"use client";

interface MorgenrotWhatIsProps {
  t: any;
}

export default function MorgenrotWhatIs({ t }: MorgenrotWhatIsProps) {
  const pillars = [
    {
      icon: "🎤",
      ...t.whatIs.pillars.testimony,
    },
    {
      icon: "🔬",
      ...t.whatIs.pillars.science,
    },
    {
      icon: "🌊",
      ...t.whatIs.pillars.process,
    },
    {
      icon: "💡",
      ...t.whatIs.pillars.transparency,
    },
  ];

  return (
    <section id="what-is-morgenrot" className="morgenrot-section">
      <h2 className="morgenrot-section-title">{t.whatIs.title}</h2>

      <div className="what-is-content">
        <p className="what-is-definition">{t.whatIs.definition}</p>

        <div className="pillars-container">
          <h3 className="pillars-title">{t.whatIs.pillarsTitle}</h3>

          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card">
                <div className="pillar-icon-wrapper">
                  <div className="pillar-icon">{pillar.icon}</div>
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-description">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="status-badge-container">
          <span className="morgenrot-badge">🏷️ {t.whatIs.status}</span>
        </div>
      </div>

      <style jsx>{`
        .what-is-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .what-is-definition {
          font-size: var(--text-2xl);
          line-height: var(--leading-relaxed);
          text-align: center;
          color: var(--foreground);
          margin-bottom: var(--spacing-4xl);
          padding: var(--spacing-3xl) var(--spacing-2xl);
          background: linear-gradient(
            135deg,
            var(--muted) 0%,
            var(--card) 100%
          );
          border-radius: var(--radius-xl);
          border-left: 4px solid var(--primary);
          font-weight: 400;
          box-shadow: 0 2px 12px oklch(0 0 0 / 0.03);
          position: relative;
        }

        .what-is-definition::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            transparent 0%,
            oklch(0.9824 0.0013 286.3757 / 0.5) 100%
          );
          border-radius: var(--radius-xl);
          pointer-events: none;
        }

        .pillars-container {
          margin-bottom: var(--spacing-4xl);
        }

        .pillars-title {
          font-family: var(--font-heading);
          font-size: var(--text-3xl);
          text-align: center;
          margin-bottom: var(--spacing-2xl);
          color: var(--foreground);
          font-weight: 600;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-2xl);
          margin-bottom: var(--spacing-3xl);
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          align-items: start;
        }

        .pillar-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: var(--spacing-md);
        }

        .pillar-icon-wrapper {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--card) 0%,
            var(--muted) 50%,
            var(--card) 100%
          );
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--spacing-xl);
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 4px 16px oklch(0 0 0 / 0.04),
            0 2px 8px oklch(0 0 0 / 0.02);
          position: relative;
        }

        .pillar-icon-wrapper::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--primary),
            var(--secondary)
          );
          opacity: 0;
          z-index: -1;
          transition: opacity 400ms ease;
        }

        .pillar-card:hover .pillar-icon-wrapper {
          border-color: var(--primary);
          transform: translateY(-6px);
          box-shadow: 
            0 8px 24px oklch(0.6487 0.1538 150.3071 / 0.08),
            0 4px 12px oklch(0 0 0 / 0.04);
        }

        .pillar-card:hover .pillar-icon-wrapper::before {
          opacity: 0.1;
        }

        .pillar-icon {
          font-size: 4.5rem;
        }

        .pillar-title {
          font-family: var(--font-heading);
          font-size: var(--text-xl);
          font-weight: 600;
          margin-bottom: var(--spacing-md);
          color: var(--foreground);
          letter-spacing: var(--tracking-normal);
          transition: color 300ms ease;
        }

        .pillar-card:hover .pillar-title {
          color: var(--primary);
        }

        .pillar-description {
          font-size: var(--text-base);
          color: var(--muted-foreground);
          line-height: var(--leading-relaxed);
          max-width: 240px;
          transition: color 300ms ease;
        }

        .pillar-card:hover .pillar-description {
          color: var(--foreground);
          opacity: 0.85;
        }

        .status-badge-container {
          text-align: center;
          margin-top: var(--spacing-2xl);
        }

        .morgenrot-badge {
          background: linear-gradient(
            135deg,
            var(--muted) 0%,
            var(--card) 100%
          );
          border: 1px solid var(--border);
          opacity: 0.7;
          box-shadow: 
            0 2px 8px oklch(0 0 0 / 0.03),
            inset 0 1px 0 oklch(1 0 0 / 0.1);
        }

        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-2xl);
          }

          .pillar-icon-wrapper {
            width: 180px;
            height: 180px;
          }

          .pillar-icon {
            font-size: 4rem;
          }
        }

        @media (max-width: 768px) {
          .what-is-definition {
            font-size: var(--text-xl);
            padding: var(--spacing-xl);
          }

          .pillars-title {
            font-size: var(--text-2xl);
          }

          .pillars-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-2xl);
          }

          .pillar-icon-wrapper {
            width: 160px;
            height: 160px;
          }

          .pillar-icon {
            font-size: 3.5rem;
          }

          .pillar-title {
            font-size: var(--text-lg);
          }

          .pillar-description {
            font-size: var(--text-sm);
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
