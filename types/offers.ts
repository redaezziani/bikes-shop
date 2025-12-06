export interface OfferImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface Offer {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image?: OfferImage;
  button_text?: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface OfferMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface OffersResponse {
  data: Offer[];
  meta: OfferMeta;
}
