"use client";

interface MorgenrotAuthorProps {
  t: any;
}

export default function MorgenrotAuthor({ t }: MorgenrotAuthorProps) {
  return (
    <section className="morgenrot-section author-section">
      <div className="author-container">
        <h2 className="author-title">{t.author.title}</h2>

        <div className="author-content">
          <p className="author-description">{t.author.description}</p>

          <div className="author-details">
            <div className="author-location">
              <svg
                className="location-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="location-text">{t.author.location}</span>
            </div>

            <div className="author-inquiries">
              <p className="inquiries-label">{t.author.inquiries}</p>
              <a href="mailto:kurtcovive@gmail.com" className="inquiries-email">
                <svg
                  className="email-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                kurtcovive@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .author-section {
          background: linear-gradient(
            135deg,
            oklch(0.5234 0.1347 144.1672 / 0.05) 0%,
            oklch(0.8952 0.0504 146.0366 / 0.08) 50%,
            oklch(0.5234 0.1347 144.1672 / 0.05) 100%
          );
          position: relative;
        }

        .author-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 0%,
            oklch(0.5234 0.1347 144.1672 / 0.08) 0%,
            transparent 50%
          );
          pointer-events: none;
        }

        .author-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .author-title {
          font-family: var(--font-heading);
          font-size: var(--text-4xl);
          font-weight: 600;
          margin-bottom: var(--spacing-2xl);
          color: var(--primary);
        }

        .author-content {
          background-color: var(--card);
          border: 2px solid oklch(0.5234 0.1347 144.1672 / 0.3);
          border-radius: var(--radius-2xl);
          padding: var(--spacing-3xl);
          box-shadow: 
            0 8px 24px oklch(0.5234 0.1347 144.1672 / 0.08),
            var(--shadow-lg);
          position: relative;
        }

        .author-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--primary),
            transparent
          );
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        .author-description {
          font-size: var(--text-xl);
          line-height: var(--leading-relaxed);
          color: var(--foreground);
          margin-bottom: var(--spacing-3xl);
        }

        .author-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2xl);
          padding-top: var(--spacing-2xl);
          border-top: 2px solid oklch(0.5234 0.1347 144.1672 / 0.2);
        }

        .author-location {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          color: var(--muted-foreground);
        }

        .location-icon {
          width: 24px;
          height: 24px;
          color: var(--primary);
        }

        .location-text {
          font-family: var(--font-mono);
          font-size: var(--text-base);
        }

        .author-inquiries {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .inquiries-label {
          font-size: var(--text-base);
          color: var(--muted-foreground);
          margin: 0;
        }

        .inquiries-email {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          font-size: var(--text-xl);
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .inquiries-email:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        .email-icon {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .author-title {
            font-size: var(--text-3xl);
          }

          .author-content {
            padding: var(--spacing-2xl);
          }

          .author-description {
            font-size: var(--text-lg);
          }

          .author-details {
            gap: var(--spacing-xl);
          }

          .inquiries-email {
            font-size: var(--text-lg);
          }
        }
      `}</style>
    </section>
  );
}
