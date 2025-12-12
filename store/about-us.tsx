'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AboutUsPage, AboutUsPageResponse } from '@/types/about-us';

// Hook to fetch about us page data
export const useAboutUs = () => {
  return useQuery({
    queryKey: ['about-us'],
    queryFn: async () => {
      const response = await api.get<AboutUsPageResponse>('/about-us-page');
      return response.data;
    },
  });
};
