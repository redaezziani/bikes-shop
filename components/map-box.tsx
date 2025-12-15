'use client';

import React, { useEffect, useRef, useState } from 'react';
import type mapboxgl from 'mapbox-gl';

interface MapboxMapProps {
  zoom?: number;
  center?: [number, number];
}

// Lazy-load Mapbox GL + CSS
const loadMapboxGL = async () => {
  if (typeof window === 'undefined') return null;

  if (!document.querySelector('link[href*="mapbox-gl.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css';
    document.head.appendChild(link);
  }

  const mapboxgl = await import('mapbox-gl');
  return mapboxgl.default;
};

export default function MapboxMap({
  zoom = 12,
  center = [24.84, 55.3],
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxgl, setMapboxgl] = useState<
    typeof import('mapbox-gl').default | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load Mapbox GL
  useEffect(() => {
    let mounted = true;

    loadMapboxGL().then((mapbox) => {
      if (!mounted || !mapbox) return;

      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      if (!token) {
        console.warn('NEXT_PUBLIC_MAPBOX_TOKEN is missing');
        setIsLoading(false);
        return;
      }

      mapbox.accessToken = token;
      setMapboxgl(mapbox);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || !mapboxgl || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/alongcargobikes/cmj5v57hx008e01se4b5h8h6k',
      center: [center[1], center[0]],
      zoom,
      cooperativeGestures: true,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: true }),
      'bottom-right',
    );

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showAccuracyCircle: true,
      }),
      'bottom-right',
    );

    map.on('load', () => {
      setIsLoading(false);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapboxgl, center, zoom]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full h-96 md:h-170 rounded overflow-hidden bg-zinc-50"
      />

      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75">
          <div className="text-center">
            <div className="w-4 h-4 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin mb-2" />
            <div className="text-sm font-medium text-gray-700">
              Loading map…
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
