"use client";

import Link from "next/link";

export default function MorgenrotFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="morgenrot-footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            MORGENROT © {currentYear} • Jorge Abreu-Vicente
          </p>
          <div className="footer-links">
            <Link href="/" className="footer-link">
              datastar.space
            </Link>
            <a
              href="https://github.com/jabreu610"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a href="mailto:jabreu.vicente@gmail.com" className="footer-link">
              Email
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .morgenrot-footer {
          background-color: var(--foreground);
          color: var(--background);
          padding: var(--spacing-2xl) var(--spacing-lg);
          margin-top: var(--spacing-4xl);
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-lg);
        }

        .footer-text {
          font-size: var(--text-sm);
          color: var(--background) / 0.8;
          margin: 0;
        }

        .footer-links {
          display: flex;
          gap: var(--spacing-xl);
        }

        .footer-link {
          font-size: var(--text-sm);
          color: var(--background) / 0.8;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--background);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </footer>
  );
}
