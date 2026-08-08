import { CoverImage } from '@/types/products';

export interface UsedModel {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  price: number;
  images: CoverImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface UsedModelsResponse {
  data: UsedModel[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
