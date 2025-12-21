import { Blog } from '@/types/blogs';
import Link from 'next/link';
import Image from 'next/image';
import BlogTableOfContents from './blog-table-of-contents';
import BlogMarkdownContent from './blog-markdown-content';
import { IconChevronLeft } from '@tabler/icons-react';

interface BlogPostDetailProps {
  blog: Blog | null;
  isLoading: boolean;
}

const BlogPostDetail = ({ blog, isLoading }: BlogPostDetailProps) => {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 order-1 lg:order-2">
            <div className="h-64 bg-zinc-200 animate-pulse rounded"></div>
          </div>
          <div className="flex-1 lg:max-w-3xl order-2 lg:order-1">
            <div className="h-8 w-64 bg-zinc-200 animate-pulse rounded mb-4"></div>
            <div className="h-6 w-32 bg-zinc-200 animate-pulse rounded mb-8"></div>
            <div className="h-96 w-full bg-zinc-200 animate-pulse rounded mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-zinc-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">
          Blog post not found
        </h1>
        <Link
          href="/blog"
          className="text-zinc-800 hover:text-zinc-600 font-semibold"
        >
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 lg:max-w-3xl order-2 lg:order-1">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-zinc-600 hover:text-zinc-900 text-sm font-semibold mb-6 inline-block"
            >
              <IconChevronLeft className="inline-block mr-1" size={16} />
              Back
            </Link>

            <h1 className="text-2xl md:text-5xl font-bold text-zinc-900 mb-4">
              {blog.title}
            </h1>
          </div>

          {blog.featured_image?.url && (
            <div className="relative mb-12 rounded-lg overflow-hidden bg-zinc-200 h-96 md:h-[500px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.featured_image.url}`}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority
                quality={90}
              />
            </div>
          )}

          <div className="border-t border-zinc-200 pt-8">
            <BlogMarkdownContent blogId={blog.id} content={blog.content} />

            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="text-zinc-800 hover:text-zinc-600 font-semibold"
              >
                <IconChevronLeft className="inline-block mr-1" size={16} />
                Back
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostDetail;
