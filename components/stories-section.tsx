'use client';

import { Story } from '@/types/stories';
import StoryCard from './story-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import '@/app/swiper-styles.css';

interface StoriesSectionProps {
  stories: Story[];
}

const StoriesSection = ({ stories }: StoriesSectionProps) => {
  return (
    <section className="w-full pl-4 py-8 bg-white">
      {stories.length > 0 ? (
        <>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            centeredSlides={false}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            className="blog-swiper"
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <StoryCard story={story} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className="text-center py-12 px-4">
          <p className="text-zinc-600">No stories available yet.</p>
        </div>
      )}
    </section>
  );
};

export default StoriesSection;
