const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

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

export async function getTermsConditionsPageData(): Promise<TermsConditionsPageResponse> {
  const url = `${STRAPI_API_URL}/terms-conditions-page`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    next: { revalidate: 60 }, // Cache for 1 minute
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch terms and conditions page data: ${response.statusText}`);
  }

  return response.json();
}
