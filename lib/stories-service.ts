import { StoriesResponse } from '@/types/stories';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Helper function to build query string
const buildStoriesQueryString = (params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): string => {
  const queryParts = [
    'populate[0]=featured_image',
    'sort[0]=orderIndex:asc',
  ];

  if (params?.page) {
    queryParts.push(`pagination[page]=${params.page}`);
  }
  if (params?.pageSize) {
    queryParts.push(`pagination[pageSize]=${params.pageSize}`);
  }
  if (params?.category) {
    queryParts.push(`filters[category][$eq]=${params.category}`);
  }

  return queryParts.join('&');
};

// Server-side fetch function with Next.js caching
export async function getStoriesData(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<StoriesResponse> {
  const url = `${STRAPI_API_URL}/stories?${buildStoriesQueryString(params)}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    // Cache for 1 minute, revalidate in background
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stories data: ${response.statusText}`);
  }

  return response.json();
}

// Fetch single story by slug
export async function getStoryBySlug(slug: string) {
  const url = `${STRAPI_API_URL}/stories?filters[slug][$eq]=${slug}&populate[0]=featured_image`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch story: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data?.[0] || null;
}
