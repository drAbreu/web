"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomeClient() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b16",
        color: "#f0ece4",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 18% 22%, rgba(255,255,255,0.35) 0%, transparent 100%),
              radial-gradient(1px 1px at 73% 10%, rgba(255,255,255,0.25) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 42% 40%, rgba(200,220,255,0.20) 0%, transparent 100%),
              radial-gradient(1px 1px at 88% 55%, rgba(255,255,255,0.20) 0%, transparent 100%),
              radial-gradient(1px 1px at 28% 70%, rgba(255,255,255,0.15) 0%, transparent 100%),
              radial-gradient(1px 1px at 62% 80%, rgba(200,255,220,0.15) 0%, transparent 100%),
              radial-gradient(1px 1px at 94% 30%, rgba(255,255,255,0.20) 0%, transparent 100%),
              radial-gradient(1px 1px at 7% 88%, rgba(255,255,255,0.15) 0%, transparent 100%)
            `,
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />
        {/* Warm glow on morgenrot side, cold on permafrost side */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30,20,10,0.0) 0%, rgba(8,11,22,0.5) 100%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", width: "100%" }}>
          {/* Author name */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240,236,228,0.45)",
              marginBottom: "1.5rem",
            }}
          >
            Jorge Abreu-Vicente, PhD
          </p>

          {/* Tagline */}
          <h1
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              color: "#f0ece4",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            I write about the mind
            <br />
            and the cosmos.
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
              color: "rgba(240,236,228,0.55)",
              lineHeight: 1.7,
              maxWidth: "540px",
              margin: "0 auto 3.5rem",
            }}
          >
            Astrophysicist by training. Writer by compulsion.
            Two very different projects — one about recovering from anxiety,
            one about the day we discover we are not alone.
          </p>

          {/* Project cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
              width: "100%",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            <ProjectCard
              href="/morgenrot"
              accent="#c47b4a"
              glow="rgba(196,123,74,0.12)"
              eyebrow="Memoir · Mental Health"
              title="Morgenrot"
              description="A book about panic disorder, recovery, and the meaning of dawn. Written in the open, chapter by chapter."
              cta="Read the story"
              ctaColor="#c47b4a"
            />
            <ProjectCard
              href="/permafrost"
              accent="#5ba4f5"
              glow="rgba(91,164,245,0.12)"
              eyebrow="Science Fiction · In Progress"
              title="Permafrost"
              description="3I/ATLAS enters the solar system. What follows is not what the scientists expected — or what the world needed."
              cta="Enter the story"
              ctaColor="#5ba4f5"
            />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.375rem",
            color: "rgba(240,236,228,0.25)",
            fontSize: "0.7rem",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>Scroll</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2v12M3 9l5 7 5-7" />
          </svg>
        </div>
      </section>

      {/* ── About strip ─────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "5rem 1.5rem",
          maxWidth: "680px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "clamp(1.1rem, 3vw, 1.375rem)",
            lineHeight: 1.8,
            color: "rgba(240,236,228,0.70)",
            marginBottom: "2rem",
          }}
        >
          "I spent years staring at distant galaxies for a living.
          Then panic disorder showed me that the most terrifying frontier
          was always closer than that."
        </p>
        <Link
          href="/about"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "rgba(240,236,228,0.45)",
            textDecoration: "none",
            letterSpacing: "0.06em",
            borderBottom: "1px solid rgba(240,236,228,0.2)",
            paddingBottom: "2px",
            transition: "color 0.15s ease, border-color 0.15s ease",
          }}
        >
          More about Jorge →
        </Link>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
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
        <p>© {new Date().getFullYear()} Jorge Abreu-Vicente, PhD</p>
      </footer>
    </div>
  );
}

interface ProjectCardProps {
  href: string;
  accent: string;
  glow: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  ctaColor: string;
}

function ProjectCard({
  href,
  accent,
  glow,
  eyebrow,
  title,
  description,
  cta,
  ctaColor,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "1.75rem",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: "0.75rem",
        textDecoration: "none",
        color: "inherit",
        textAlign: "left",
        transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = accent + "55";
        el.style.background = "rgba(255,255,255,0.05)";
        el.style.boxShadow = `0 0 32px ${glow}, 0 4px 20px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(255,255,255,0.08)";
        el.style.background = "rgba(255,255,255,0.03)";
        el.style.boxShadow = "none";
      }}
    >
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: accent,
          marginBottom: "0.625rem",
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#f0ece4",
          marginBottom: "0.75rem",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
          color: "rgba(240,236,228,0.50)",
          lineHeight: 1.65,
          marginBottom: "1.5rem",
        }}
      >
        {description}
      </p>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: ctaColor,
          letterSpacing: "0.02em",
        }}
      >
        {cta} →
      </span>
    </Link>
  );
}
