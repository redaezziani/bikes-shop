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
    <section className="w-full pl-4">
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
            <div className="relative rounded-lg overflow-hidden h-[500px] bg-gradient-to-b bg-neutral-300">
              {product.cover_image?.url && (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product.cover_image.url}`}
                    alt={`dubai-famly-cargo-${product.name}`}
                    className="object-cover"
                    sizes="(max-width: 768px) 85vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-4xl font-bold">{product.name}</h3>
                <p className="text-sm mb-6 font-semibold">
                  Starting at ${product.price.toLocaleString()}
                </p>
                <div className="flex gap-3">
                  <Link href={`/models/${product.slug}`}>
                    <button className="bg-white w-40 text-gray-800 rounded px-4 py-2.5 font-bold text-sm hover:bg-gray-100 transition">
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
