"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: "/morgenrot", label: "Morgenrot" },
    { href: "/permafrost", label: "Permafrost" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "3.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        background: scrolled
          ? "rgba(8, 11, 22, 0.96)"
          : "rgba(8, 11, 22, 0.80)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Author name / logo */}
      <Link
        href="/"
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#f0ece4",
          textDecoration: "none",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        }}
      >
        Jorge Abreu-Vicente
      </Link>

      {/* Desktop nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
        className="navbar-desktop"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              padding: "0.4rem 0.875rem",
              borderRadius: "0.375rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              fontWeight: isActive(href) ? 600 : 400,
              color: isActive(href) ? "#f0ece4" : "rgba(240,236,228,0.55)",
              textDecoration: "none",
              background: isActive(href) ? "rgba(255,255,255,0.07)" : "transparent",
              transition: "color 0.15s ease, background 0.15s ease",
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        className="navbar-mobile-btn"
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          color: "rgba(240,236,228,0.7)",
          cursor: "pointer",
          padding: "0.25rem",
        }}
      >
        {menuOpen ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l12 12M17 5L5 17" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h16M3 11h16M3 16h16" />
          </svg>
        )}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "3.75rem",
            left: 0,
            right: 0,
            background: "rgba(8, 11, 22, 0.98)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "1.25rem 1.5rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
          className="navbar-mobile-menu"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.375rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                fontWeight: isActive(href) ? 600 : 400,
                color: isActive(href) ? "#f0ece4" : "rgba(240,236,228,0.65)",
                textDecoration: "none",
                background: isActive(href) ? "rgba(255,255,255,0.06)" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 600px) {
          .navbar-desktop { display: none !important; }
          .navbar-mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
