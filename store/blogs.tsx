'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Blog, BlogsResponse } from '@/types/blogs';

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

// Hook to fetch all blogs
export const useBlogs = (params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}) => {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: async () => {
      const response = await api.get<BlogsResponse>(
        `/blogs?${buildBlogsQueryString(params)}`,
      );
      return response.data;
    },
  });
};

// Hook to fetch blog by slug
export const useBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['blog', 'slug', slug],
    queryFn: async () => {
      const queryString = [
        'populate[0]=featured_image',
        `filters[slug][$eq]=${slug}`,
      ].join('&');

      const response = await api.get<BlogsResponse>(
        `/blogs?${queryString}`,
      );
      return response.data.data[0] || null;
    },
    enabled: !!slug,
  });
};

// Hook to fetch blog by ID
export const useBlogById = (id: number) => {
  return useQuery({
    queryKey: ['blog', 'id', id],
    queryFn: async () => {
      const queryString = [
        'populate[0]=featured_image',
      ].join('&');

      const response = await api.get<{ data: Blog }>(
        `/blogs/${id}?${queryString}`,
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};
