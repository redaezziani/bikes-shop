'use client';

import React from 'react';
import { useBlogBySlug } from '@/store/blogs';
import BlogPostDetail from '@/components/blog-post-detail';
import Footer from '@/components/footer';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const { slug } = React.use(params);
  const blogSlug = Array.isArray(slug) ? slug[0] : slug;

  const { data: blog, isLoading } = useBlogBySlug(blogSlug as string);

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
              {blog?.title || 'Loading...'}
            </span>
          </div>
        </div>
      </div>

      <BlogPostDetail blog={blog || null} isLoading={isLoading} />

      <Footer />
    </main>
  );
};

export default BlogPostPage;
