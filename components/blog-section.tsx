'use client';

import { useBlogs } from '@/store/blogs';
import BlogCard from './blog-card';
import Link from 'next/link';

const BlogSection = () => {
  const { data, isLoading } = useBlogs({ pageSize: 6 });

  if (isLoading) {
    return (
      <section className="w-full px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-48 bg-neutral-200 animate-pulse rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-neutral-200 animate-pulse h-96"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const blogs = data?.data || [];

  return (
    <section className="w-full px-4 py-12 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Latest Blog Posts
            </h2>
            <p className="text-neutral-600">
              Stay updated with our latest articles and insights
            </p>
          </div>
          {blogs.length > 0 && (
            <Link
              href="/blog"
              className="hidden md:inline-block text-neutral-800 hover:text-neutral-600 font-semibold text-sm transition-colors"
            >
              View All →
            </Link>
          )}
        </div>

        {blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="flex md:hidden justify-center mt-8">
              <Link
                href="/blog"
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                View All Posts
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
