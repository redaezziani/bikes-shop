export interface AboutUsPage {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AboutUsPageResponse {
  data: AboutUsPage;
  meta: Record<string, unknown>;
}
