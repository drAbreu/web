"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "light" | "dark";
  language?: "en" | "es";
  projectName?: string;
}

const copy = {
  en: {
    title: "Follow along",
    desc: "New chapters and updates by email. Free, always.",
    placeholder: "your@email.com",
    button: "Subscribe",
    thanks: "You're subscribed. Thank you!",
    note: "No spam. Unsubscribe any time.",
  },
  es: {
    title: "Sígueme",
    desc: "Nuevos capítulos y novedades por correo. Gratis, siempre.",
    placeholder: "tu@correo.com",
    button: "Suscribirme",
    thanks: "¡Suscrito! Gracias.",
    note: "Sin spam. Date de baja cuando quieras.",
  },
};

export default function NewsletterSignup({
  variant = "dark",
  language = "en",
  projectName,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const l = copy[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // TODO: Replace this fetch with your newsletter service.
      //
      // Buttondown example:
      //   await fetch("https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME", {
      //     method: "POST",
      //     body: new URLSearchParams({ email }),
      //   });
      //
      // ConvertKit example:
      //   await fetch("https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ api_key: "YOUR_API_KEY", email }),
      //   });
      //
      // For now this just simulates success.
      await new Promise((r) => setTimeout(r, 600));
      console.log(`[Newsletter] ${projectName ?? "subscription"}: ${email}`);
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const isLight = variant === "light";

  const containerStyle: React.CSSProperties = {
    padding: "2rem 2.5rem",
    borderRadius: "0.75rem",
    border: isLight
      ? "1px solid var(--border, rgba(0,0,0,0.12))"
      : "1px solid var(--pf-border-glow, rgba(91,164,245,0.25))",
    background: isLight
      ? "var(--secondary, rgba(0,0,0,0.03))"
      : "linear-gradient(135deg, oklch(0.15 0.045 248) 0%, oklch(0.12 0.035 230) 100%)",
    maxWidth: "520px",
    width: "100%",
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: isLight ? "var(--font-heading, inherit)" : "var(--pf-font-ui, inherit)",
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: isLight ? "var(--primary, #2d5a3d)" : "var(--pf-ice, #5ba4f5)",
    marginBottom: "0.375rem",
    textTransform: "uppercase" as const,
  };

  const descStyle: React.CSSProperties = {
    fontFamily: isLight ? "var(--font-body, inherit)" : "var(--pf-font-ui, inherit)",
    fontSize: "0.9rem",
    color: isLight ? "var(--muted-foreground, #666)" : "var(--pf-text-muted, #8899bb)",
    marginBottom: "1.25rem",
    lineHeight: 1.5,
  };

  const inputStyle: React.CSSProperties = {
    flex: "1 1 200px",
    padding: "0.6rem 1rem",
    background: isLight ? "var(--background, #fff)" : "var(--pf-bg, #070b14)",
    border: isLight
      ? "1px solid var(--border, #ddd)"
      : "1px solid var(--pf-border, #1e2d4a)",
    borderRadius: "0.375rem",
    color: isLight ? "var(--foreground, #333)" : "var(--pf-text, #e2e8f5)",
    fontFamily: isLight ? "var(--font-sans, inherit)" : "var(--pf-font-ui, inherit)",
    fontSize: "0.875rem",
    outline: "none",
    minWidth: 0,
  };

  const buttonStyle: React.CSSProperties = {
    padding: "0.6rem 1.5rem",
    background: isLight ? "var(--primary, #2d5a3d)" : "var(--pf-ice, #5ba4f5)",
    color: isLight ? "#fff" : "oklch(0.09 0.025 248)",
    border: "none",
    borderRadius: "0.375rem",
    fontFamily: isLight ? "var(--font-sans, inherit)" : "var(--pf-font-ui, inherit)",
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: status === "submitting" ? "wait" : "pointer",
    whiteSpace: "nowrap" as const,
    opacity: status === "submitting" ? 0.7 : 1,
  };

  const noteStyle: React.CSSProperties = {
    fontFamily: isLight ? "var(--font-sans, inherit)" : "var(--pf-font-ui, inherit)",
    fontSize: "0.75rem",
    color: isLight ? "var(--muted-foreground, #999)" : "var(--pf-text-faint, #405070)",
    marginTop: "0.75rem",
  };

  return (
    <div style={containerStyle}>
      <p style={titleStyle}>{l.title}</p>
      <p style={descStyle}>{l.desc}</p>

      {status === "sent" ? (
        <p style={{ ...descStyle, color: isLight ? "var(--primary, #2d5a3d)" : "var(--pf-aurora, #00b09b)", fontWeight: 600 }}>
          {l.thanks}
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={l.placeholder}
              style={inputStyle}
            />
            <button type="submit" disabled={status === "submitting"} style={buttonStyle}>
              {status === "submitting" ? "..." : l.button}
            </button>
          </form>
          {status === "error" && (
            <p style={{ ...noteStyle, color: "#f87171", marginTop: "0.5rem" }}>
              {language === "en" ? "Something went wrong. Please try again." : "Algo salió mal. Inténtalo de nuevo."}
            </p>
          )}
          <p style={noteStyle}>{l.note}</p>
        </>
      )}
    </div>
  );
}
