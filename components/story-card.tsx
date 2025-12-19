import { Story } from '@/types/stories';
import Link from 'next/link';
import Image from 'next/image';

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const imageUrl = story.featured_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${story.featured_image.url}`
    : '';

  return (
    <article className="flex flex-col rounded-lg overflow-hidden border border-zinc-200 bg-white transition-shadow">
      {imageUrl && (
        <div className="relative w-full h-60">
          <Image
            src={imageUrl}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          />
        </div>
      )}

      <div className="flex flex-col bg-zinc-50 grow p-6">
        <h2 className="text-xl font-bold text-zinc-900 line-clamp-1 mb-3">
          {story.title}
        </h2>
        {story.excerpt && (
          <p className="text-sm text-zinc-600 mb-6 line-clamp-2 grow">
            {story.excerpt}
          </p>
        )}
        <Link
          href={`/story/${story.slug}`}
          className="bg-zinc-100 line-clamp-1 truncate max-w-[70%] text-zinc-800 font-medium rounded-lg px-6 py-3 text-sm hover:bg-zinc-200  transition text-center"
          aria-label={`Read full story: ${story.title}`}
        >
          Read Full Story
        </Link>
      </div>
    </article>
  );
};

export default StoryCard;
