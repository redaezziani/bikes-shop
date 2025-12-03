'use client';

import { useBlogs } from '@/store/blogs';
import BlogCard from './blog-card';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BlogSection = () => {
  const { data, isLoading } = useBlogs({ pageSize: 6 });

  if (isLoading) {
    return (
      <section className="w-full px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-48 bg-zinc-200 animate-pulse rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-zinc-200 animate-pulse h-96"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const blogs = data?.data || [];

  return (
    <section className="w-full px-4 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
            Latest Blog Posts
          </h2>
          <p className="text-zinc-600 text-sm">
            Stay updated with our latest articles and insights
          </p>
        </div>

        {blogs.length > 0 ? (
          <>
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              pagination={{ clickable: true }}
              navigation={true}
              className="blog-swiper"
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <BlogCard blog={blog} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-end mt-12">
              <Link
                href="/blog"
                className=" text-sm flex justify-center items-end text-zinc-900 hover:text-zinc-800  font-semibold transition-colors"
              >
                View All Posts
                <IconArrowRight size={16} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-600">No blog posts available yet.</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .blog-swiper {
          padding-bottom: 3rem;
        }
        .blog-swiper .swiper-pagination {
          bottom: 0;
        }
        .blog-swiper .swiper-pagination-bullet {
          background: #9ca3af;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .blog-swiper .swiper-pagination-bullet-active {
          background: #1f2937;
        }
        .blog-swiper .swiper-button-next,
        .blog-swiper .swiper-button-prev {
          color: #1f2937;
          width: 40px;
          height: 40px;
        }
        .blog-swiper .swiper-button-next:after,
        .blog-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
