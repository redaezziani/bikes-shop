'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import { SectionOne } from '@/types/section-one';
import { toModelSlides } from './models-desktop-slider';

interface ModelsMobileSliderProps {
  slides: SectionOne[];
}

const ModelsMobileSlider = ({ slides }: ModelsMobileSliderProps) => {
  const models = toModelSlides(slides);
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  if (!models.length) return null;

  return (
    <div className="w-full flex flex-col lg:hidden mt-32 gap-6 py-6">
      {/* Tab pills — model names */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 bg-white rounded-full border border-zinc-400/35 px-2 py-2">
          {models.map((model, i) => (
            <button
              key={model.id}
              onClick={() => {
                setActiveTab(i);
                swiperRef.current?.slideTo(i);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                i === activeTab
                  ? 'bg-black text-white'
                  : 'text-black bg-transparent'
              }`}
            >
              {model.title}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper */}
      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          centeredSlides={true}
          pagination={{ clickable: true }}
          className="!pb-10"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        >
          {models.map((model) => (
            <SwiperSlide key={model.id}>
              <div className="flex flex-col gap-5 text-center px-4">
                <span className="w-full rounded-2xl bg-zinc-300 aspect-video overflow-hidden block">
                  {model.videoUrl && (
                    <video
                      src={model.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </span>

                {model.description && (
                  <p className="text-sm text-black leading-relaxed">
                    {model.description}
                  </p>
                )}

                <div className="flex justify-center items-center gap-8">
                  {model.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="capitalize underline underline-offset-4 font-semibold text-sm text-black"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ModelsMobileSlider;
