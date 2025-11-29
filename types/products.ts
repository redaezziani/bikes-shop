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
  specs: Specs;
  colors: Color[];
  available_accessories: Accessory[];
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
  previewUrl: any;
  provider: string;
  provider_metadata: any;
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
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface PreviewImage extends CoverImage {}

export interface Specs {
  id: number;
  speed: string;
  range: string;
  battery: string;
}

export interface Color {
  id: number;
  name: string;
  hex: string;
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
