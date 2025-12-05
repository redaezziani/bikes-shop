'use client';

import { Blog } from '@/types/blogs';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
 

  const imageUrl = blog.featured_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.featured_image.url}`
    : '';

  return (
    <Link href={`/blog/${blog.slug}`}>
      <article className="relative rounded-lg overflow-hidden h-[500px] bg-zinc-300">
        {imageUrl && (
          <>
            <Image
              src={imageUrl}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"
              aria-hidden="true"
            ></div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          {blog.excerpt && (
            <p className="text-sm mt-1 line-clamp-2 mb-6">{blog.excerpt}</p>
          )}
          <div className="flex gap-3">
            <button
              className="bg-white min-w-40 text-gray-900 font-medium rounded-lg px-4 py-2 text-sm hover:bg-gray-100 transition"
              aria-label={`Read more about ${blog.title}`}
            >
              Read More
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
