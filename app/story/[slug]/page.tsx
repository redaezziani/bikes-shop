import { Suspense } from 'react';
import { Metadata } from 'next';
import StoryPostClient from './story-post-client';
import { Story } from '@/types/stories';

interface StoryPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getStory(slug: string): Promise<Story | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  try {
    const response = await fetch(
      `${apiUrl}/api/stories?filters[slug][$eq]=${slug}&populate=featured_image`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: StoryPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const storySlug = Array.isArray(slug) ? slug[0] : slug;
  const story = await getStory(storySlug);

  if (!story) {
    return {
      title: 'Story Not Found',
      description: 'The requested story could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  const imageUrl = story.featured_image?.url
    ? `${apiUrl}${story.featured_image.url}`
    : `${baseUrl}/og-image.jpg`;

  return {
    title: `${story.title} | Electric Cargo Bikes Dubai Stories`,
    description:
      story.meta_description ||
      story.excerpt ||
      story.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    keywords: `${story.title}, ${story.category || 'cycling'}, electric bikes, cargo bikes, Dubai cycling, bike stories`,
    authors: [{ name: 'Electric Cargo Bikes Dubai' }],
    openGraph: {
      title: story.title,
      description:
        story.meta_description ||
        story.excerpt ||
        story.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      type: 'article',
      url: `${baseUrl}/story/${story.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
      publishedTime: story.publishedAt,
      modifiedTime: story.updatedAt,
      authors: ['Electric Cargo Bikes Dubai'],
      section: story.category || 'Cycling',
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description:
        story.meta_description ||
        story.excerpt ||
        story.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/story/${story.slug}`,
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

async function StoryPostContent({ params }: StoryPostPageProps) {
  const { slug } = await params;
  const storySlug = Array.isArray(slug) ? slug[0] : slug;
  const story = await getStory(storySlug);

  if (!story) {
    return (
      <main className="min-h-screen bg-white">
        <div className="bg-zinc-900 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-zinc-400">Story not found</p>
          </div>
        </div>
      </main>
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const imageUrl = story.featured_image?.url
    ? `${apiUrl}${story.featured_image.url}`
    : `${baseUrl}/og-image.jpg`;

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description:
      story.meta_description ||
      story.excerpt ||
      story.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    image: imageUrl,
    datePublished: story.publishedAt,
    dateModified: story.updatedAt,
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
      '@id': `${baseUrl}/story/${story.slug}`,
    },
    articleSection: story.category || 'Cycling',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StoryPostClient slug={storySlug} initialStory={story} />
    </>
  );
}

export default function StoryPostPage({ params }: StoryPostPageProps) {
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
      <StoryPostContent params={params} />
    </Suspense>
  );
}
