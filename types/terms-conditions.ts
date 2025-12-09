export interface TermsConditionsPageData {
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

export interface TermsConditionsPageResponse {
  data: TermsConditionsPageData;
  meta: Record<string, unknown>;
}
