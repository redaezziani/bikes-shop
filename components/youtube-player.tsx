'use client';

import React, { useEffect, useRef, useState } from 'react';

interface YouTubePlayerProps {
  url: string;
  className?: string;
}

// ----------------------------
// Universal YouTube ID Extractor
// ----------------------------
const extractYouTubeID = (url: string): string | null => {
  try {
    const u = new URL(url);

    if (u.hostname === 'youtu.be') {
      return u.pathname.substring(1);
    }
    if (u.pathname.startsWith('/shorts/')) {
      return u.pathname.replace('/shorts/', '');
    }
    if (u.pathname.startsWith('/embed/')) {
      return u.pathname.replace('/embed/', '');
    }
    if (u.pathname.startsWith('/live/')) {
      return u.pathname.replace('/live/', '');
    }
    if (u.searchParams.get('v')) {
      return u.searchParams.get('v')!;
    }

    return null;
  } catch {
    return null;
  }
};

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  url,
  className,
}) => {
  const id = extractYouTubeID(url);

  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  // ----------------------------
  // Load YouTube API
  // ----------------------------
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    } else {
      setApiReady(true);
    }

    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true);
    };
  }, []);

  // ----------------------------
  // Initialize Player
  // ----------------------------
  useEffect(() => {
    if (!apiReady || !iframeRef.current || !id) return;

    playerRef.current = new window.YT.Player(iframeRef.current, {
      videoId: id,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        loop: 1,
        playlist: id, // REQUIRED for infinite loop
      },
      events: {
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            playerRef.current.playVideo(); // infinite loop fallback
          }

          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        },
      },
    });
  }, [apiReady, id]);

  // ----------------------------
  // Auto Play When Visible
  // Auto Pause When Not Visible
  // ----------------------------
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!playerRef.current) return;

        if (entry.isIntersecting) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      },
      { threshold: 0.5 }, // must be 50% visible
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // ----------------------------
  // Manual Play / Pause Toggle
  // ----------------------------
  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  if (!id) return <div className="text-red-500">Invalid YouTube URL</div>;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-0 pb-[56.25%] ${className}`}
    >
      {/* Video */}
      <div
        ref={iframeRef}
        className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-black"
      />

      {/* Button */}
      <button
        onClick={togglePlay}
        className="absolute bottom-3 left-3 p-2 rounded-full bg-white/90 shadow"
      >
        {isPlaying ? (
          <svg width="24" height="24" fill="black">
            <rect x="5" y="4" width="6" height="16" rx="1" />
            <rect x="13" y="4" width="6" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="black">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </button>
    </div>
  );
};
