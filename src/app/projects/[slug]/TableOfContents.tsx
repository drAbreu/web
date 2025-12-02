"use client";

import { useState, useEffect } from "react";

interface Heading {
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  lang: string;
}

export default function TableOfContents({ headings, lang }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="bg-brand-navy/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
        {lang === 'es' ? 'Contenido' : 'Contents'}
      </h3>
      <ul className="space-y-2">
        {headings.map(({ text, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`text-sm block py-1 px-2 rounded transition-colors ${
                activeId === id
                  ? "text-brand-orange bg-brand-orange/10 font-medium"
                  : "text-gray-400 hover:text-brand-gold hover:bg-white/5"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
