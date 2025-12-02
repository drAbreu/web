"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Language } from "@/lib/i18n";

interface AuthorCardProps {
  language: Language;
}

export default function AuthorCard({ language }: AuthorCardProps) {
  const [imageError, setImageError] = useState(false);
  const authorInfo = {
    name: "Jorge Abreu-Vicente, PhD",
    title: language === "en" ? "Astrophysicist & Data Scientist" : "Astrofísico y Científico de Datos",
    bio: language === "en"
      ? "Bridging astrophysics and data science with expertise in machine learning, computational simulations, and biomedical AI. From studying cosmic phenomena to advancing healthcare technology."
      : "Uniendo astrofísica y ciencia de datos con experiencia en machine learning, simulaciones computacionales e IA biomédica. Desde el estudio de fenómenos cósmicos hasta el avance de la tecnología sanitaria.",
    location: "41°53'27.03\"N, 08°52'8.00\"W",
    email: "jorge@datastar.com",
    image: "/author-photo.png" // User should add their photo here
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abreujorge-dataresearch/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/drAbreu",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    },
    {
      name: "Medium",
      url: "https://medium.com/@datastar",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      )
    },
    {
      name: "Goodreads",
      url: "https://www.goodreads.com/user/show/146420427-jorge-abreu-vicente",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.525 15.977V.49h-2.059v2.906h-.064c-.211-.455-.481-.891-.842-1.307-.36-.412-.767-.777-1.232-1.094-.466-.314-.962-.561-1.519-.736C13.256.09 12.669 0 12.038 0c-1.21 0-2.3.225-3.246.67-.947.447-1.743 1.057-2.385 1.83-.642.773-1.133 1.676-1.47 2.711-.336 1.037-.506 2.129-.506 3.283 0 1.199.141 2.326.425 3.382.286 1.057.737 1.976 1.368 2.762.631.78 1.412 1.397 2.375 1.833.961.436 2.119.661 3.471.661 1.248 0 2.33-.315 3.262-.946s1.638-1.473 2.119-2.525h.061v2.284c0 2.044-.421 3.607-1.264 4.705-.84 1.081-2.224 1.638-4.146 1.638-.572 0-1.128-.061-1.669-.172-.54-.11-1.029-.281-1.472-.513-.443-.23-.84-.513-1.191-.838-.351-.324-.639-.689-.859-1.094l-1.658 1.619c.698.82 1.639 1.462 2.825 1.927 1.186.467 2.503.697 3.945.697 1.23 0 2.3-.182 3.232-.535.928-.353 1.713-.865 2.354-1.538.641-.672 1.133-1.48 1.469-2.422.336-.941.507-2.012.507-3.212v-8.493h-.064zm-2.118 3.044c-.267.762-.627 1.42-1.088 1.977-.459.558-.994.992-1.605 1.309-.61.315-1.288.473-2.032.473-.722 0-1.391-.158-2.014-.473s-1.17-.751-1.629-1.309c-.461-.558-.829-1.215-1.095-1.977-.267-.76-.396-1.591-.396-2.493 0-.901.129-1.741.396-2.519.266-.777.634-1.452 1.095-2.025.459-.572.994-1.021 1.629-1.335.623-.313 1.292-.47 2.014-.47.744 0 1.422.157 2.032.47.61.314 1.146.763 1.605 1.335.46.573.821 1.248 1.088 2.025.267.778.401 1.618.401 2.519 0 .902-.134 1.733-.401 2.493z" />
        </svg>
      )
    }
  ];

  return (
    <div className="mt-16 mb-8">
      <div className="bg-gradient-to-br from-brand-navy/50 to-brand-purple/30 backdrop-blur-sm rounded-2xl p-8 border border-brand-coral/30 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Profile Photo */}
          <div className="relative shrink-0">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-brand-coral/50 shadow-lg shadow-brand-coral/20 bg-brand-navy flex items-center justify-center p-2">
              <Image
                src={imageError ? "/datastar-logo.png" : authorInfo.image}
                alt={authorInfo.name}
                width={112}
                height={112}
                className="object-cover rounded-full"
                priority
                unoptimized
                onError={() => setImageError(true)}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-1">{authorInfo.name}</h3>
              <p className="text-brand-coral font-semibold mb-2">{authorInfo.title}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                {authorInfo.bio}
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-mono text-xs">{authorInfo.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-brand-coral/30 text-gray-300 hover:text-white rounded-lg transition-all duration-300 group border border-white/10 hover:border-brand-coral/50"
                  aria-label={social.name}
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                  <span className="text-sm font-medium">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
            {language === "en"
              ? "Interested in collaborating? Let's connect!"
              : "¿Interesado en colaborar? ¡Conectemos!"}
          </p>
        </div>
      </div>
    </div>
  );
}
