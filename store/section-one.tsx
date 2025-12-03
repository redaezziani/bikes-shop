'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { SectionOne, SectionOneResponse } from '@/types/section-one';

// Helper function to build query string
const buildSectionOneQueryString = (params?: {
  page?: number;
  pageSize?: number;
}): string => {
  const queryParts = [
    'populate[0]=cover_image',
    'populate[1]=product',
    'populate[2]=product.cover_image',
  ];

  if (params?.page) {
    queryParts.push(`pagination[page]=${params.page}`);
  }
  if (params?.pageSize) {
    queryParts.push(`pagination[pageSize]=${params.pageSize}`);
  }

  return queryParts.join('&');
};

// Hook to fetch all section one items
export const useSectionOne = (params?: {
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ['section-one', params],
    queryFn: async () => {
      const response = await api.get<SectionOneResponse>(
        `/section-ones?${buildSectionOneQueryString(params)}`,
      );
      return response.data;
    },
  });
};

// Hook to fetch section one by ID
export const useSectionOneById = (id: number) => {
  return useQuery({
    queryKey: ['section-one', 'id', id],
    queryFn: async () => {
      const queryString = [
        'populate[0]=cover_image',
        'populate[1]=product',
        'populate[2]=product.cover_image',
      ].join('&');

      const response = await api.get<{ data: SectionOne }>(
        `/section-ones/${id}?${queryString}`,
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};
