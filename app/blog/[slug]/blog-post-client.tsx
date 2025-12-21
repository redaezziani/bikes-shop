'use client';

import { useBlogBySlug } from '@/store/blogs';
import BlogPostDetail from '@/components/blog-post-detail';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Blog } from '@/types/blogs';
import Header from '@/components/header';
import HeaderDetailsPage from '@/components/header-v2';

interface BlogPostClientProps {
  slug: string;
  initialBlog?: Blog | null;
}

export default function BlogPostClient({
  slug,
  initialBlog,
}: BlogPostClientProps) {
  const { data: blog, isLoading } = useBlogBySlug(slug);

  // Use initialBlog if available, otherwise use data from hook
  const displayBlog = blog || initialBlog;

  return (
    <main className="min-h-screen bg-white">
      <HeaderDetailsPage />
      <BlogPostDetail blog={displayBlog || null} isLoading={isLoading} />

      <Footer />
    </main>
  );
}
