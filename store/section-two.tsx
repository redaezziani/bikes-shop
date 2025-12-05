'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { SectionTwo, SectionTwoResponse } from '@/types/section-two';

// Helper function to build query string
const buildSectionTwoQueryString = (params?: {
  page?: number;
  pageSize?: number;
}): string => {
  const queryParts = [
    'populate[0]=cover_image',
    'populate[1]=product',
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

// Hook to fetch all section two items
export const useSectionTwo = (params?: {
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ['section-two', params],
    queryFn: async () => {
      const response = await api.get<SectionTwoResponse>(
        `/section-twos?${buildSectionTwoQueryString(params)}`,
      );
      return response.data;
    },
  });
};

// Hook to fetch section two by ID
export const useSectionTwoById = (id: number) => {
  return useQuery({
    queryKey: ['section-two', 'id', id],
    queryFn: async () => {
      const queryString = [
        'populate[0]=cover_image',
        'populate[1]=product',
      ].join('&');

      const response = await api.get<{ data: SectionTwo }>(
        `/section-twos/${id}?${queryString}`,
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};
