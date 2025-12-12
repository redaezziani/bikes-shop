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
    <article className="flex flex-col rounded-lg overflow-hidden border border-zinc-200 bg-white transition-shadow">
      {imageUrl && (
        <div className="relative w-full h-[240px]">
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
        </div>
      )}

      <div className="flex flex-col bg-zinc-50 flex-grow p-6">
        <h2 className="text-xl font-bold text-zinc-900 mb-3">{blog.title}</h2>
        {blog.excerpt && (
          <p className="text-sm text-zinc-600 mb-6 line-clamp-3 flex-grow">
            {blog.excerpt}
          </p>
        )}
        <Link
          href={`/blog/${blog.slug}`}
          className="bg-zinc-100 max-w-[70%] text-zinc-800 font-medium rounded-lg px-6 py-3 text-sm hover:bg-zinc-800 hover:text-white transition text-center"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
