import ReactMarkdown from 'react-markdown';
import Footer from '@/components/footer';
import Breadcrumbs from '@/components/breadcrumbs';
import { getShippingReturnsPageData } from '@/lib/shipping-returns-service';
import HeaderDetailsPage from '@/components/header-v2';

export const dynamic = 'force-dynamic';

export default async function ShippingReturnsPage() {
  const pageData = await getShippingReturnsPageData();

  const { title, description, content } = pageData.data;

  return (
    <>
      <HeaderDetailsPage />
      <main className="flex flex-col px-4 md:px-0  w-full bg-white items-center">
        <section className=" w-full md:max-w-7xl   py-10 bg-white">
          <div className=" w-full">
            <Breadcrumbs className="py-8" />
            <div>
              <h1 className="text-3xl md:text-3xl font-bold text-zinc-700 mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-md md:text-lg text-zinc-400 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="w-full  py-16 bg-white">
          <div className=" max-w-7xl mx-auto">
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
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
