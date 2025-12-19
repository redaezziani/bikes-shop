'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Story, StoriesResponse } from '@/types/stories';

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

// Hook to fetch all stories
export const useStories = (params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}) => {
  return useQuery({
    queryKey: ['stories', params],
    queryFn: async () => {
      const response = await api.get<StoriesResponse>(
        `/stories?${buildStoriesQueryString(params)}`,
      );
      return response.data;
    },
  });
};

// Hook to fetch story by slug
export const useStoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['story', 'slug', slug],
    queryFn: async () => {
      const queryString = [
        'populate[0]=featured_image',
        `filters[slug][$eq]=${slug}`,
      ].join('&');

      const response = await api.get<StoriesResponse>(
        `/stories?${queryString}`,
      );
      return response.data.data[0] || null;
    },
    enabled: !!slug,
  });
};

// Hook to fetch story by ID
export const useStoryById = (id: number) => {
  return useQuery({
    queryKey: ['story', 'id', id],
    queryFn: async () => {
      const queryString = [
        'populate[0]=featured_image',
      ].join('&');

      const response = await api.get<{ data: Story }>(
        `/stories/${id}?${queryString}`,
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};
