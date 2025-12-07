import { Blog } from '@/types/blogs';
import Link from 'next/link';
import BlogTableOfContents from './blog-table-of-contents';
import BlogMarkdownContent from './blog-markdown-content';

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
              ← Back to Blog
            </Link>

            {blog.category && (
              <span className="inline-block text-xs ml-5 font-semibold text-zinc-500 uppercase tracking-wide bg-zinc-100 px-3 py-1 rounded-full mb-4">
                {blog.category}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-zinc-600 text-sm">
              <span>{formattedDate}</span>
              <span className="text-zinc-300">•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>

          {blog.featured_image?.url && (
            <div className="mb-12 rounded-lg overflow-hidden bg-zinc-200 h-96 md:h-[500px]">
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.featured_image.url}`}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <BlogMarkdownContent content={blog.content} blogId={blog.id} />

          <div className="border-t border-zinc-200 pt-8">
            {blog.meta_description && (
              <p className="text-zinc-600 italic mb-6">
                <strong>Summary:</strong> {blog.meta_description}
              </p>
            )}

            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="text-zinc-800 hover:text-zinc-600 font-semibold"
              >
                ← Back to Blog
              </Link>
              {blog.category && (
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide bg-zinc-100 px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              )}
            </div>
          </div>
        </article>

        <div className="order-1 lg:order-2">
          <BlogTableOfContents content={blog.content} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
