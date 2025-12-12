import { GuidesStoriesPageResponse } from '@/types/guides-stories';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Server-side fetch function with Next.js caching
export async function getGuidesStoriesData(): Promise<GuidesStoriesPageResponse> {
  const url = `${STRAPI_API_URL}/guides-stories-page`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    // Cache for 1 minute, revalidate in background
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch guides & stories data: ${response.statusText}`);
  }

  return response.json();
}
