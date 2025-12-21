import { CoverImage } from './products';

export interface Blog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: CoverImage;
  category?: string;
  meta_description?: string;
  orderIndex?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogsResponse {
  data: Blog[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
