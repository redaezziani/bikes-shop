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
    <section className="w-full px-4 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-neutral-600 text-lg">
            Stay updated with our latest articles and insights
          </p>
        </div>

        {blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Link
                href="/blog"
                className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md font-semibold transition-colors"
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
