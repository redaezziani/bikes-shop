import Link from 'next/link';
import { getSectionOneData } from '@/lib/section-one-service';
import { getSectionTwoData } from '@/lib/section-two-service';
import { getBlogsData } from '@/lib/blogs-service';
import { getOffersData } from '@/lib/offers-service';
import HeroSlider from '@/components/hero-slider';
import ProductVersionSection from '@/components/product-version-section';
import OffersSection from '@/components/offers-section';
import BlogSection from '@/components/blog-section';
import Footer from '@/components/footer';
import FixedBottomBar from '@/components/fixed-bottom-bar';
import LazyVideoPlayer from '@/components/lazy-video-player';
import LazyMapboxMap from '@/components/lazy-mapbox-map';

export const revalidate = 60;

export default async function Home() {
  let sectionOneData, sectionTwoData, blogsData, offersData;

  try {
    [sectionOneData, sectionTwoData, blogsData, offersData] = await Promise.all(
      [
        getSectionOneData(),
        getSectionTwoData({ pageSize: 10 }),
        getBlogsData({ pageSize: 6 }),
        getOffersData({ pageSize: 10 }),
      ],
    );
  } catch (error) {
    console.warn('Failed to fetch data:', error);
    sectionOneData = { data: [] };
    sectionTwoData = { data: [] };
    blogsData = { data: [] };
    offersData = { data: [] };
  }

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
          <div className="flex flex-col border border-zinc-300/26 md:rounded-lg overflow-hidden  transition-shadow">
            <div className="relative w-full h-96 md:h-170 bg-zinc-100">
              <LazyMapboxMap />
            </div>
            <div className=" py-5 px-4 bg-white">
              <h3 className="text-zinc-900 text-2xl font-semibold mb-2">
                We Are Set to Explore
              </h3>
              <p className="text-zinc-700 text-sm leading-6">
                We’re exploring and documenting the best family-friendly cycling
                routes across Dubai and the UAE through the eyes of the whole
                family.
              </p>
              <Link href={'/we-are-set-to-explore'}>
                <button
                  className=" py-2.5 px-3 rounded-lg mt-4 font-medium text-zinc-100  text-sm bg-zinc-900 min-w-32"
                  aria-label="Learn more about scenic biking routes"
                >
                  Discover along Routes Collection
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
