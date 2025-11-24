'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductsSlider = () => {
  const products = [
    {
      id: 1,
      name: 'Model 1',
      subtitle: 'As Low as 1.99% APR Available',
      image:
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    },
    {
      id: 2,
      name: 'Model 2',
      subtitle: 'As Low as 1.99% APR Available',
      image:
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    },
    {
      id: 3,
      name: 'Model 3',
      subtitle: 'As Low as 1.99% APR Available',
      image:
        'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
    },
    {
      id: 4,
      name: 'Model 4',
      subtitle: 'As Low as 1.99% APR Available',
      image:
        'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800&q=80',
    },
    {
      id: 5,
      name: 'Model 5',
      subtitle: 'As Low as 1.99% APR Available',
      image:
        'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800&q=80',
    },
  ];

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
            <div className="relative rounded-lg overflow-hidden h-[500px] bg-gradient-to-b from-gray-200 to-gray-300">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-4xl font-bold ">{product.name}</h3>
                <p className="text-sm mb-6 font-semibold underline">
                  {product.subtitle}
                </p>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white rounded px-4 py-2.5 font-bold text-sm">
                    Order Now
                  </button>
                  <button className="flex-1 bg-white text-gray-800 rounded px-4 py-2.5 font-bold text-sm">
                    Learn More
                  </button>
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

export default ProductsSlider;
