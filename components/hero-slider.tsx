'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Header from './header';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: 'Ride Smarter. Live Better.',
      image:
        'https://images.pon.bike/_sb/f/249415/1577x1051/1d432e81fd/250217_gazelle_3949_argb_low.jpg/m/785x588/filters:quality(70)',
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
    <div
      id="hero"
      className="w-full h-72 sm:h-96 lg:h-screen relative bg-zinc-400"
    >
      <Header />
      <Swiper
        modules={[Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}',
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="h-full px-4  relative w-full flex justify-center items-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full absolute top-0 left-0 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 z-5" />
              <div className="flex  relative z-10 justify-center items-center text-center flex-col w-full gap-4 max-w-3xl">
                <h1 className="text-xl sm:text-3xl lg:text-5xl text-white font-bold leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <div className="flex w-full justify-center items-center gap-2">
                  <button
                    className="bg-white hover:bg-zinc-100 text-zinc-800 rounded-lg px-6 py-2.5 sm:px-8 sm:py-3 capitalize font-bold text-xs sm:text-sm lg:text-base transition-colors shadow-lg"
                    aria-label="Learn more about our electric bikes"
                  >
                    learn more
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        #hero .swiper-pagination {
          bottom: 20px !important;
          position: absolute !important;
          z-index: 50 !important;
        }
        #hero .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5 !important;
          width: 8px;
          height: 8px;
        }
        #hero .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: white !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
