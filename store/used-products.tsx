'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { UsedModelsResponse } from '@/types/used-models';

export type { UsedModel, UsedModelsResponse } from '@/types/used-models';

const USED_MODELS_QUERY = [
  'populate[0]=images',
  'sort[0]=createdAt:desc',
].join('&');

// Hook to fetch all used models
export const useUsedModels = () => {
  return useQuery({
    queryKey: ['used-models'],
    queryFn: async () => {
      const response = await api.get<UsedModelsResponse>(
        `/used-models?${USED_MODELS_QUERY}`,
      );
      return response.data;
    },
  });
};
