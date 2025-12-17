import { CoverImage } from './products';

export interface HomeMapSection {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: CoverImage;
  button_text: string;
  external_link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HomeMapSectionResponse {
  data: HomeMapSection;
  meta: Record<string, unknown>;
}
