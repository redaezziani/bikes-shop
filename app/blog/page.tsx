'use client';

import { useState } from 'react';
import { useBlogs } from '@/store/blogs';
import BlogCard from '@/components/blog-card';
import Footer from '@/components/footer';
import Link from 'next/link';

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const { data, isLoading } = useBlogs({ page, pageSize });

  const blogs = data?.data || [];
  const totalPages = data?.meta?.pagination?.pageCount || 0;

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-neutral-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <span className="text-neutral-600 mx-2">/</span>
            <span className="text-white">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-neutral-300 max-w-2xl">
            Discover insights, tips, and stories about bikes, riding techniques, and cycling lifestyle.
          </p>
        </div>
      </div>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className="rounded-lg bg-neutral-200 animate-pulse h-96"
                />
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
                    .map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          page === p
                            ? 'bg-neutral-800 text-white'
                            : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
