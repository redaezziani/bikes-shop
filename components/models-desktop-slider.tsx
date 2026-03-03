'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';
import { SectionOne } from '@/types/section-one';
import '@/app/swiper-styles.css';

export interface ModelSlide {
  id: number | string;
  title: string;
  description?: string;
  videoUrl?: string;
  slug: string;
  links: { label: string; href: string }[];
}

export function toModelSlides(slides: SectionOne[]): ModelSlide[] {
  return slides.map((slide) => {
    const links =
      slide.products && slide.products.length > 0
        ? slide.products.map((p) => ({
            label: p.name,
            href: `/models/${p.slug}`,
          }))
        : [];

    return {
      id: slide.id,
      title: slide.title,
      description: slide.description,
      videoUrl: slide.video_url ?? undefined,
      slug: slide.products?.[0]?.slug ?? slide.documentId,
      links,
    };
  });
}

interface ModelsDesktopSliderProps {
  slides: SectionOne[];
}

const ModelsDesktopSlider = ({ slides }: ModelsDesktopSliderProps) => {
  const models = toModelSlides(slides);

  if (!models.length) return null;

  return (
    <div className="hidden lg:block w-full mt-32 overflow-hidden">
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView="auto"
        centeredSlides={true}
        initialSlide={1}
        pagination={{ clickable: true }}
        className="models-desktop-swiper !pb-12"
      >
        {models.map((model) => (
          <SwiperSlide key={model.id} className="!w-[48rem]">
            <div className="flex flex-col justify-center items-center text-center gap-6">
              <span className="w-full rounded-3xl bg-zinc-300 aspect-video overflow-hidden block">
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

              <h2 className="capitalize text-center text-black font-medium">
                {model.title}
              </h2>

              <div className="flex justify-center items-center gap-8">
                {model.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="capitalize text-center underline underline-offset-4 font-semibold text-lg"
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
  );
};

export default ModelsDesktopSlider;
