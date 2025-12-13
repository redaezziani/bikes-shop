import { Product, ProductsResponse } from '@/types/products';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const buildProductsQueryString = (params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  slug?: string;
}): string => {
  const queryParts = [
    'populate[0]=cover_image',
    'populate[1]=preview_images',
    'populate[2]=specs',
    'populate[3]=colors',
    'populate[4]=available_accessories.image',
    'populate[5]=specs_image',
  ];

  if (params?.page) {
    queryParts.push(`pagination[page]=${params.page}`);
  }
  if (params?.pageSize) {
    queryParts.push(`pagination[pageSize]=${params.pageSize}`);
  }
  if (params?.category) {
    queryParts.push(`filters[category][$eq]=${params.category}`);
  }
  if (params?.slug) {
    queryParts.push(`filters[slug][$eq]=${params.slug}`);
  }

  return queryParts.join('&');
};

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const queryString = buildProductsQueryString({ slug });
    const response = await fetch(
      `${STRAPI_API_URL}/products?${queryString}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_API_KEY}`,
        },
        next: { revalidate: 60 }, // ISR with 60 second revalidation
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    const data: ProductsResponse = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

export async function getProducts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<ProductsResponse | null> {
  try {
    const queryString = buildProductsQueryString(params);
    const response = await fetch(
      `${STRAPI_API_URL}/products?${queryString}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_API_KEY}`,
        },
        next: { revalidate: 60 }, // ISR with 60 second revalidation
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const response = await fetch(
      `${STRAPI_API_URL}/products?fields[0]=slug`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_API_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product slugs');
    }

    const data: ProductsResponse = await response.json();
    return data.data.map((product) => product.slug).filter(Boolean);
  } catch (error) {
    console.error('Error fetching product slugs:', error);
    return [];
  }
}
