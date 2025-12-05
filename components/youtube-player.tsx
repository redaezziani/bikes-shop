'use client';

import { useRef, useEffect } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';

interface Props {
  url: string; // full youtube URL
}

export default function YouTubeAutoPlayer({ url }: Props) {
  const playerRef = useRef<YouTubeEvent['target'] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract video ID from URL
  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&]+)/,
    );
    return match ? match[1] : '';
  };

  const videoId = getVideoId(url);

  // Intersection observer ⇒ autoplay when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const player = playerRef.current;

        if (!player) return;

        if (entry.isIntersecting) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // YouTube ready
  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    event.target.mute(); // muted by default
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 bg-zinc-100 rounded overflow-hidden"
    >
      <YouTube
        videoId={videoId}
        onReady={onReady}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 0,
            controls: 0,
            mute: 1,
            loop: 1,
            playlist: videoId, // required for loop!
            rel: 0,
            modestbranding: 1,
          },
        }}
        className="absolute inset-0"
      />

      {/* <button
        onClick={togglePlay}
        className="absolute top-3 right-3 size-10 flex items-center justify-center bg-white/20
                 backdrop-blur-md rounded-lg border border-white/30"
      >
        {isPlaying ? (
          <IconPause className="text-white" size={22} />
        ) : (
          <Play className="text-white" size={22} />
        )}
      </button> */}
    </div>
  );
}
