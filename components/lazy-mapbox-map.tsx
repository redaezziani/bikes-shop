'use client';

import dynamic from 'next/dynamic';

const MapboxMap = dynamic(() => import('./map-box'), {
  loading: () => (
    <div className="w-full h-96 md:h-170 bg-zinc-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-zinc-500 text-sm">Loading map...</div>
    </div>
  ),
  ssr: false,
});

export default function LazyMapboxMap() {
  return <MapboxMap />;
}
