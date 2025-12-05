'use client';

import { useBlogs } from '@/store/blogs';
import BlogCard from './blog-card';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BlogSection = () => {
  const { data, isLoading } = useBlogs({ pageSize: 6 });

  if (isLoading) {
    return (
      <section className="w-full pl-4 py-8">
        <div className="mb-8 px-4">
          <div className="h-8 w-48 bg-zinc-200 animate-pulse rounded"></div>
        </div>
        <div className="flex gap-4 overflow-hidden px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[85%] h-[500px] bg-zinc-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  const blogs = data?.data || [];

  return (
    <section className="w-full pl-4 pb-5 bg-white">
      {blogs.length > 0 ? (
        <>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={2}
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

export default BlogSection;
