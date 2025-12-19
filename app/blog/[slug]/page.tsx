import { Suspense } from 'react';
import { Metadata } from 'next';
import BlogPostClient from './blog-post-client';
import { Blog } from '@/types/blogs';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string): Promise<Blog | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

  try {
    const response = await fetch(
      `${apiUrl}/blogs?filters[slug][$eq]=${slug}&populate=featured_image`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogSlug = Array.isArray(slug) ? slug[0] : slug;
  const blog = await getBlog(blogSlug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const imageUrl = blog.featured_image?.url
    ? `${strapiUrl}${blog.featured_image.url}`
    : `${baseUrl}/og-image.jpg`;

  return {
    title: `${blog.title} | Electric Cargo Bikes Dubai Blog`,
    description:
      blog.meta_description ||
      blog.excerpt ||
      blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    keywords: `${blog.title}, ${blog.category || 'cycling'}, electric bikes, cargo bikes, Dubai cycling, bike blog`,
    authors: [{ name: 'Electric Cargo Bikes Dubai' }],
    openGraph: {
      title: blog.title,
      description:
        blog.meta_description ||
        blog.excerpt ||
        blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      type: 'article',
      url: `${baseUrl}/blog/${blog.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: ['Electric Cargo Bikes Dubai'],
      section: blog.category || 'Cycling',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description:
        blog.meta_description ||
        blog.excerpt ||
        blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${blog.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogSlug = Array.isArray(slug) ? slug[0] : slug;
  const blog = await getBlog(blogSlug);

  if (!blog) {
    return (
      <main className="min-h-screen bg-white">
        <div className="bg-zinc-900 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-zinc-400">Blog post not found</p>
          </div>
        </div>
      </main>
    );
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const imageUrl = blog.featured_image?.url
    ? `${strapiUrl}${blog.featured_image.url}`
    : `${baseUrl}/og-image.jpg`;

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description:
      blog.meta_description ||
      blog.excerpt ||
      blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    image: imageUrl,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Electric Cargo Bikes Dubai',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Electric Cargo Bikes Dubai',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${blog.slug}`,
    },
    articleSection: blog.category || 'Cycling',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPostClient slug={blogSlug} initialBlog={blog} />
    </>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white">
          <div className="bg-zinc-900 text-white py-8 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-400">Loading...</span>
              </div>
            </div>
          </div>
        </main>
      }
    >
      <BlogPostContent params={params} />
    </Suspense>
  );
}
