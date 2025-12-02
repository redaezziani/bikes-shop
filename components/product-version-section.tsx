'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useSectionTwo } from '@/store/section-two';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductVersionSection = () => {
  const { data, isLoading } = useSectionTwo({ pageSize: 10 });

  if (isLoading) {
    return (
      <section className="w-full pl-4">
        <div className="flex gap-4 overflow-hidden px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[85%] h-[500px] bg-zinc-200 animate-pulse rounded-lg"
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

  return (
    <section className="w-full pl-4">
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1.2}
        centeredSlides={false}
        pagination={{ clickable: true }}
        className="px-4"
      >
        {sections.map((section) => (
          <SwiperSlide key={section.id}>
            <div className="relative rounded-lg overflow-hidden h-[500px] bg-gradient-to-b bg-zinc-300">
              {section.cover_image?.url && (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${section.cover_image.url}`}
                    alt={section.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                </>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl capitalize font-bold">
                  {section.title}
                </h3>
                <p className="text-sm mt-1 line-clamp-2 lowercase  mb-6 ">
                  {section.description}
                </p>
                <div className="flex gap-3">
                  <Link href={getLinkHref(section)}>
                    <button className="bg-white min-w-40 text-gray-900 font-medium rounded-lg px-4 py-2 text-sm hover:bg-gray-100 transition">
                      {section.product
                        ? `${section.product.name} Details`
                        : 'Learn More'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
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
  );
};
export default ProductVersionSection;
