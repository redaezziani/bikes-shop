import { Story } from '@/types/stories';
import Link from 'next/link';
import Image from 'next/image';
import StoryTableOfContents from './story-table-of-contents';
import StoryMarkdownContent from './story-markdown-content';

interface StoryPostDetailProps {
  story: Story | null;
  isLoading: boolean;
}

const StoryPostDetail = ({ story, isLoading }: StoryPostDetailProps) => {
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

  if (!story) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">
          Story not found
        </h1>
        <Link
          href="/guides"
          className="text-zinc-800 hover:text-zinc-600 font-semibold"
        >
          ← Back to Guides
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(story.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readingTime = Math.ceil(story.content.split(' ').length / 200);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 lg:max-w-3xl order-2 lg:order-1">
          <div className="mb-8">
            <Link
              href="/guides"
              className="text-zinc-600 hover:text-zinc-900 text-sm font-semibold mb-6 inline-block"
            >
              ← Back to Guides
            </Link>

            {story.category && (
              <span className="inline-block text-xs ml-5 font-semibold text-zinc-500 uppercase tracking-wide bg-zinc-100 px-3 py-1 rounded-full mb-4">
                {story.category}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              {story.title}
            </h1>

            <div className="flex items-center gap-4 text-zinc-600 text-sm">
              <span>{formattedDate}</span>
              <span className="text-zinc-300">•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>

          {story.featured_image?.url && (
            <div className="relative mb-12 rounded-lg overflow-hidden bg-zinc-200 h-96 md:h-[500px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${story.featured_image.url}`}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority
                quality={90}
              />
            </div>
          )}

          <StoryMarkdownContent content={story.content} storyId={story.id} />

          <div className="border-t border-zinc-200 pt-8">
            {story.meta_description && (
              <p className="text-zinc-600 italic mb-6">
                <strong>Summary:</strong> {story.meta_description}
              </p>
            )}

            <div className="flex justify-between items-center">
              <Link
                href="/guides"
                className="text-zinc-800 hover:text-zinc-600 font-semibold"
              >
                ← Back to Guides
              </Link>
              {story.category && (
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide bg-zinc-100 px-3 py-1 rounded-full">
                  {story.category}
                </span>
              )}
            </div>
          </div>
        </article>

        <div className="order-1 lg:order-2">
          <StoryTableOfContents content={story.content} />
        </div>
      </div>
    </div>
  );
};

export default StoryPostDetail;
