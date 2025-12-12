import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PartnersSearch from '@/components/partners-search';
import ContactForm from '@/components/contact-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { getAlongCarePageData } from '@/lib/along-care-service';
import { getPartnersData } from '@/lib/partners-service';
import HeaderDetailsPage from '@/components/header-v2';

export const dynamic = 'force-dynamic';

export default async function AlongCarePage() {
  const [pageData, partnersData] = await Promise.all([
    getAlongCarePageData(),
    getPartnersData({ pageSize: 100 }),
  ]);

  const { title, description, content } = pageData.data;
  const partners = partnersData.data;

  return (
    <>
      <HeaderDetailsPage />
      <main className="flex flex-col w-full bg-white items-center">
        <section className="w-full px-6 md:px-12 py-10  bg-white">
          <div className="max-w-4xl ">
            <Breadcrumbs className="py-8" />
            <div className="">
              <h1 className="text-3xl md:text-6xl font-bold text-zinc-900 mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-md md:text-2xl text-zinc-600 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="w-full px-6 md:px-12 py-16 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }: any) => (
                    <h2
                      className="text-xl md:text-2xl font-semibold text-zinc-900 mt-10 mb-3 first:mt-0"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }: any) => (
                    <h3
                      className="text-lg md:text-xl font-semibold text-zinc-900 mt-6 mb-2"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }: any) => (
                    <p
                      className="text-sm md:text-base text-zinc-600 leading-relaxed mb-3"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }: any) => (
                    <ul className="space-y-1.5 mb-4" {...props} />
                  ),
                  li: ({ node, ...props }: any) => (
                    <li
                      className="text-sm md:text-base text-zinc-600 ml-6 pl-2"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }: any) => (
                    <strong
                      className="font-semibold text-zinc-900"
                      {...props}
                    />
                  ),
                  em: ({ node, ...props }: any) => (
                    <em className="italic text-zinc-500 text-xs" {...props} />
                  ),
                  a: ({ node, ...props }: any) => (
                    <a
                      className="text-zinc-900 underline hover:text-zinc-600 transition"
                      {...props}
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {/* CTA Buttons */}
            <div className="mt-16 pt-8 border-t border-zinc-200">
              <Link href="/warranty-policy" className="block">
                <button className="w-full bg-white text-zinc-900 border border-zinc-900 font-medium px-8 py-3 rounded-lg hover:bg-zinc-50 transition">
                  Warranty Policy
                </button>
              </Link>
            </div>
          </div>
        </section>
        <PartnersSearch partners={partners} />
        <Footer />
      </main>
    </>
  );
}
