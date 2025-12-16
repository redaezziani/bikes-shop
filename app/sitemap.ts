import { MetadataRoute } from 'next';
import { BlogsResponse } from '@/types/blogs';

async function getAllBlogs(): Promise<BlogsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  try {
    // Fetch all blogs with a large page size
    const response = await fetch(
      `${apiUrl}/api/blogs?pagination[pageSize]=1000&populate=featured_image&sort=publishedAt:desc`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const { data: blogs } = await getAllBlogs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
