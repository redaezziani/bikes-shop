import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function BlogPostNotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">
          Blog post not found
        </h1>
        <p className="text-zinc-600 mb-8">
          The article you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>
        <Link
          href="/blog"
          className="text-zinc-800 hover:text-zinc-600 font-semibold"
        >
          ← Back to Guides
        </Link>
      </div>
      <Footer />
    </main>
  );
}
