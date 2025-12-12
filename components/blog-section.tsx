'use client';

import { Blog } from '@/types/blogs';
import BlogCard from './blog-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

interface BlogSectionProps {
  blogs: Blog[];
}

const BlogSection = ({ blogs }: BlogSectionProps) => {

  return (
    <section className="w-full pl-4 pb-5 bg-white">
      {blogs.length > 0 ? (
        <>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            centeredSlides={false}
            pagination={{ clickable: true }}
            className="px-4 blog-swiper"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className="text-center py-12 px-4">
          <p className="text-zinc-600">No blog posts available yet.</p>
        </div>
      )}

      <style jsx global>{`
        .blog-swiper .swiper-slide {
          width: 85%;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
