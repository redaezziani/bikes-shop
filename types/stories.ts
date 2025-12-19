import { CoverImage } from './products';

export interface Story {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: CoverImage;
  category?: string;
  meta_description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StoriesResponse {
  data: Story[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
