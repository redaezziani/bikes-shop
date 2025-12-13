'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/footer';
import PartnersSearch from '@/components/partners-search';
import Breadcrumbs from '@/components/breadcrumbs';
import { getAlongCarePageData } from '@/lib/along-care-service';
import { getPartnersData } from '@/lib/partners-service';
import HeaderDetailsPage from '@/components/header-v2';

export default function AlongCarePage() {
  const [pageData, setPageData] = useState<any>(null);
  const [partners, setPartners] = useState<any[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [pageResult, partnersResult] = await Promise.all([
        getAlongCarePageData(),
        getPartnersData({ pageSize: 100 }),
      ]);
      setPageData(pageResult.data);
      setPartners(partnersResult.data);
    }
    fetchData();
  }, []);

  if (!pageData) {
    return (
      <main className="flex flex-col min-h-screen gap-4 justify-center items-center">
        <span className="flex gap-1 justify-center items-center">
          <div className="w-3 h-3 border-2 border-white/30 border-t-black rounded-full animate-spin" />
          Loading...
        </span>
      </main>
    );
  }

  const { title, description, content } = pageData;

  return (
    <>
      <HeaderDetailsPage />
      <main className="flex flex-col w-full bg-white items-center">
        <section className="w-full px-6 md:px-12 py-10  bg-white">
          <div className="max-w-3xl mx-auto">
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
            <div className="mt-16 pt-8 border-t border-zinc-200 space-y-4">
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-white text-zinc-900 border border-zinc-900 font-medium px-8 py-3 rounded-lg hover:bg-zinc-50 transition"
              >
                Contact Us
              </button>

              <Link href="/warranty-policy" className="block">
                <button className="w-full bg-white text-zinc-900 border border-zinc-900 font-medium px-8 py-3 rounded-lg hover:bg-zinc-50 transition">
                  Warranty Policy
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowContactForm(false)}
          >
            <div
              className="bg-white rounded-lg w-full max-w-2xl my-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-zinc-200 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-semibold text-zinc-900">
                  Contact Us
                </h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-zinc-500 hover:text-zinc-700 text-2xl leading-none"
                  aria-label="Close contact form"
                >
                  &times;
                </button>
              </div>
              <div className="relative">
                <iframe
                  src="https://serv.weridealong.com/widget/form/aYVTWBZRh8H9lEd0Q491"
                  className="w-full border-none"
                  id="inline-aYVTWBZRh8H9lEd0Q491"
                  style={{ height: '600px' }}
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Contact Form Website"
                  data-height="1014"
                  data-layout-iframe-id="inline-aYVTWBZRh8H9lEd0Q491"
                  data-form-id="aYVTWBZRh8H9lEd0Q491"
                  title="Contact Form Website"
                />
              </div>
            </div>
            <Script
              src="https://serv.weridealong.com/js/form_embed.js"
              strategy="lazyOnload"
            />
          </div>
        )}

        <PartnersSearch partners={partners} />
        <Footer />
      </main>
    </>
  );
}
