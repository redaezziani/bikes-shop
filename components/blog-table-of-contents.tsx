'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  content: string;
}

const BlogTableOfContents = ({ content }: BlogTableOfContentsProps) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const extractHeadings = () => {
      const headingRegex = /^(#{2,3})\s+(.+)$/gm;
      const matches = [...content.matchAll(headingRegex)];

      const tocItems: TOCItem[] = matches.map((match, index) => {
        const level = match[1].length;
        const text = match[2].trim();
        const id = `heading-${index}`;

        return { id, text, level };
      });

      setHeadings(tocItems);
    };

    extractHeadings();
  }, [content]);

  useEffect(() => {
    // Track scroll position and highlight active heading
    const handleScroll = () => {
      const headingElements = headings.map(h =>
        document.getElementById(h.id)
      ).filter(Boolean);

      let current = '';

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = element.id;
            break;
          }
        }
      }

      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="w-full mb-8 lg:w-64 lg:mb-0">
      <div className="lg:sticky lg:top-24">
        <div className="bg-white border border-zinc-200 rounded-lg p-6">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide mb-4">
            Table of Contents
          </h3>

          <nav>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ paddingLeft: heading.level === 3 ? '1rem' : '0' }}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHeading(heading.id);
                    }}
                    className={`block text-left text-sm transition-colors duration-200 hover:text-zinc-900 ${
                      activeId === heading.id
                        ? 'text-zinc-900 font-semibold'
                        : 'text-zinc-600'
                    }`}
                  >
                    <span className="line-clamp-2">{heading.text}</span>
                  </a>
                  {activeId === heading.id && (
                    <div className="h-0.5 bg-zinc-900 mt-1 w-8 rounded-full"></div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 pt-6 border-t border-zinc-200">
            <div className="flex items-start gap-3">
              <div className="bg-zinc-100 rounded-full p-2 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-zinc-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-900 mb-1">
                  Quick Navigation
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Click any heading to jump to that section
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-zinc-50 border border-zinc-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <p className="text-xs font-semibold text-zinc-900">Share Article</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="flex-1 bg-white border border-zinc-300 hover:bg-zinc-100 transition-colors rounded px-2 py-1.5 text-xs font-medium text-zinc-700"
              aria-label="Copy link"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlogTableOfContents;
