import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PartnersSearch from '@/components/partners-search';
import { getAlongCarePageData } from '@/lib/along-care-service';
import { getPartnersData } from '@/lib/partners-service';

// Force dynamic rendering since we depend on external API
export const dynamic = 'force-dynamic';

export default async function AlongCarePage() {
  // Fetch data from the APIs
  const [pageData, partnersData] = await Promise.all([
    getAlongCarePageData(),
    getPartnersData({ pageSize: 100 }),
  ]);

  const { title, description, content } = pageData.data;
  const partners = partnersData.data;

  return (
    <>
      <Header />
      <main className="flex flex-col w-full bg-white items-center">
        {/* Hero Section */}
        <section className="w-full px-6 md:px-12 py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6">
              {title}
            </h1>
            {description && (
              <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </section>

        {/* Main Content Section */}
        <section className="w-full px-6 md:px-12 py-16 bg-zinc-50">
          <div className="max-w-4xl mx-auto">
            {/* Render Markdown Content */}
            <div className="prose prose-zinc max-w-none space-y-12">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }: any) => (
                    <div className="bg-white p-8 md:p-12 rounded-lg">
                      <h2 className="text-3xl font-bold text-zinc-900 mb-4" {...props} />
                    </div>
                  ),
                  h3: ({ node, ...props }: any) => (
                    <h3 className="text-2xl font-bold text-zinc-900 mb-3" {...props} />
                  ),
                  p: ({ node, ...props }: any) => (
                    <p className="text-lg text-zinc-700 leading-relaxed mb-4" {...props} />
                  ),
                  ul: ({ node, ...props }: any) => (
                    <ul className="list-disc list-inside text-zinc-700 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }: any) => (
                    <ol className="list-decimal list-inside text-zinc-700 mb-4 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }: any) => (
                    <li className="text-zinc-700" {...props} />
                  ),
                  blockquote: ({ node, ...props }: any) => (
                    <blockquote className="border-l-4 border-zinc-300 pl-4 py-2 my-6 italic text-zinc-600" {...props} />
                  ),
                  a: ({ node, ...props }: any) => (
                    <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Link href="/contact" className="flex-1">
                <button className="w-full bg-zinc-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-zinc-800 transition">
                  Contact Us
                </button>
              </Link>
              <a href="#find-partner" className="flex-1">
                <button className="w-full border border-zinc-900 text-zinc-900 font-medium px-6 py-3 rounded-xl hover:bg-zinc-50 transition">
                  Find Service Partner
                </button>
              </a>
              <Link href="/warranty-policy" className="flex-1">
                <button className="w-full border border-zinc-300 text-zinc-700 font-medium px-6 py-3 rounded-xl hover:bg-zinc-50 transition">
                  Warranty Policy
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Find Service Partner Section */}
        <PartnersSearch partners={partners} />

        <Footer />
      </main>
    </>
  );
}
