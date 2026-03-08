import dynamic from 'next/dynamic';
import { getSectionOneData } from '@/lib/section-one-service';
import { getHeroSectionData } from '@/lib/hero-section-service';
import { getSectionTwoData } from '@/lib/section-two-service';
import { getBlogsData } from '@/lib/blogs-service';
import { getOffersData } from '@/lib/offers-service';
import { getHomeMapSectionData } from '@/lib/home-map-section-service';
import Footer from '@/components/footer';
import FixedBottomBar from '@/components/fixed-bottom-bar';
import OrderStatusModalWrapper from '@/components/order-status-modal-wrapper';

const HeroSlider = dynamic(() => import('@/components/hero-slider'), {
  loading: () => (
    <div className="w-full h-130 lg:h-[80vh] bg-zinc-100 animate-pulse" />
  ),
});

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
  let sectionOneData,
    sectionTwoData,
    blogsData,
    offersData,
    homeMapSectionData,
    heroSectionData;

  try {
    [
      sectionOneData,
      sectionTwoData,
      blogsData,
      offersData,
      homeMapSectionData,
      heroSectionData,
    ] = await Promise.all([
      getSectionOneData(),
      getSectionTwoData({ pageSize: 10 }),
      getBlogsData({ pageSize: 6 }),
      getOffersData({ pageSize: 10 }),
      getHomeMapSectionData(),
      getHeroSectionData(),
    ]);
  } catch (error) {
    console.warn('Failed to fetch data:', error);
    sectionOneData = { data: [] };
    sectionTwoData = { data: [] };
    blogsData = { data: [] };
    offersData = { data: [] };
    homeMapSectionData = { data: null };
    heroSectionData = { data: null };
  }

  const hero = heroSectionData?.data || null;
  const productSections = sectionTwoData?.data || [];
  const blogs = blogsData?.data || [];
  const offers = offersData?.data || [];

  return (
    <main className="flex flex-col bg-white justify-center items-center relative">
      <OrderStatusModalWrapper />
      <HeroSlider hero={hero} />
      <section aria-label="product-version-section" className=" mt-15 w-full">
        <ProductVersionSection sections={productSections} />
      </section>
      <OffersSection offers={offers} />
      <BlogSection blogs={blogs} />
      <Footer />
      <FixedBottomBar />
    </main>
  );
}
