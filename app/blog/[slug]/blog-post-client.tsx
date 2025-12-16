'use client';

import { useBlogBySlug } from '@/store/blogs';
import BlogPostDetail from '@/components/blog-post-detail';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Blog } from '@/types/blogs';

interface BlogPostClientProps {
  slug: string;
  initialBlog?: Blog | null;
}

export default function BlogPostClient({ slug, initialBlog }: BlogPostClientProps) {
  const { data: blog, isLoading } = useBlogBySlug(slug);

  // Use initialBlog if available, otherwise use data from hook
  const displayBlog = blog || initialBlog;

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-zinc-900 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <Link
              href="/blog"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white truncate">
              {displayBlog?.title || 'Loading...'}
            </span>
          </div>
        </div>
      </div>

      <BlogPostDetail blog={displayBlog || null} isLoading={isLoading} />

      <Footer />
    </main>
  );
}
