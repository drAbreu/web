"use client";

import { useEffect, useRef, ReactNode } from "react";

interface VideoBackgroundProps {
  children: ReactNode;
  videoSrc?: string;
}

export default function VideoBackground({
  children,
  videoSrc = "/_imgs/calm_hero/forest_with_light.mp4"
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <div className="video-background-container">
      {/* Video Layer */}
      <video
        ref={videoRef}
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="video-overlay" />

      {/* Content */}
      <div className="video-content">
        {children}
      </div>

      <style jsx>{`
        .video-background-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-background {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
          z-index: 0;
          filter: brightness(0.65) saturate(1.1);
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            oklch(0.3 0.05 200 / 0.3) 0%,
            oklch(0.4 0.08 180 / 0.4) 50%,
            oklch(0.3 0.05 160 / 0.5) 100%
          );
          z-index: 1;
          backdrop-filter: blur(0.5px);
        }

        .video-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .video-background {
            filter: brightness(0.5) saturate(1.0);
          }

          .video-overlay {
            background: linear-gradient(
              180deg,
              oklch(0.3 0.05 200 / 0.5) 0%,
              oklch(0.4 0.08 180 / 0.6) 50%,
              oklch(0.3 0.05 160 / 0.7) 100%
            );
          }
        }

        /* Accessibility - Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .video-background {
            animation: none;
            filter: brightness(0.7) saturate(1.0);
          }
        }
      `}</style>
    </div>
  );
}
