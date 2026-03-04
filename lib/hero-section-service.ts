import { HeroSectionResponse } from '@/types/hero-section';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

export async function getHeroSectionData(): Promise<HeroSectionResponse> {
  const url = `${STRAPI_API_URL}/hero-section`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch hero section data: ${response.statusText}`);
  }

  return response.json();
}
