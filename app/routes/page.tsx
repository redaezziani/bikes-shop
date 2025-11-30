'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Footer from '@/components/footer';

// Dynamically import LeafletMap with SSR disabled
const LeafletMap = dynamic(() => import('@/components/leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-green-500 mb-3"></div>
        <div className="text-gray-600 text-sm font-medium">Loading map...</div>
      </div>
    </div>
  ),
});

interface RouteStats {
  distance: number;
  elevation: number;
  difficulty: string;
}

export default function RoutesPage() {
  const gpxUrl = '/gpx/Desert-Ride.gpx';

  // State for auto-calculated route stats
  const [routeStats, setRouteStats] = useState<RouteStats>({
    distance: 42,
    elevation: 850,
    difficulty: 'Moderate',
  });

  return (
    <main className="flex flex-col bg-white min-h-screen">
      {/* Header Section */}
      <section className="w-full px-4 py-8 bg-gradient-to-br from-green-50 to-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Bike Routes
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our curated bike routes and trails
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Map Container */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <LeafletMap
              gpxUrl={gpxUrl}
              height="h-[600px]"
              zoom={11}
              center={[24.84, 55.3]} // Dubai desert area
              onRouteDataParsed={(data) => setRouteStats(data)}
            />
          </div>

          {/* Route Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Distance
                </h3>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                {routeStats.distance}{' '}
                <span className="text-2xl text-gray-500">km</span>
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Difficulty
                </h3>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                {routeStats.difficulty}
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Elevation
                </h3>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                {routeStats.elevation}{' '}
                <span className="text-2xl text-gray-500">m</span>
              </p>
            </div>
          </div>

          {/* Featured Routes Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Routes
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[600px] w-full relative">
                <iframe
                  src="https://www.komoot.com/collection/3992640/embed"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  style={{ border: 'none' }}
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Additional Route Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Route Information
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Suitable for intermediate to advanced riders</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Best enjoyed during cooler months (October - April)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Bring plenty of water and sun protection</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                What to Expect
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Stunning desert landscapes and dunes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Mix of paved and off-road terrain</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Approximately 3-4 hours riding time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
