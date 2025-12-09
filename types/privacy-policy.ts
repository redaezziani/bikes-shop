export interface PrivacyPolicyPageData {
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

export interface PrivacyPolicyPageResponse {
  data: PrivacyPolicyPageData;
  meta: Record<string, unknown>;
}
