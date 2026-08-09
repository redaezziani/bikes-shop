import { BlogsResponse } from '@/types/blogs';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Helper function to build query string
const buildBlogsQueryString = (params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): string => {
  const queryParts = [
    'populate[0]=featured_image',
    'sort[0]=orderIndex:asc',
    'sort[1]=createdAt:desc',
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

const EMPTY_BLOGS_RESPONSE: BlogsResponse = {
  data: [],
  meta: {
    pagination: {
      page: 1,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
};

// Server-side fetch function with Next.js caching
export async function getBlogsData(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<BlogsResponse> {
  const url = `${STRAPI_API_URL}/blogs?${buildBlogsQueryString(params)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
      // Cache for 1 minute, revalidate in background
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch blogs data: ${response.statusText}`);
      return EMPTY_BLOGS_RESPONSE;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs data:', error);
    return EMPTY_BLOGS_RESPONSE;
  }
}
