'use client';

import { useParams } from 'next/navigation';
import { useBlogBySlug } from '@/store/blogs';
import BlogPostDetail from '@/components/blog-post-detail';
import Footer from '@/components/footer';
import Link from 'next/link';

const BlogPostPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const blogSlug = Array.isArray(slug) ? slug[0] : slug;

  const { data: blog, isLoading } = useBlogBySlug(blogSlug as string);

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-neutral-900 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-neutral-600">/</span>
            <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">
              Blog
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-white truncate">{blog?.title || 'Loading...'}</span>
          </div>
        </div>
      </div>

      <BlogPostDetail blog={blog || null} isLoading={isLoading} />

      <Footer />
    </main>
  );
};

export default BlogPostPage;
