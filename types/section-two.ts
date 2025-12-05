import { CoverImage, Product } from './products';

export interface SectionTwo {
  id: number;
  documentId: string;
  cover_image: CoverImage;
  title: string;
  description: string;
  product?: Product;
  external_link?: string;
  button_text?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SectionTwoResponse {
  data: SectionTwo[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
