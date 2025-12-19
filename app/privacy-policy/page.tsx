import ReactMarkdown from 'react-markdown';
import Footer from '@/components/footer';
import { getPrivacyPolicyPageData } from '@/lib/privacy-policy-service';
import HeaderDetailsPage from '@/components/header-v2';

export const dynamic = 'force-dynamic';

export default async function PrivacyPolicyPage() {
  const pageData = await getPrivacyPolicyPageData();

  const { title, description, content } = pageData.data;

  return (
    <>
      <HeaderDetailsPage />
      <main className="flex flex-col w-full bg-white">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-zinc-800 to-zinc-100 px-4 md:px-8 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />
          <div className="max-w-7xl mx-auto py-16 md:py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h1>
              {description && (
                <p className="text-white/90 text-lg mb-8">
                  {description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="w-full px-4 md:px-8 py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto">
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
