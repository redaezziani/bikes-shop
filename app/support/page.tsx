'use client';

import { useState, useEffect } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import Footer from '@/components/footer';
import Breadcrumbs from '@/components/breadcrumbs';
import { getSupportData } from '@/lib/support-service';
import HeaderDetailsPage from '@/components/header-v2';
import { FAQCategory, FAQ } from '@/types/support';
import FixedBottomChatBot from '@/components/fixed-bottom-chat-bot';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';

export default function SupportPage() {
  const searchParams = useSearchParams();
  const [pageData, setPageData] = useState<any>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getSupportData();
      setPageData(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

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

  const { title, description, categories } = pageData;

  // Filter categories and FAQs based on search query
  const filteredCategories =
    categories
      ?.map((category: FAQCategory) => {
        const filteredFAQs = category.faqs.filter(
          (faq: FAQ) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        return { ...category, faqs: filteredFAQs };
      })
      .filter((category: FAQCategory) => category.faqs.length > 0) || [];

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

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
              <p className="text-white/90 text-sm font-medium mb-3">Support</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Top questions about Bikes Shop
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Need something cleared up? Here are our most frequently asked
                questions.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="w-full bg-white px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              {/* Sidebar */}
              <aside className="md:col-span-4">
                <div className="md:sticky md:top-8">
                  {filteredCategories.map(
                    (category: FAQCategory, index: number) => (
                      <div
                        key={category.id}
                        className={index > 0 ? 'mt-5' : ''}
                      >
                        <h2 className="text-md md:text-lg font-bold text-zinc-700 ">
                          {category.name}
                        </h2>
                        {category.description && (
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            {category.description}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </aside>

              {/* FAQ List */}
              <div className="md:col-span-8">
                {filteredCategories.length > 0 ? (
                  <div className="space-y-8">
                    {filteredCategories.map((category: FAQCategory) => (
                      <div key={category.id} id={`category-${category.id}`}>
                        <div className="space-y-0 border-t border-zinc-200">
                          {category.faqs.map((faq: FAQ) => {
                            const faqId = `${category.id}-${faq.id}`;
                            return (
                              <div
                                key={faq.id}
                                className="border-b border-zinc-200 last:border-b-0"
                              >
                                <button
                                  onClick={() => toggleFAQ(faqId)}
                                  className="w-full flex items-center justify-between py-5 text-left hover:opacity-70 transition-opacity"
                                  aria-expanded={openFAQ === faqId}
                                  aria-controls={`faq-answer-${faqId}`}
                                >
                                  <h3 className="text-base md:text-lg font-semibold text-zinc-800 pr-8">
                                    {faq.question}
                                  </h3>
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-zinc-900 flex items-center justify-center">
                                    {openFAQ === faqId ? (
                                      <svg
                                        className="w-3 h-3 text-zinc-900"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2.5}
                                          d="M6 12h12"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        className="w-3 h-3 text-zinc-900"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2.5}
                                          d="M12 6v12m6-6H6"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                </button>

                                {openFAQ === faqId && (
                                  <div
                                    id={`faq-answer-${faqId}`}
                                    className="pb-5 animate-slideDown"
                                  >
                                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed pr-10">
                                      {faq.answer}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg font-semibold text-zinc-900 mb-2">
                      No results found for &quot;{searchQuery}&quot;
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-zinc-900 underline hover:no-underline transition"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full bg-zinc-50 px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
              Still have questions?
            </h2>
            <p className="text-base md:text-lg text-zinc-600 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Please chat to
              our friendly team.
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-block bg-zinc-900 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-zinc-700 transition"
            >
              Get in touch
            </button>
          </div>
        </section>
        <FixedBottomChatBot />
        <Footer />
      </main>

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

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
