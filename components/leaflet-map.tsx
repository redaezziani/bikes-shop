'use client';

import { useEffect, useRef, useState } from 'react';
import { IconRadar2 } from '@tabler/icons-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from 'sonner';

interface LeafletMapProps {
  gpxUrl?: string;
  gpxData?: string;
  height?: string;
  zoom?: number;
  center?: [number, number];
  onRouteDataParsed?: (data: RouteStats) => void;
}

interface RouteStats {
  distance: number;
  elevation: number;
  difficulty: string;
}

export default function LeafletMap({
  gpxUrl,
  gpxData,
  height = 'h-96',
  zoom = 13,
  center = [51.505, -0.09],
  onRouteDataParsed,
}: LeafletMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const userMarker = useRef<L.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const gpxLoadedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Simple small circle marker for start/end points
  const createBikeMarker = (isStart = true) => {
    return L.divIcon({
      className: 'custom-bike-marker',
      html: `
        <div style="
          width: 12px;
          height: 12px;
          background: #10B981;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        "></div>
      `,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
  };

  // Red incident marker with arrow label
  const createIncidentMarker = (label: string) => {
    return L.divIcon({
      className: 'custom-incident-marker',
      html: `
        <div style="position: relative;">
          <!-- Label with arrow pointing down -->
          <div style="
            position: absolute;
            bottom: 48px;
            left: 50%;
            transform: translateX(-50%);
            background: #F39C12;
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
          ">
            ${label}
            <!-- Arrow pointing down -->
            <div style="
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid #F39C12;
            "></div>
          </div>
          <!-- Marker circle -->
          <div style="
            width: 40px;
            height: 40px;
            background: #E74C3C;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 4px solid white;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  // Handle location request with continuous tracking
  const handleFindMe = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);

    // Clear any existing watch
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    let isFirstLocation = true;
    let hasTriedLowAccuracy = false;

    const locationSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;

      if (map.current) {
        // Remove previous user marker if exists
        if (userMarker.current) {
          map.current.removeLayer(userMarker.current);
        }

        // Center map on user location (only on first location)
        if (isFirstLocation) {
          map.current.setView([latitude, longitude], 15);
          setIsLocating(false);
          isFirstLocation = false;
        }

        // Add user location marker with pulsing emerald dot
        userMarker.current = L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: 'user-location-marker',
            html: `
                <div style="position: relative; width: 24px; height: 24px;">
                  <!-- Pulsing ring -->
                  <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    background: rgba(16, 185, 129, 0.3);
                    border-radius: 50%;
                    animation: pulse 2s ease-out infinite;
                  "></div>
                  <!-- Inner dot -->
                  <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 18px;
                    height: 18px;
                    background: #10B981;
                    border-radius: 50%;
                    border: 4px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  "></div>
                </div>
                <style>
                  @keyframes pulse {
                    0% {
                      transform: translate(-50%, -50%) scale(0.5);
                      opacity: 1;
                    }
                    100% {
                      transform: translate(-50%, -50%) scale(1.5);
                      opacity: 0;
                    }
                  }
                </style>
              `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        }).addTo(map.current);

        userMarker.current.bindPopup(
          `
            <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 10px; text-align: center;">
              <strong style="color: #10B981; font-size: 15px;">You are here</strong>
              <p style="margin: 6px 0 0 0; color: #666; font-size: 12px;">
                Lat: ${latitude.toFixed(6)}<br/>
                Lng: ${longitude.toFixed(6)}<br/>
                Accuracy: ±${Math.round(accuracy)}m
              </p>
            </div>
          `,
        );
      }
    };

    const locationError = (error: GeolocationPositionError) => {
      setIsLocating(false);

      // Clear watch on error
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }

      // If high accuracy failed with POSITION_UNAVAILABLE, try low accuracy
      if (
        error.code === error.POSITION_UNAVAILABLE &&
        !hasTriedLowAccuracy
      ) {
        hasTriedLowAccuracy = true;
        console.log('Retrying with low accuracy mode...');

        // Try with getCurrentPosition and low accuracy as fallback
        navigator.geolocation.getCurrentPosition(
          locationSuccess,
          (retryError) => {
            // If retry also fails, show error
            switch (retryError.code) {
              case retryError.PERMISSION_DENIED:
                toast.error('Location access denied. Enable it in browser settings.');
                break;
              case retryError.POSITION_UNAVAILABLE:
                toast.error('Unable to determine location. Check GPS/location services.');
                break;
              case retryError.TIMEOUT:
                toast.error('Location request timed out. Try again.');
                break;
              default:
                toast.error('Failed to get your location.');
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000, // Accept cached position up to 1 minute old
          },
        );
        return;
      }

      // Show error if first try or retry failed
      switch (error.code) {
        case error.PERMISSION_DENIED:
          toast.error('Location access denied. Enable it in browser settings.');
          break;
        case error.POSITION_UNAVAILABLE:
          toast.error('Unable to determine location. Check GPS/location services.');
          break;
        case error.TIMEOUT:
          toast.error('Location request timed out. Try again.');
          break;
        default:
          toast.error('Failed to get your location.');
      }
    };

    // Try with high accuracy first using watchPosition
    watchIdRef.current = navigator.geolocation.watchPosition(
      locationSuccess,
      locationError,
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds timeout
        maximumAge: 5000, // Accept cached position up to 5 seconds old
      },
    );
  };

  // Cleanup watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current, {
        zoomControl: false,
        // Require Ctrl/Cmd key for scroll zoom on desktop, two fingers on mobile
        scrollWheelZoom: false,
        // Disable dragging initially - will be enabled with proper gestures
        dragging: true,
        // Enable touch zoom with two fingers only
        touchZoom: true,
        doubleClickZoom: false,
      }).setView(center, zoom);

      // Enable scroll wheel zoom only with Ctrl/Cmd key
      map.current.on('wheel', (e: any) => {
        if (e.originalEvent.ctrlKey || e.originalEvent.metaKey) {
          map.current.scrollWheelZoom.enable();
        } else {
          map.current.scrollWheelZoom.disable();
        }
      });

      // Add custom handler for touch events
      let touchCount = 0;
      mapContainer.current.addEventListener('touchstart', (e) => {
        touchCount = e.touches.length;
      });

      mapContainer.current.addEventListener(
        'touchmove',
        (e) => {
          if (touchCount < 2) {
            // Prevent scrolling if less than 2 fingers
            e.preventDefault();
          }
        },
        { passive: false },
      );

      L.control.zoom({ position: 'bottomright' }).addTo(map.current);

      // Use CartoDB Positron without attribution to hide the Ukrainian flag
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '',
          maxZoom: 19,
          subdomains: 'abcd',
        },
      ).addTo(map.current);

      // Only set loading to false if no GPX data to load
      if (!gpxData && !gpxUrl) {
        setIsLoading(false);
      }
    }
  }, []); // Empty dependency - initialize map once

  // Separate effect for GPX data processing
  useEffect(() => {
    if (!map.current) return;

    // Process GPX data
    const processGPXData = (data: string) => {
      try {
        const gpx = new DOMParser().parseFromString(data, 'text/xml');
        const bounds = L.latLngBounds([]);
        const trkpts = gpx.querySelectorAll('trkpt');

        if (trkpts.length > 0) {
          const latlngs: L.LatLng[] = [];
          const elevations: number[] = [];

          trkpts.forEach((trkpt) => {
            const lat = parseFloat(trkpt.getAttribute('lat') || '0');
            const lon = parseFloat(trkpt.getAttribute('lon') || '0');
            const ele = parseFloat(
              trkpt.querySelector('ele')?.textContent || '0',
            );

            const latlng = L.latLng(lat, lon);
            latlngs.push(latlng);
            elevations.push(ele);
            bounds.extend(latlng);
          });

          if (latlngs.length > 0) {
            let totalDistance = 0;
            for (let i = 1; i < latlngs.length; i++) {
              totalDistance += calculateDistance(
                latlngs[i - 1].lat,
                latlngs[i - 1].lng,
                latlngs[i].lat,
                latlngs[i].lng,
              );
            }

            const elevationGain =
              Math.max(...elevations) - Math.min(...elevations);
            let difficulty = 'Easy';
            if (totalDistance > 30 || elevationGain > 500)
              difficulty = 'Moderate';
            if (totalDistance > 50 || elevationGain > 1000) difficulty = 'Hard';

            if (onRouteDataParsed) {
              onRouteDataParsed({
                distance: Math.round(totalDistance * 10) / 10,
                elevation: Math.round(elevationGain),
                difficulty,
              });
            }

            // Calmer emerald-500 route line (#10B981)
            L.polyline(latlngs, {
              color: '#10B981',
              weight: 4,
              opacity: 0.8,
              lineJoin: 'round',
              lineCap: 'round',
            }).addTo(map.current!);

            // Subtle shadow/glow effect
            L.polyline(latlngs, {
              color: '#10B981',
              weight: 7,
              opacity: 0.15,
              lineJoin: 'round',
              lineCap: 'round',
            }).addTo(map.current!);

            // Start marker
            L.marker(latlngs[0], { icon: createBikeMarker(true) })
              .bindPopup(
                `
                <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 10px;">
                  <strong style="color: #10B981; font-size: 15px;">Start Point</strong>
                  <p style="margin: 6px 0 0 0; color: #666; font-size: 13px;">
                    Elevation: ${Math.round(elevations[0])}m
                  </p>
                </div>
              `,
              )
              .addTo(map.current!);

            // End marker
            const lastIdx = latlngs.length - 1;
            if (
              latlngs[0].lat !== latlngs[lastIdx].lat ||
              latlngs[0].lng !== latlngs[lastIdx].lng
            ) {
              L.marker(latlngs[lastIdx], { icon: createBikeMarker(false) })
                .bindPopup(
                  `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 10px;">
                    <strong style="color: #10B981; font-size: 15px;">Finish Point</strong>
                    <p style="margin: 6px 0 0 0; color: #666; font-size: 13px;">
                      Elevation: ${Math.round(elevations[lastIdx])}m
                    </p>
                  </div>
                `,
                )
                .addTo(map.current!);
            }

            if (bounds.isValid()) {
              map.current!.fitBounds(bounds, { padding: [60, 60] });
            }
          }
        }

        // Waypoints with arrow labels
        const wpts = gpx.querySelectorAll('wpt');
        wpts.forEach((wpt) => {
          const lat = parseFloat(wpt.getAttribute('lat') || '0');
          const lon = parseFloat(wpt.getAttribute('lon') || '0');
          const name = wpt.querySelector('name')?.textContent || 'Waypoint';

          L.marker([lat, lon], {
            icon: createIncidentMarker(name),
          })
            .bindPopup(
              `
              <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 10px;">
                <strong style="color: #E74C3C; font-size: 15px;">${name}</strong>
              </div>
            `,
            )
            .addTo(map.current!);
        });

        gpxLoadedRef.current = true;
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing GPX data:', error);
        setIsLoading(false);
      }
    };

    if (gpxData && !gpxLoadedRef.current) {
      gpxLoadedRef.current = true;
      processGPXData(gpxData);
    } else if (gpxUrl && !gpxLoadedRef.current) {
      gpxLoadedRef.current = true;
      setIsLoading(true);
      fetch(gpxUrl)
        .then((response) => response.text())
        .then(processGPXData)
        .catch((error) => {
          console.error('Error loading GPX file:', error);
          setIsLoading(false);
        });
    }
  }, [gpxData, gpxUrl, onRouteDataParsed, calculateDistance]);

  return (
    <div className="relative z-10">
      {/* Two-finger gesture hint overlay - shows briefly on mobile */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[999] bg-black/75 text-white text-xs px-3 py-2 rounded-full pointer-events-none md:hidden">
        Use two fingers to zoom and pan
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-[1000] bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="w-4 h-4 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
            <div className="text-gray-800 text-sm font-medium">
              Loading route...
            </div>
          </div>
        </div>
      )}

      {/* Map container */}
      <div
        ref={mapContainer}
        className={`w-full ${height}  touch-pan-y`}
        style={{ touchAction: 'pan-y' }}
      />

      {/* Find Me button */}
      <button
        onClick={handleFindMe}
        disabled={isLocating}
        className="absolute bottom-4 left-4 z-[1000] bg-white text-gray-800 rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        title="Find My Location"
      >
        {isLocating ? (
          <>
            <div className="w-4 h-4 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin"></div>
            <span className="text-sm">Locating...</span>
          </>
        ) : (
          <>
            <IconRadar2 size={20} className="text-emerald-600" />
            <span className="text-sm">Find Me</span>
          </>
        )}
      </button>
    </div>
  );
}
