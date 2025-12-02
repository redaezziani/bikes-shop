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
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-500" />
        )}

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/95" />

        {/* Content overlay - centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center">
          <h3 className="text-4xl font-semibold mb-2 text-black max-w-2xl px-4">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="text-neutral-700 text-base mb-6 max-w-xl px-4">
              {blog.excerpt}
            </p>
          )}
          <button className="px-16 py-2 bg-transparent border-[3px] border-black rounded-md text-black font-medium hover:bg-black hover:text-white transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
