'use client';

import ReactMarkdown from 'react-markdown';
import { useMemo } from 'react';

interface StoryMarkdownContentProps {
  content: string;
  storyId: string | number;
}

const StoryMarkdownContent = ({ content, storyId }: StoryMarkdownContentProps) => {
  // Create a counter closure to generate unique IDs during render
  const createHeadingIdGenerator = () => {
    let counter = 0;
    return () => `heading-${counter++}`;
  };

  // Memoize the markdown components to prevent re-creating them on every render
  const markdownComponents = useMemo(() => {
    const getHeadingId = createHeadingIdGenerator();

    return {
      h2: ({ node, ...props }: any) => {
        const id = getHeadingId();
        return (
          <h2
            id={id}
            className="text-lg font-bold text-zinc-900 mt-8 mb-4 scroll-mt-24"
            {...props}
          />
        );
      },
      h3: ({ node, ...props }: any) => {
        const id = getHeadingId();
        return (
          <h3
            id={id}
            className="text-base font-bold text-zinc-900 mt-6 mb-3 scroll-mt-24"
            {...props}
          />
        );
      },
      p: ({ node, ...props }: any) => (
        <p className="text-zinc-700 leading-7 mb-6" {...props} />
      ),
      ul: ({ node, ...props }: any) => (
        <ul
          className="list-disc list-inside text-zinc-700 mb-6 space-y-2"
          {...props}
        />
      ),
      ol: ({ node, ...props }: any) => (
        <ol
          className="list-decimal list-inside text-zinc-700 mb-6 space-y-2"
          {...props}
        />
      ),
      li: ({ node, ...props }: any) => (
        <li className="text-zinc-700" {...props} />
      ),
      blockquote: ({ node, ...props }: any) => (
        <blockquote
          className="border-l-4 border-zinc-300 pl-4 py-2 my-6 italic text-zinc-600 bg-zinc-50 p-4"
          {...props}
        />
      ),
      a: ({ node, ...props }: any) => (
        <a
          className="text-blue-600 hover:text-blue-800 underline"
          {...props}
        />
      ),
      img: ({ node, ...props }: any) => (
        <img className="rounded-lg my-6 w-full" {...props} />
      ),
    };
  }, [storyId]);

  return (
    <div className="prose prose-zinc max-w-none mb-12">
      <ReactMarkdown components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default StoryMarkdownContent;
