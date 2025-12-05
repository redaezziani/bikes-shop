// Strapi API Types
export interface Product {
  id: number;
  documentId: string;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover_image: CoverImage;
  preview_images: PreviewImage[];
  specs: Spec[];
  colors: Color[];
  available_accessories: Accessory[];
  specs_image?: CoverImage;
}

export interface CoverImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImageFormats {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export type PreviewImage = CoverImage;

export interface Spec {
  id: number;
  name: string;
  value: string;
  measure?: string;
}

export interface Color {
  id: number;
  name: string;
  hex: string;
  quantity?: number;
}

export interface Accessory {
  id: number;
  documentId?: string;
  name?: string;
  title?: string;
  description: string;
  price: number;
  image?: CoverImage;
  url?: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
