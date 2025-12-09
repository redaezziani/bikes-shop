export interface WarrantyPageData {
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

export interface WarrantyPageResponse {
  data: WarrantyPageData;
  meta: Record<string, unknown>;
}
