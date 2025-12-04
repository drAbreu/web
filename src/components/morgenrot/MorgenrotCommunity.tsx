"use client";

import { useState } from "react";

interface MorgenrotCommunityProps {
  t: any;
}

export default function MorgenrotCommunity({ t }: MorgenrotCommunityProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Implement actual newsletter subscription
    // For now, simulate API call
    setTimeout(() => {
      if (email && email.includes("@")) {
        setStatus("success");
        setMessage(t.community.success);
        setEmail("");

        // Reset after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(t.community.error);

        // Reset after 3 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 3000);
      }
    }, 1000);
  };

  return (
    <section id="community" className="morgenrot-section community-section">
      <div className="community-container">
        <h2 className="community-title">{t.community.title}</h2>
        <p className="community-description">{t.community.description}</p>

        <form onSubmit={handleSubmit} className="community-form">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.community.emailPlaceholder}
              className="morgenrot-input"
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              className="morgenrot-btn morgenrot-btn-primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? t.community.subscribing : t.community.subscribe}
            </button>
          </div>

          {message && (
            <div className={`form-message ${status}`}>
              {message}
            </div>
          )}
        </form>

        <p className="community-awaits">{t.community.awaits}</p>
      </div>

      <style jsx>{`
        .community-section {
          background: linear-gradient(
            135deg,
            var(--secondary-light) 0%,
            var(--accent-light) 100%
          );
          position: relative;
          overflow: hidden;
        }

        .community-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(
            circle,
            var(--primary) / 0.1 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .community-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .community-title {
          font-family: var(--font-heading);
          font-size: var(--text-5xl);
          font-weight: 600;
          margin-bottom: var(--spacing-xl);
          color: var(--foreground);
        }

        .community-description {
          font-size: var(--text-xl);
          color: var(--muted-foreground);
          margin-bottom: var(--spacing-3xl);
          line-height: var(--leading-relaxed);
        }

        .community-form {
          margin-bottom: var(--spacing-2xl);
        }

        .form-group {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
        }

        .form-group input {
          flex: 1;
          font-size: var(--text-lg);
          padding: var(--spacing-lg);
        }

        .form-group button {
          flex-shrink: 0;
          white-space: nowrap;
        }

        .form-message {
          padding: var(--spacing-lg);
          border-radius: var(--radius-lg);
          font-size: var(--text-base);
          font-weight: 500;
          animation: fadeUp 300ms ease-out;
        }

        .form-message.success {
          background-color: var(--success) / 0.2;
          color: var(--success-foreground);
          border: 2px solid var(--success);
        }

        .form-message.error {
          background-color: var(--destructive) / 0.2;
          color: var(--destructive-foreground);
          border: 2px solid var(--destructive);
          animation: shake 400ms;
        }

        .community-awaits {
          font-family: var(--font-heading);
          font-size: var(--text-3xl);
          color: var(--primary);
          font-weight: 600;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .form-group {
            flex-direction: column;
          }

          .form-group button {
            width: 100%;
          }

          .community-title {
            font-size: var(--text-4xl);
          }

          .community-description {
            font-size: var(--text-lg);
          }

          .community-awaits {
            font-size: var(--text-2xl);
          }
        }
      `}</style>
    </section>
  );
}
