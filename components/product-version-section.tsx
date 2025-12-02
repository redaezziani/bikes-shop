import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useSectionTwo } from '@/store/section-two';
import Link from 'next/link';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductVersionSection = () => {
  const { data, isLoading } = useSectionTwo({ pageSize: 10 });

  if (isLoading) {
    return (
      <section
        className="w-full pl-4"
        aria-label="Featured electric bikes"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex gap-4 overflow-hidden px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[85%] h-[500px] bg-zinc-200 animate-pulse rounded-lg"
              role="status"
              aria-label="Loading bike model"
            />
          ))}
        </div>
      </section>
    );
  }

  const sections = data?.data || [];

  const getLinkHref = (section: (typeof sections)[0]) => {
    if (section.external_link) {
      return section.external_link;
    }
    if (section.product?.slug) {
      return `/models/${section.product.slug}`;
    }
    return '#';
  };

  const isExternalLink = (section: (typeof sections)[0]) => {
    return section.external_link && !section.external_link.startsWith('/');
  };

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: sections.map((section, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: section.product?.name || section.title,
        description: section.description,
        image: section.cover_image?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${section.cover_image.url}`
          : undefined,
        url: section.product?.slug
          ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}/models/${
              section.product.slug
            }`
          : undefined,
      },
    })),
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        className="w-full pl-4"
        aria-label="Featured electric bike models"
      >
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={false}
          pagination={{ clickable: true }}
          className="px-4"
          a11y={{
            enabled: true,
            prevSlideMessage: 'Previous bike model',
            nextSlideMessage: 'Next bike model',
            firstSlideMessage: 'This is the first bike model',
            lastSlideMessage: 'This is the last bike model',
            paginationBulletMessage: 'Go to bike model {{index}}',
          }}
        >
          {sections.map((section, index) => {
            const linkHref = getLinkHref(section);
            const isExternal = isExternalLink(section);
            const productName = section.product?.name || section.title;
            const imageUrl = section.cover_image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${section.cover_image.url}`
              : '';

            return (
              <SwiperSlide key={section.id}>
                <article className="relative rounded-lg overflow-hidden h-[500px] bg-zinc-300">
                  {imageUrl && (
                    <>
                      <Image
                        src={imageUrl}
                        alt={`${productName} - ${
                          section.description || 'electric bike model'
                        }`}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"
                        aria-hidden="true"
                      ></div>
                    </>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="text-sm mt-1 line-clamp-2 mb-6">
                      {section.description}
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href={linkHref}
                        aria-label={
                          section.product
                            ? `View details about ${productName}`
                            : `Learn more about ${section.title}`
                        }
                        {...(isExternal && {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        })}
                      >
                        <button
                          className="bg-white min-w-40 text-gray-900 font-medium rounded-lg px-4 py-2 text-sm hover:bg-gray-100 transition"
                          aria-label={
                            section.product
                              ? `View ${productName} specifications and pricing`
                              : 'Learn more'
                          }
                        >
                          {section.product
                            ? `${productName} Details`
                            : 'Learn More'}
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <style jsx global>{`
          .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
          }
          .swiper-pagination-bullet {
            background: #9ca3af;
            opacity: 1;
            width: 8px;
            height: 8px;
          }
          .swiper-pagination-bullet-active {
            background: #1f2937;
          }
        `}</style>
      </section>
    </>
  );
};

export default ProductVersionSection;
