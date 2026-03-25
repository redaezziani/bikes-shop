import { Blog } from '@/types/blogs';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  blog: Blog;
  priority?: boolean;
}

const BlogCard = ({ blog, priority = false }: BlogCardProps) => {
  const imageUrl = blog.featured_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.featured_image.url}`
    : '';

  return (
    <article className="flex flex-col rounded-lg overflow-hidden border border-zinc-200 bg-white transition-shadow">
      {imageUrl && (
        <div className="relative w-full h-60">
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            quality={85}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            placeholder={blog.blurDataURL ? 'blur' : 'empty'}
            {...(blog.blurDataURL && { blurDataURL: blog.blurDataURL })}
          />
        </div>
      )}

      <div className="flex flex-col bg-zinc-50 grow p-6">
        <h2 className="text-xl font-bold text-zinc-900 line-clamp-1 mb-3">
          {blog.title}
        </h2>
        {blog.excerpt && (
          <p className="text-sm text-zinc-600 mb-6 line-clamp-2 grow">
            {blog.excerpt}
          </p>
        )}
        <Link
          href={`/blog/${blog.slug}`}
          className="bg-zinc-100 line-clamp-1 truncate max-w-[70%] text-zinc-800 font-medium rounded-lg px-6 py-3 text-sm hover:bg-zinc-200  transition text-center"
          aria-label={`Read full article: ${blog.title}`}
        >
          Learn More
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
