'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { GuidesStoriesPage, GuidesStoriesPageResponse } from '@/types/guides-stories';

// Hook to fetch guides & stories page data
export const useGuidesStories = () => {
  return useQuery({
    queryKey: ['guides-stories'],
    queryFn: async () => {
      const response = await api.get<GuidesStoriesPageResponse>('/guides-stories-page');
      return response.data;
    },
  });
};
