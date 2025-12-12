export interface GuidesStoriesPage {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface GuidesStoriesPageResponse {
  data: GuidesStoriesPage;
  meta: Record<string, unknown>;
}
