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
      <div className=" bg-zinc-100/90 rounded-lg overflow-hidden  transition-shadow duration-300 h-full flex flex-col">
        {blog.featured_image?.url && (
          <div className="relative h-48 overflow-hidden bg-zinc-200">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.featured_image.url}`}
              alt={blog.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4 flex flex-col grow">
          <h3 className="text-lg font-bold text-zinc-900 mb-2 line-clamp-2">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="text-sm text-zinc-700 mb-4 line-clamp-2 font-medium grow">
              {blog.excerpt}
            </p>
          )}
          <div className="flex w-full">
            <button
              className=" py-2 px-3 rounded-lg font-medium text-zinc-800 capitalize text-sm bg-white w-44"
              aria-label={`Learn more about ${blog.title}`}
            >
              learn more
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
