'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import Header from './header';
import { SectionOne } from '@/types/section-one';

interface HeroSliderProps {
  slides: SectionOne[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  if (slides.length === 0) {
    return (
      <div
        id="hero"
        className="w-full flex items-center flex-col h-170 lg:h-screen relative bg-zinc-400"
      >
        <Header />
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-white text-xl">No slides available</div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="hero"
      className="w-full flex items-center flex-col  h-130 lg:h-[80vh] relative bg-zinc-400"
    >
      <Header />
      <Swiper
        modules={[Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        loop={true}
        speed={800}
        className="h-full w-full"
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}',
        }}
      >
        {slides.map((slide) => {
          const desktopImageUrl = slide.cover_image_desktop?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.cover_image_desktop.url}`
            : '/images/placeholder-image.webp';
          const mobileImageUrl = slide.cover_image_mobile?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.cover_image_mobile.url}`
            : desktopImageUrl;
          const productSlug = slide.product?.slug;
          const productName = slide.product?.name;

          return (
            <SwiperSlide key={slide.id}>
              <div className="h-full px-4 z-10  relative w-full flex justify-start items-start md:justify-center">
                {/* Mobile Image */}
                <Image
                  src={mobileImageUrl}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  priority={slide.id === slides[0]?.id}
                  fetchPriority={slide.id === slides[0]?.id ? 'high' : 'auto'}
                  quality={85}
                  className="object-cover md:hidden"
                />
                {/* Desktop Image */}
                <Image
                  src={desktopImageUrl}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  priority={slide.id === slides[0]?.id}
                  fetchPriority={slide.id === slides[0]?.id ? 'high' : 'auto'}
                  quality={85}
                  className="object-cover hidden md:block"
                />
                <div className="flex relative mt-20 md:mt-40 z-30 justify-center items-center text-center flex-col w-full gap-4 max-w-3xl">
                  <h1 className=" text-lg md:text-4xl capitalize  text-white font-bold leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <div className="flex w-full justify-center items-center gap-2">
                    {productSlug && productName ? (
                      <Link href={`/models/${productSlug}`}>
                        <button
                          className="bg-white min-w-40 text-gray-900 font-medium rounded-lg px-4 py-2.5 text-sm hover:bg-gray-100 transition"
                          aria-label={`Discover ${productName}`}
                        >
                          <p className=" line-clamp-1">
                            {slide.button_text || `Discover ${productName}`}
                          </p>
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="bg-white w-44 hover:bg-zinc-100 text-zinc-800 rounded-lg px-6 py-2.5 sm:px-8 sm:py-3 capitalize font-bold text-xs sm:text-sm lg:text-base transition-colors shadow-lg"
                        aria-label="Learn more"
                      >
                        {slide.button_text || 'learn more'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
