import { CoverImage, Product } from './products';

export interface SectionOne {
  id: number;
  documentId: string;
  cover_image_desktop: CoverImage;
  cover_image_mobile: CoverImage;
  title: string;
  description: string;
  product?: Product;
  external_link?: string;
  button_text?: string;
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
