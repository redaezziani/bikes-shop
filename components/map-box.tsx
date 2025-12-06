'use client';

import React, { useEffect, useRef, useState } from 'react';
import type mapboxgl from 'mapbox-gl';

type RouteStats = {
  distance: number; // km
  elevation: number; // meters
  difficulty: 'Easy' | 'Moderate' | 'Hard';
};

interface MapboxMapProps {
  gpxUrl?: string;
  gpxData?: string;
  height?: string;
  zoom?: number;
  center?: [number, number];
  onRouteDataParsed?: (data: RouteStats) => void;
  mapStyle?: string;
}

// Lazy load Mapbox GL JS and CSS only when needed
const loadMapboxGL = async () => {
  if (typeof window === 'undefined') return null;

  // Load CSS dynamically
  if (!document.querySelector('link[href*="mapbox-gl.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css';
    document.head.appendChild(link);
  }

  // Dynamic import of mapbox-gl
  const mapboxgl = await import('mapbox-gl');
  return mapboxgl.default;
};

export default function MapboxMap({
  gpxUrl,
  gpxData,
  zoom = 12,
  center = [51.505, -0.09],
  onRouteDataParsed,
  mapStyle = 'mapbox://styles/mapbox/light-v11',
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapboxgl, setMapboxgl] = useState<
    typeof import('mapbox-gl').default | null
  >(null);

  // Utility: simple haversine distance (km)
  const haversine = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // km
    const toRad = (v: number) => (v * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Parse GPX -> GeoJSON LineString + waypoints
  const parseGPXToGeoJSON = (gpxXmlString: string) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(gpxXmlString, 'application/xml');

    const trkpts = Array.from(xml.querySelectorAll('trkpt'));
    const wpts = Array.from(xml.querySelectorAll('wpt'));

    const coordinates: [number, number][] = [];
    const elevations: number[] = [];

    trkpts.forEach((pt) => {
      const lat = parseFloat(pt.getAttribute('lat') || '0');
      const lon = parseFloat(pt.getAttribute('lon') || '0');
      const ele = parseFloat(pt.querySelector('ele')?.textContent || '0');
      coordinates.push([lon, lat]);
      elevations.push(ele);
    });

    const waypoints = wpts.map((wp) => {
      const lat = parseFloat(wp.getAttribute('lat') || '0');
      const lon = parseFloat(wp.getAttribute('lon') || '0');
      const name = wp.querySelector('name')?.textContent || '';
      return {
        type: 'Feature',
        properties: { name },
        geometry: {
          type: 'Point',
          coordinates: [lon, lat],
        },
      } as GeoJSON.Feature<GeoJSON.Point>;
    });

    const lineFeature: GeoJSON.Feature<GeoJSON.LineString> = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    };

    // compute simple stats
    let totalDistance = 0;
    for (let i = 1; i < coordinates.length; i++) {
      const [lon1, lat1] = coordinates[i - 1];
      const [lon2, lat2] = coordinates[i];
      totalDistance += haversine(lat1, lon1, lat2, lon2);
    }

    const elevationGain =
      elevations.length > 0
        ? Math.max(...elevations) - Math.min(...elevations)
        : 0;

    let difficulty: RouteStats['difficulty'] = 'Easy';
    if (totalDistance > 30 || elevationGain > 500) difficulty = 'Moderate';
    if (totalDistance > 50 || elevationGain > 1000) difficulty = 'Hard';

    const stats: RouteStats = {
      distance: Math.round(totalDistance * 10) / 10,
      elevation: Math.round(elevationGain),
      difficulty,
    };

    return {
      lineFeature,
      waypoints,
      stats,
    };
  };

  // Load Mapbox GL library
  useEffect(() => {
    let mounted = true;

    loadMapboxGL().then((mapbox) => {
      if (!mounted || !mapbox) return;

      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
      if (!token) {
        console.warn('NEXT_PUBLIC_MAPBOX_TOKEN is not set.');
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

  // Initialize map once Mapbox GL is loaded
  useEffect(() => {
    if (!containerRef.current || !mapboxgl) return;
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: [center[1], center[0]],
      zoom,
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

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapboxgl, center, zoom, mapStyle]);

  // Load GPX when provided
  useEffect(() => {
    if (!mapboxgl) return;

    const loadAndRenderGPX = async (gpxXml: string) => {
      if (!mapRef.current) return;

      const { lineFeature, waypoints, stats } = parseGPXToGeoJSON(gpxXml);

      if (mapRef.current.getSource('route')) {
        try {
          if (mapRef.current.getLayer('route-line'))
            mapRef.current.removeLayer('route-line');
          if (mapRef.current.getLayer('route-line-glow'))
            mapRef.current.removeLayer('route-line-glow');
          (mapRef.current.getSource('route') as mapboxgl.GeoJSONSource).setData(
            { type: 'FeatureCollection', features: [lineFeature] },
          );
        } catch (err) {
          // Continue to recreate sources
        }
      } else {
        mapRef.current.addSource('route', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [lineFeature] },
        });

        mapRef.current.addLayer({
          id: 'route-line-glow',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#32870f',
            'line-width': 10,
            'line-opacity': 0.12,
          },
        });

        mapRef.current.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#32870f',
            'line-width': 4,
            'line-opacity': 0.95,
          },
        });
      }

      const coords = lineFeature.geometry.coordinates as [number, number][];
      if (coords.length > 0) {
        const start = coords[0];
        const end = coords[coords.length - 1];

        const createMarkerEl = (color: string, size = 14) => {
          const el = document.createElement('div');
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.borderRadius = '50%';
          el.style.background = color;
          el.style.border = '3px solid white';
          el.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
          return el;
        };

        if ((mapRef.current as any)._startMarker) {
          (mapRef.current as any)._startMarker.remove();
          (mapRef.current as any)._endMarker.remove();
        }

        const startMarker = new mapboxgl.Marker({
          element: createMarkerEl('#10B981', 14),
        })
          .setLngLat(start as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 12 }).setHTML(
              `<strong>Start</strong>`,
            ),
          )
          .addTo(mapRef.current);

        const endMarker = new mapboxgl.Marker({
          element: createMarkerEl('#374151', 14),
        })
          .setLngLat(end as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 12 }).setHTML(
              `<strong>Finish</strong>`,
            ),
          )
          .addTo(mapRef.current);

        (mapRef.current as any)._startMarker = startMarker;
        (mapRef.current as any)._endMarker = endMarker;

        const bounds = coords.reduce(
          (b, c) => b.extend(c as [number, number]),
          new mapboxgl.LngLatBounds(
            coords[0] as [number, number],
            coords[0] as [number, number],
          ),
        );
        mapRef.current.fitBounds(bounds, { padding: 60, maxZoom: 16 });
      }

      if (mapRef.current.getSource('wpts')) {
        (mapRef.current.getSource('wpts') as mapboxgl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: waypoints,
        });
      } else if (waypoints.length > 0) {
        mapRef.current.addSource('wpts', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: waypoints },
        });
        mapRef.current.addLayer({
          id: 'wpt-symbol',
          type: 'symbol',
          source: 'wpts',
          layout: {
            'icon-image': 'marker-15',
            'icon-allow-overlap': true,
            'text-field': ['get', 'name'],
            'text-offset': [0, 1.2],
            'text-size': 12,
          },
          paint: {
            'text-color': '#111',
          },
        });
      }

      setIsLoading(false);
      onRouteDataParsed?.(stats);
    };

    let cancelled = false;
    const fetchAndRender = async () => {
      setIsLoading(true);
      try {
        if (gpxData) {
          await loadAndRenderGPX(gpxData);
        } else if (gpxUrl) {
          const res = await fetch(gpxUrl);
          const text = await res.text();
          if (!cancelled) await loadAndRenderGPX(text);
        }
      } catch (err) {
        console.error('Error loading GPX', err);
        setIsLoading(false);
      }
    };

    if (gpxData || gpxUrl) fetchAndRender();

    return () => {
      cancelled = true;
    };
  }, [gpxData, gpxUrl, mapboxgl, onRouteDataParsed]);

  return (
    <div className="relative">
      <div
        className="w-full h-96 md:h-170 rounded overflow-hidden bg-zinc-50"
        ref={containerRef}
      />

      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75">
          <div className="text-center">
            <div className="w-4 h-4 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin mb-2" />
            <div className="text-sm font-medium text-gray-700">
              Loading route...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
