'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useMemo } from 'react';

interface BlogMarkdownContentProps {
  content: string;
  blogId: string | number;
}

const BlogMarkdownContent = ({ content, blogId }: BlogMarkdownContentProps) => {
  const createHeadingIdGenerator = () => {
    let counter = 0;
    return () => `heading-${counter++}`;
  };

  const markdownComponents = useMemo(() => {
    const getHeadingId = createHeadingIdGenerator();

    return {
      h2: ({ node, ...props }: any) => {
        const id = getHeadingId();
        return (
          <h2
            id={id}
            className="text-base font-bold text-zinc-900 mt-8 mb-4 scroll-mt-24"
            {...props}
          />
        );
      },
      h3: ({ node, ...props }: any) => {
        const id = getHeadingId();
        return (
          <h3
            id={id}
            className="text-sm font-bold text-zinc-900 mt-6 mb-3 scroll-mt-24"
            {...props}
          />
        );
      },
      p: ({ node, ...props }: any) => (
        <p className="text-sm text-zinc-700 leading-6 mb-5" {...props} />
      ),
      ul: ({ node, ...props }: any) => (
        <ul
          className="list-disc list-inside text-sm text-zinc-700 mb-6 space-y-2"
          {...props}
        />
      ),
      ol: ({ node, ...props }: any) => (
        <ol
          className="list-decimal list-inside text-sm text-zinc-700 mb-6 space-y-2"
          {...props}
        />
      ),
      li: ({ node, ...props }: any) => (
        <li className="text-sm text-zinc-700" {...props} />
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
      iframe: ({ node, ...props }: any) => (
        <div className="relative w-full my-6 rounded-lg overflow-hidden border border-zinc-200" style={{ paddingBottom: props.height ? undefined : '56.25%' }}>
          <iframe
            {...props}
            className="w-full rounded-lg"
            style={{ height: props.height || '100%', position: props.height ? 'relative' : 'absolute', top: 0, left: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      ),
    };
  }, [blogId]);

  return (
    <div className="prose prose-zinc max-w-none mb-12">
      <ReactMarkdown components={markdownComponents} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogMarkdownContent;
