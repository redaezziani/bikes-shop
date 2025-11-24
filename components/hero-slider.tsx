'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Header from './header';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: 'Ride Smarter. Live Better.',
      image: 'https://gocycle.com/wp-content/uploads/2022/01/intro4_mob.jpg',
    },
    {
      id: 2,
      title: 'Experience Ultimate Freedom',
      image:
        'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800&q=80',
    },
    {
      id: 3,
      title: 'Journey Into Tomorrow',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
  ];

  return (
    <div className="w-full h-144 relative bg-neutral-400">
      <Header />
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="h-full px-4 relative w-full flex justify-center items-center">
              <div className="flex -mt-80 relative z-10 justify-center items-center text-center flex-col w-full gap-2">
                <h1 className="text-3xl text-white font-bold">{slide.title}</h1>
                <div className="flex w-full gap-2">
                  <button className="bg-blue-600 w-full text-white rounded px-3 py-2.5 capitalize font-bold text-sm">
                    order now
                  </button>
                  <button className="bg-white w-full text-neutral-800 rounded px-3 py-2.5 capitalize font-bold text-sm">
                    learn more
                  </button>
                </div>
              </div>
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full absolute top-0 left-0 object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
          position: absolute !important;
          z-index: 50 !important;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5 !important;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: white !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
