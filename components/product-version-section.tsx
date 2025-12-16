'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { SectionTwo } from '@/types/section-two';
import Link from 'next/link';
import Image from 'next/image';


interface ProductVersionSectionProps {
  sections: SectionTwo[];
}

const ProductVersionSection = ({ sections }: ProductVersionSectionProps) => {

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
        image: section.cover_image_desktop?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${section.cover_image_desktop.url}`
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
        className="w-full pl-4 py-8"
        aria-label="Featured electric bike models"
      >
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          centeredSlides={false}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          className="product-version-swiper"
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
            const desktopImageUrl = section.cover_image_desktop?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${section.cover_image_desktop.url}`
              : '';
            const mobileImageUrl = section.cover_image_mobile?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${section.cover_image_mobile.url}`
              : desktopImageUrl;

            return (
              <SwiperSlide key={section.id}>
                <article className="relative select-none rounded-lg overflow-hidden h-[500px] bg-zinc-300">
                  {(desktopImageUrl || mobileImageUrl) && (
                    <>
                      {/* Mobile Image */}
                      {mobileImageUrl && (
                        <Image
                          src={mobileImageUrl}
                          alt={`${productName} - ${
                            section.description || 'electric bike model'
                          }`}
                          fill
                          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover md:hidden"
                          priority={index === 0}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          quality={85}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        />
                      )}
                      {/* Desktop Image */}
                      {desktopImageUrl && (
                        <Image
                          src={desktopImageUrl}
                          alt={`${productName} - ${
                            section.description || 'electric bike model'
                          }`}
                          fill
                          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover hidden md:block"
                          priority={index === 0}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          quality={85}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        />
                      )}
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
                          {section.button_text ||
                            (section.product
                              ? `${productName} Details`
                              : 'Learn More')}
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        
      </section>
    </>
  );
};

export default ProductVersionSection;
