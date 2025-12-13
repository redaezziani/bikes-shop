import { PartnersResponse } from '@/types/along-care';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Helper function to build query string
const buildPartnersQueryString = (params?: {
  page?: number;
  pageSize?: number;
  country?: string;
}): string => {
  const queryParts: string[] = [];

  if (params?.page) {
    queryParts.push(`pagination[page]=${params.page}`);
  }
  if (params?.pageSize) {
    queryParts.push(`pagination[pageSize]=${params.pageSize}`);
  }
  if (params?.country) {
    queryParts.push(`filters[country][$containsi]=${encodeURIComponent(params.country)}`);
  }

  return queryParts.length > 0 ? queryParts.join('&') : '';
};

// Server-side fetch function with Next.js caching
export async function getPartnersData(params?: {
  page?: number;
  pageSize?: number;
  country?: string;
}): Promise<PartnersResponse> {
  const queryString = buildPartnersQueryString(params);
  const url = `${STRAPI_API_URL}/partners${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    // Cache for 1 minute, revalidate in background
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch partners data: ${response.statusText}`);
  }

  return response.json();
}
