import dynamic from 'next/dynamic';
import HeroSlider from '@/components/hero-slider';
import ProductVersionSection from '@/components/product-version-section';
import BlogSection from '@/components/blog-section';
import MapboxMap from '@/components/map-box';
import Link from 'next/link';
import { getSectionOneData } from '@/lib/section-one-service';
import { getSectionTwoData } from '@/lib/section-two-service';
import { getBlogsData } from '@/lib/blogs-service';
import { getOffersData } from '@/lib/offers-service';

// Lazy load below-the-fold components
const Footer = dynamic(() => import('@/components/footer'));
const OffersSection = dynamic(() => import('@/components/offers-section'));
const VideoPlayer = dynamic(() => import('@/components/video-player'));

export default async function Home() {
  // Fetch all data on the server with caching (in parallel)
  const [sectionOneData, sectionTwoData, blogsData, offersData] = await Promise.all([
    getSectionOneData(),
    getSectionTwoData({ pageSize: 10 }),
    getBlogsData({ pageSize: 6 }),
    getOffersData({ pageSize: 10 }),
  ]);

  const slides = sectionOneData?.data || [];
  const productSections = sectionTwoData?.data || [];
  const blogs = blogsData?.data || [];
  const offers = offersData?.data || [];

  return (
    <main className="flex flex-col bg-white justify-center items-center relative">
      <HeroSlider slides={slides} />
      <section
        aria-label="product-version-section"
        className="bg-white mt-10 w-full"
      >
        <ProductVersionSection sections={productSections} />
      </section>
      <OffersSection offers={offers} />

      <section className="w-full  lg:px-0  mx-auto py-12">
        <div className="grid grid-cols-1  gap-6">
          <div className="flex  border border-zinc-300/26 md:px-0 flex-col rounded-none  overflow-hidden  transition-shadow">
            <div className="relative  w-full overflow-hidden bg-zinc-100">
              <VideoPlayer />
            </div>
            <div className="flex flex-col px-4 justify-start py-5 bg-white">
              <h3 className="text-zinc-900 text-2xl font-semibold mb-2">
                Master Your Riding Skills
              </h3>
              <p className="text-zinc-700 md:w-3xl text-sm leading-6">
                Discover essential techniques and tips to improve your cycling
                performance. Learn from experienced riders how to navigate
                different terrains, maintain balance, and maximize your biking
                experience.
              </p>
            </div>
          </div>
          <div className="flex flex-col border border-zinc-300/26 md:rounded-lg overflow-hidden  transition-shadow">
            <div className="relative w-full h-96 md:h-170 bg-zinc-100">
              <MapboxMap gpxUrl="/gpx/Desert-Ride.gpx" />
            </div>
            <div className=" py-5 px-4 bg-white">
              <h3 className="text-zinc-900 text-2xl font-semibold mb-2">
                Explore Scenic Routes
              </h3>
              <p className="text-zinc-700 text-sm leading-6">
                Discover amazing biking routes in your area. From mountain
                trails to scenic coastal paths, find the perfect route for your
                next adventure.
              </p>
              <Link href={'/routes'}>
                <button
                  className=" py-2.5 px-3 rounded-lg mt-4 font-medium text-zinc-100 capitalize text-sm bg-zinc-900 w-32"
                  aria-label="Learn more about scenic biking routes"
                >
                  learn more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BlogSection blogs={blogs} />
      <Footer />
      <section className=" fixed  gap-2 flex justify-center z-40 h-16 shadow-xl  bg-white w-full bottom-0 pt-2 pb-6 px-4">
        <button
          className=" w-10 h-10 md:w-full gap-2 flex justify-center items-center    "
          aria-label="Ask questions on WhatsApp"
        >
          <svg
            className=" fill-[#32870f] stroke-[#32870f] size-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            aria-hidden="true"
          >
            <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          <p className=" hidden md:inline-block text-zinc-700 capitalize font-semibold text-xs">
            Ask On Whatsapp
          </p>
        </button>
        <button
          className="border h-10 border-zinc-400/45 flex justify-center items-center gap-2 rounded w-full hover:bg-zinc-50 transition-colors"
          aria-label="Book your free test ride"
        >
          <p className="text-zinc-700 capitalize font-semibold text-xs">
            Book your Free test ride
          </p>
        </button>
      </section>
    </main>
  );
}

