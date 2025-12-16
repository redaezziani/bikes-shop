'use client';

import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('./video-player'), {
  loading: () => (
    <div className="w-full h-96 bg-zinc-100 animate-pulse rounded-lg" />
  ),
  ssr: false,
});

export default function LazyVideoPlayer() {
  return <VideoPlayer />;
}
