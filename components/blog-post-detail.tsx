'use client';

import { Blog } from '@/types/blogs';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface BlogPostDetailProps {
  blog: Blog | null;
  isLoading: boolean;
}

const BlogPostDetail = ({ blog, isLoading }: BlogPostDetailProps) => {
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="h-8 w-64 bg-neutral-200 animate-pulse rounded mb-4"></div>
        <div className="h-6 w-32 bg-neutral-200 animate-pulse rounded mb-8"></div>
        <div className="h-96 w-full bg-neutral-200 animate-pulse rounded mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-full bg-neutral-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Blog post not found</h1>
        <Link href="/blog" className="text-neutral-800 hover:text-neutral-600 font-semibold">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readingTime = Math.ceil(blog.content.split(' ').length / 200);

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog" className="text-neutral-600 hover:text-neutral-900 text-sm font-semibold mb-6 inline-block">
          ← Back to Blog
        </Link>

        {blog.category && (
          <span className="inline-block text-xs font-semibold text-neutral-500 uppercase tracking-wide bg-neutral-100 px-3 py-1 rounded-full mb-4">
            {blog.category}
          </span>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-neutral-600 text-sm">
          <span>{formattedDate}</span>
          <span className="text-neutral-300">•</span>
          <span>{readingTime} min read</span>
        </div>
      </div>

      {blog.featured_image?.url && (
        <div className="mb-12 rounded-lg overflow-hidden bg-neutral-200 h-96 md:h-[500px]">
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.featured_image.url}`}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-neutral max-w-none mb-12">
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="text-lg font-bold text-neutral-900 mt-8 mb-4" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-base font-bold text-neutral-900 mt-6 mb-3" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-neutral-700 leading-7 mb-6" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside text-neutral-700 mb-6 space-y-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-neutral-700" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-neutral-300 pl-4 py-2 my-6 italic text-neutral-600 bg-neutral-50 p-4"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
            ),
            img: ({ node, ...props }) => (
              <img className="rounded-lg my-6 w-full" {...props} />
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>

      <div className="border-t border-neutral-200 pt-8">
        {blog.meta_description && (
          <p className="text-neutral-600 italic mb-6">
            <strong>Summary:</strong> {blog.meta_description}
          </p>
        )}

        <div className="flex justify-between items-center">
          <Link href="/blog" className="text-neutral-800 hover:text-neutral-600 font-semibold">
            ← Back to Blog
          </Link>
          {blog.category && (
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide bg-neutral-100 px-3 py-1 rounded-full">
              {blog.category}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogPostDetail;
