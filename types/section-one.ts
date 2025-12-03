import { CoverImage, Product } from './products';

export interface SectionOne {
  id: number;
  documentId: string;
  cover_image: CoverImage;
  title: string;
  description: string;
  product?: Product;
  external_link?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SectionOneResponse {
  data: SectionOne[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
