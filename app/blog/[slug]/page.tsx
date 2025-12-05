import { Suspense } from 'react';
import BlogPostClient from './blog-post-client';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogSlug = Array.isArray(slug) ? slug[0] : slug;

  return <BlogPostClient slug={blogSlug} />;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white">
        <div className="bg-zinc-900 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-400">Loading...</span>
            </div>
          </div>
        </div>
      </main>
    }>
      <BlogPostContent params={params} />
    </Suspense>
  );
}
