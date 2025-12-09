import dynamicImport from 'next/dynamic';
import HeroSlider from '@/components/hero-slider';
import ProductVersionSection from '@/components/product-version-section';
import BlogSection from '@/components/blog-section';
import MapboxMap from '@/components/map-box';
import Link from 'next/link';
import { getSectionOneData } from '@/lib/section-one-service';
import { getSectionTwoData } from '@/lib/section-two-service';
import { getBlogsData } from '@/lib/blogs-service';
import { getOffersData } from '@/lib/offers-service';

const Footer = dynamicImport(() => import('@/components/footer'));
const OffersSection = dynamicImport(() => import('@/components/offers-section'));
const VideoPlayer = dynamicImport(() => import('@/components/video-player'));
const FixedBottomBar = dynamicImport(() => import('@/components/fixed-bottom-bar'));

// Force dynamic rendering since we depend on external API
export const dynamic = 'force-dynamic';

export default async function Home() {
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
      <FixedBottomBar />
    </main>
  );
}

