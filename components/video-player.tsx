'use client';

import React, { useRef, useEffect, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Intersection Observer to detect when video is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            videoElement.play().catch((err) => {
              console.log('Autoplay prevented:', err);
            });
          } else {
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.5, // Video plays when 50% visible
      },
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article className="relative w-full overflow-hidden">
      {/* Loading overlay */}
      {!isInView && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 animate-pulse" />
      )}

      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        poster="/video-poster.jpg" // Optional: add a poster image
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional: Subtle overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </article>
  );
};

export default VideoPlayer;
