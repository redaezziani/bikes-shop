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
        <section className="w-full px-6 md:px-12 py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            {/* Render Markdown Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }: any) => (
                    <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 mt-12 mb-4 first:mt-0" {...props} />
                  ),
                  h3: ({ node, ...props }: any) => (
                    <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 mt-8 mb-3" {...props} />
                  ),
                  p: ({ node, ...props }: any) => (
                    <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-4" {...props} />
                  ),
                  ul: ({ node, ...props }: any) => (
                    <ul className="space-y-2 mb-6" {...props} />
                  ),
                  li: ({ node, ...props }: any) => (
                    <li className="text-base md:text-lg text-zinc-600 ml-6 pl-2" {...props} />
                  ),
                  strong: ({ node, ...props }: any) => (
                    <strong className="font-semibold text-zinc-900" {...props} />
                  ),
                  em: ({ node, ...props }: any) => (
                    <em className="italic text-zinc-500 text-sm" {...props} />
                  ),
                  a: ({ node, ...props }: any) => (
                    <a className="text-zinc-900 underline hover:text-zinc-600 transition" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t border-zinc-200">
              <Link href="/contact" className="flex-1">
                <button className="w-full bg-zinc-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-zinc-800 transition">
                  Contact Us
                </button>
              </Link>
              <a href="#find-partner" className="flex-1">
                <button className="w-full border border-zinc-900 text-zinc-900 font-medium px-6 py-3 rounded-lg hover:bg-zinc-50 transition">
                  Find Service Partner
                </button>
              </a>
              <Link href="/warranty-policy" className="flex-1">
                <button className="w-full border border-zinc-300 text-zinc-700 font-medium px-6 py-3 rounded-lg hover:bg-zinc-50 transition">
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
