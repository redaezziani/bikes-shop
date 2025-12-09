const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

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

export async function getPrivacyPolicyPageData(): Promise<PrivacyPolicyPageResponse> {
  const url = `${STRAPI_API_URL}/privacy-policy-page`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    next: { revalidate: 60 }, // Cache for 1 minute
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch privacy policy page data: ${response.statusText}`);
  }

  return response.json();
}
