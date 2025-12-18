import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getSectionOneData } from '@/lib/section-one-service';
import { getSectionTwoData } from '@/lib/section-two-service';
import { getBlogsData } from '@/lib/blogs-service';
import { getOffersData } from '@/lib/offers-service';
import { getHomeMapSectionData } from '@/lib/home-map-section-service';
import Footer from '@/components/footer';
import FixedBottomBar from '@/components/fixed-bottom-bar';
import OrderStatusModalWrapper from '@/components/order-status-modal-wrapper';

// Lazy load heavy client components - these won't block the initial page load
const HeroSlider = dynamic(() => import('@/components/hero-slider'), {
  loading: () => (
    <div className="w-full h-130 lg:h-[80vh] bg-zinc-100 animate-pulse" />
  ),
});

// Defer below-the-fold components with dynamic imports
const ProductVersionSection = dynamic(
  () => import('@/components/product-version-section'),
);

const OffersSection = dynamic(() => import('@/components/offers-section'));

const LazyVideoPlayer = dynamic(
  () => import('@/components/lazy-video-player'),
  {
    loading: () => (
      <div className="w-full h-96 bg-zinc-100 animate-pulse rounded-lg" />
    ),
  },
);

const BlogSection = dynamic(() => import('@/components/blog-section'));

export const revalidate = 60;

export default async function Home() {
  let sectionOneData, sectionTwoData, blogsData, offersData, homeMapSectionData;

  try {
    [
      sectionOneData,
      sectionTwoData,
      blogsData,
      offersData,
      homeMapSectionData,
    ] = await Promise.all([
      getSectionOneData(),
      getSectionTwoData({ pageSize: 10 }),
      getBlogsData({ pageSize: 6 }),
      getOffersData({ pageSize: 10 }),
      getHomeMapSectionData(),
    ]);
  } catch (error) {
    console.warn('Failed to fetch data:', error);
    sectionOneData = { data: [] };
    sectionTwoData = { data: [] };
    blogsData = { data: [] };
    offersData = { data: [] };
    homeMapSectionData = { data: null };
  }

  const slides = sectionOneData?.data || [];
  const productSections = sectionTwoData?.data || [];
  const blogs = blogsData?.data || [];
  const offers = offersData?.data || [];
  const mapSection = homeMapSectionData?.data || null;

  return (
    <main className="flex flex-col bg-white justify-center items-center relative">
      <OrderStatusModalWrapper />
      <HeroSlider slides={slides} />
      <section
        aria-label="product-version-section"
        className="bg-white mt-10 w-full"
      >
        <ProductVersionSection sections={productSections} />
      </section>
      <OffersSection offers={offers} />

      <section className="w-full  lg:px-0  mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 md:px-4   gap-6">
          <div className="flex md:col-span-2  border border-zinc-300/26 md:px-0 flex-col rounded-none md:rounded-lg  overflow-hidden  transition-shadow">
            <div className="relative md:h-140  w-full overflow-hidden bg-zinc-100">
              <LazyVideoPlayer />
            </div>
            <div className="flex flex-col px-4 justify-start py-5 bg-white">
              <h3 className="text-zinc-900 text-2xl font-semibold mb-2">
                Timeless Designs, Made for Today
              </h3>
              <p className="text-zinc-700 md:w-3xl text-sm leading-6">
                We build front-loader cargo bikes for a shared view and a richer
                sensory experience. Inspired by Long John and Bakfiets heritage,
                we design modern family bikes for life in Dubai and the UAE.
              </p>
              <Link href={'/routes'}>
                <button
                  className=" py-2.5 px-3 rounded-lg mt-4 font-medium text-zinc-100 capitalize text-sm bg-zinc-900 w-32"
                  aria-label="Learn more about scenic biking routes"
                >
                  Book Test Ride
                </button>
              </Link>
            </div>
          </div>
          {mapSection && (
            <div className="flex flex-col border border-zinc-300/26 md:rounded-lg overflow-hidden  transition-shadow">
              {mapSection.image && (
                <div className="relative w-full h-96 md:h-140 bg-zinc-100 overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${mapSection.image.url}`}
                    alt={mapSection.image.alternativeText || mapSection.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className=" py-5 px-4 bg-white">
                <h3 className="text-zinc-900 text-2xl font-semibold mb-2">
                  {mapSection.title}
                </h3>
                <p className="text-zinc-700 md:max-w-[70%] text-sm leading-6">
                  {mapSection.description}
                </p>
                <Link href={mapSection.external_link}>
                  <button
                    className=" py-2.5 px-3 rounded-lg mt-4 font-medium text-zinc-100  text-sm bg-zinc-900 min-w-32"
                    aria-label="Learn more about scenic biking routes"
                  >
                    {mapSection.button_text}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <BlogSection blogs={blogs} />
      <Footer />
      <FixedBottomBar />
    </main>
  );
}
