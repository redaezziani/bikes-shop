'use client';

import { Blog } from '@/types/blogs';
import Link from 'next/link';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="relative h-[500px] overflow-hidden rounded-lg group cursor-pointer">
        {blog.featured_image?.url ? (
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.featured_image.url}`}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-400 to-neutral-600" />
        )}

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 className="text-3xl font-bold mb-2">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="text-neutral-200 text-sm mb-6 line-clamp-2">
              {blog.excerpt}
            </p>
          )}
          <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md text-white font-medium hover:bg-white/20 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
