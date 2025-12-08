import { SectionOneResponse } from '@/types/section-one';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Helper function to build query string
const buildSectionOneQueryString = (params?: {
  page?: number;
  pageSize?: number;
}): string => {
  const queryParts = [
    'populate[0]=cover_image',
    'populate[1]=product',
    'populate[2]=product.cover_image',
    'sort[0]=createdAt:asc',
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
export async function getSectionOneData(params?: {
  page?: number;
  pageSize?: number;
}): Promise<SectionOneResponse> {
  const url = `${STRAPI_API_URL}/section-ones?${buildSectionOneQueryString(params)}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    // Cache for 1 minute, revalidate in background
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch section one data: ${response.statusText}`);
  }

  return response.json();
}
