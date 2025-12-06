import { OffersResponse } from '@/types/offers';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Helper function to build query string
const buildOffersQueryString = (params?: {
  page?: number;
  pageSize?: number;
}): string => {
  const queryParts = [
    'populate[0]=featured_image',
    'sort[0]=createdAt:desc',
  ];

  if (params?.page) {
    queryParts.push(`pagination[page]=${params.page}`);
  }
  if (params?.pageSize) {
    queryParts.push(`pagination[pageSize]=${params.pageSize}`);
  }

  return queryParts.join('&');
};

// Server-side fetch function with Next.js caching
export async function getOffersData(params?: {
  page?: number;
  pageSize?: number;
}): Promise<OffersResponse> {
  const url = `${STRAPI_API_URL}/offers?${buildOffersQueryString(params)}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    // Cache for 10 minutes, revalidate in background
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch offers data: ${response.statusText}`);
  }

  return response.json();
}
