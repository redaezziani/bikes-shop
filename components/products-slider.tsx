'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useProducts } from '@/store/products';
import Link from 'next/link';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductsSlider = () => {
  const { data, isLoading } = useProducts({ pageSize: 10 });

  if (isLoading) {
    return (
      <section className="w-full pl-4">
        <div className="flex gap-4 overflow-hidden px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[85%] h-[500px] bg-neutral-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  const products = data?.data || [];

  return (
    <section className="w-full ">
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1.2}
        centeredSlides={false}
        pagination={{ clickable: true }}
        className="px-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative flex flex-col gap-2  overflow-hidden h-[500px]  ">
              {product.cover_image?.url && (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product.cover_image.url}`}
                    alt={product.name}
                    className="object-cover"
                    sizes="(max-width: 768px) 85vw, 400px"
                  />
                </>
              )}
              <div className="absolute bottom-0 flex flex-col gap-1.5 justify-start items-start left-0 right-0 p-6">
                <h3 className="text-xl text-neutral-800 font-bold">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-600  font-semibold">
                  Starting at ${product.price.toLocaleString()}
                </p>
                <p className="text-xs line-clamp-2 mb-6 text-neutral-500 ">
                  {product.short_description}
                </p>

                <div className="flex gap-3">
                  <Link href={`/models/${product.slug}`}>
                    <button className="cut-corner text-sm bg-neutral-900 text-white px-8 py-2.5 font-semibold hover:bg-neutral-900/90 shadow-lg">
                      Learn More
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
// simple

export default ProductsSlider;
