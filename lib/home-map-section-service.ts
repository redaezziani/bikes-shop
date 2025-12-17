import { HomeMapSectionResponse } from '@/types/home-map-section';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Helper function to build query string
const buildHomeMapSectionQueryString = (): string => {
  const queryParts = ['populate[0]=image'];

  return queryParts.join('&');
};

// Server-side fetch function with Next.js caching
export async function getHomeMapSectionData(): Promise<HomeMapSectionResponse> {
  const url = `${STRAPI_API_URL}/home-map-section?${buildHomeMapSectionQueryString()}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    // Cache for 1 minute, revalidate in background
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch home map section data: ${response.statusText}`);
  }

  return response.json();
}
