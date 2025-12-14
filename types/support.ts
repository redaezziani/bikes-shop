export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  faqs: FAQ[];
}

export interface SupportPage {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  categories: FAQCategory[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SupportPageResponse {
  data: SupportPage;
  meta: Record<string, unknown>;
}
