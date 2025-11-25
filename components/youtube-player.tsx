"use client";

import React, { useEffect, useRef, useState } from "react";

interface YouTubePlayerProps {
  url: string;
  className?: string;
}

const extractYouTubeID = (url: string) => {
  try {
    const u = new URL(url);
    if (u.pathname.startsWith("/shorts/")) {
      return u.pathname.split("/shorts/")[1];
    }
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
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

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ url, className }) => {
  const id = extractYouTubeID(url);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // Load YT API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (iframeRef.current && id) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          videoId: id,
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else {
                setIsPlaying(false);
              }
            },
          },
        });
      }
    };
  }, [id]);

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  if (!id) return <div>Invalid YouTube URL</div>;

  return (
    <div className={`relative w-full h-0 pb-[56.25%] bg-black rounded-xl ${className}`}>
      {/* Iframe container */}
      <div
        ref={iframeRef}
        className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
      />

      {/* Play / Pause Button */}
      <button
        onClick={togglePlay}
        className="
          absolute bottom-3 left-3 p-2 rounded-full bg-white/90 shadow 
          hover:bg-white transition
        "
      >
        {isPlaying ? (
          // Pause Icon
          <svg width="24" height="24" fill="black">
            <rect x="5" y="4" width="6" height="16" rx="1" />
            <rect x="13" y="4" width="6" height="16" rx="1" />
          </svg>
        ) : (
          // Play Icon
          <svg width="24" height="24" fill="black">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </button>
    </div>
  );
};
