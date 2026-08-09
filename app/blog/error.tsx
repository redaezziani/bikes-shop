'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog page error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-zinc-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Home
            </Link>
            <span className="text-zinc-600 mx-2">/</span>
            <span className="text-white">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        </div>
      </div>

      <section className="px-4 py-24 text-center">
        <p className="text-zinc-600 text-lg mb-6">
          We couldn&apos;t load blog posts right now. Please try again shortly.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
