export interface AlongCarePageData {
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

export interface AlongCarePageResponse {
  data: AlongCarePageData;
  meta: Record<string, any>;
}

export interface Partner {
  id: number;
  documentId: string;
  name: string;
  country: string;
  cities: string[];
  link: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface PartnersResponse {
  data: Partner[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
