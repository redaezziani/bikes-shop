export interface ShippingReturnsPageData {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface ShippingReturnsPageResponse {
  data: ShippingReturnsPageData;
  meta: Record<string, unknown>;
}
