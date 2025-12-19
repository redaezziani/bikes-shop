'use client';

import { useStoryBySlug } from '@/store/stories';
import StoryPostDetail from '@/components/story-post-detail';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Story } from '@/types/stories';

interface StoryPostClientProps {
  slug: string;
  initialStory?: Story | null;
}

export default function StoryPostClient({ slug, initialStory }: StoryPostClientProps) {
  const { data: story, isLoading } = useStoryBySlug(slug);

  // Use initialStory if available, otherwise use data from hook
  const displayStory = story || initialStory;

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-zinc-900 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <Link
              href="/guides"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Guides
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white truncate">
              {displayStory?.title || 'Loading...'}
            </span>
          </div>
        </div>
      </div>

      <StoryPostDetail story={displayStory || null} isLoading={isLoading} />

      <Footer />
    </main>
  );
}
