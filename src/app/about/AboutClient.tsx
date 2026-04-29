"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const bio = [
  "I'm an astrophysicist who spent years mapping the birthplaces of stars — cold molecular clouds, filamentary structures, the quiet violence of star formation. Then I moved into bioinformatics and AI, building tools to help scientists read the literature at a scale no human could manage alone.",
  "Writing found me sideways. A panic disorder that I didn't see coming forced me to slow down, to look inward with the same rigour I'd applied to the sky. Morgenrot — 'morning red' in German, the glow before dawn — is the book that came out of that. It is a memoir about anxiety, about the science of recovery, and about what it means to come back to yourself.",
  "Permafrost is something different: a science fiction story that grew out of watching the world react to 3I/ATLAS. The same object, the same orbital data — and yet people saw in it whatever they most feared or most wanted. That gap between evidence and belief is the territory I'm trying to explore.",
  "Both projects are published in public as they're written. I believe in the Andy Weir model: write the thing, share it free, let readers shape it. If you've found your way here, I'm glad.",
];

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abreujorge-dataresearch/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/drAbreu",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "ORCID",
    url: "https://orcid.org/0000-0002-0211-6416",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416z" />
      </svg>
    ),
  },
];

const s = {
  page: {
    minHeight: "100vh",
    background: "#080b16",
    color: "#f0ece4",
    fontFamily: "'DM Sans', sans-serif",
  } as React.CSSProperties,
  main: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "7rem 1.5rem 5rem",
  } as React.CSSProperties,
  header: {
    marginBottom: "3.5rem",
  } as React.CSSProperties,
  eyebrow: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(240,236,228,0.40)",
    marginBottom: "0.75rem",
  } as React.CSSProperties,
  name: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 600,
    color: "#f0ece4",
    marginBottom: "1rem",
    lineHeight: 1.15,
  } as React.CSSProperties,
  tagline: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "1.125rem",
    color: "rgba(240,236,228,0.55)",
    lineHeight: 1.6,
  } as React.CSSProperties,
};

export default function AboutClient() {
  const [imageError, setImageError] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xkgdbezy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "0.5rem",
    color: "#f0ece4",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9375rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease",
  };

  return (
    <div style={s.page}>
      <Navbar />

      <main style={s.main}>
        {/* ── Header ── */}
        <div style={s.header}>
          <p style={s.eyebrow}>About</p>
          <h1 style={s.name}>Jorge Abreu-Vicente</h1>
          <p style={s.tagline}>
            Astrophysicist · AI Researcher · Writer
          </p>
        </div>

        {/* ── Profile + Bio grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "3rem",
            alignItems: "start",
            marginBottom: "4rem",
          }}
          className="about-grid"
        >
          {/* Photo + links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.12)",
                background: "#12182b",
                flexShrink: 0,
              }}
            >
              <Image
                src={imageError ? "/datastar-logo.png" : "/author-photo.png"}
                alt="Jorge Abreu-Vicente"
                width={120}
                height={120}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                unoptimized
                onError={() => setImageError(true)}
              />
            </div>

            {/* Social links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "0.375rem",
                    color: "rgba(240,236,228,0.60)",
                    fontSize: "0.8rem",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.15s ease, background 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f0ece4";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(240,236,228,0.60)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Bio text */}
          <div>
            {bio.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(240,236,228,0.75)",
                  marginBottom: "1.25rem",
                }}
              >
                {para}
              </p>
            ))}

            {/* Projects shortcut */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              <Link
                href="/morgenrot"
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "rgba(196,123,74,0.12)",
                  border: "1px solid rgba(196,123,74,0.30)",
                  borderRadius: "0.375rem",
                  color: "#c47b4a",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Morgenrot →
              </Link>
              <Link
                href="/permafrost"
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "rgba(91,164,245,0.10)",
                  border: "1px solid rgba(91,164,245,0.28)",
                  borderRadius: "0.375rem",
                  color: "#5ba4f5",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Permafrost →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Contact form ── */}
        <section
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "3rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#f0ece4",
              marginBottom: "0.5rem",
            }}
          >
            Get in touch
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9375rem",
              color: "rgba(240,236,228,0.50)",
              marginBottom: "2rem",
            }}
          >
            Reader, fellow writer, researcher — always happy to hear from you.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "560px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(240,236,228,0.50)", display: "block", marginBottom: "0.375rem" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(240,236,228,0.50)", display: "block", marginBottom: "0.375rem" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(240,236,228,0.50)", display: "block", marginBottom: "0.375rem" }}>
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === "sending"}
              style={{
                alignSelf: "flex-start",
                padding: "0.75rem 2rem",
                background: "rgba(240,236,228,0.90)",
                color: "#080b16",
                border: "none",
                borderRadius: "0.5rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: formStatus === "sending" ? "wait" : "pointer",
                opacity: formStatus === "sending" ? 0.7 : 1,
                transition: "opacity 0.15s ease",
              }}
            >
              {formStatus === "sending" ? "Sending…" : "Send message"}
            </button>

            {formStatus === "success" && (
              <p style={{ color: "#6ee7b7", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                Message sent — I'll be in touch.
              </p>
            )}
            {formStatus === "error" && (
              <p style={{ color: "#fca5a5", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                Something went wrong. Try emailing me directly at jorge.abreu@embo.org
              </p>
            )}
          </form>
        </section>
      </main>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "2rem 1.5rem",
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          color: "rgba(240,236,228,0.25)",
        }}
      >
        <p>© {new Date().getFullYear()} Jorge Abreu-Vicente</p>
      </footer>

      <style jsx>{`
        @media (max-width: 600px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
