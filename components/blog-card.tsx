'use client';

import { Blog } from '@/types/blogs';
import Link from 'next/link';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {blog.featured_image?.url && (
          <div className="relative h-48 overflow-hidden bg-neutral-200">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.featured_image.url}`}
              alt={blog.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
          {blog.category && (
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
              {blog.category}
            </span>
          )}
          <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="text-sm text-neutral-600 mb-4 line-clamp-3 flex-grow">
              {blog.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <span className="text-xs text-neutral-500">
              {formattedDate}
            </span>
            <span className="text-sm font-semibold text-neutral-800 hover:text-neutral-600 transition-colors">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
