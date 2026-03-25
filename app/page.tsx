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
import { getPlaiceholder } from 'plaiceholder';

const HeroSlider = dynamic(() => import('@/components/hero-slider'));

const ProductVersionSection = dynamic(
  () => import('@/components/product-version-section'),
);

const OffersSection = dynamic(() => import('@/components/offers-section'));

const LazyVideoPlayer = dynamic(() => import('@/components/lazy-video-player'));

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
  const rawSections = sectionTwoData?.data || [];
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? '';

  const productSections = await Promise.all(
    rawSections.map(async (section) => {
      const desktopUrl = section.cover_image_desktop?.url
        ? `${strapiUrl}${section.cover_image_desktop.url}`
        : null;
      const mobileUrl = section.cover_image_mobile?.url
        ? `${strapiUrl}${section.cover_image_mobile.url}`
        : null;

      const [desktopBlur, mobileBlur] = await Promise.all([
        desktopUrl
          ? fetch(desktopUrl, { next: { revalidate: 86400 } })
              .then((r) => r.arrayBuffer())
              .then((buf) => getPlaiceholder(Buffer.from(buf)))
              .then(({ base64 }) => base64)
              .catch(() => undefined)
          : undefined,
        mobileUrl
          ? fetch(mobileUrl, { next: { revalidate: 86400 } })
              .then((r) => r.arrayBuffer())
              .then((buf) => getPlaiceholder(Buffer.from(buf)))
              .then(({ base64 }) => base64)
              .catch(() => undefined)
          : undefined,
      ]);

      return {
        ...section,
        blurDataURLDesktop: desktopBlur,
        blurDataURLMobile: mobileBlur,
      };
    }),
  );

  const [blogs, offers] = await Promise.all([
    Promise.all(
      (blogsData?.data || []).map(async (blog) => {
        const url = blog.featured_image?.url
          ? `${strapiUrl}${blog.featured_image.url}`
          : null;
        const blurDataURL = url
          ? await fetch(url, { next: { revalidate: 86400 } })
              .then((r) => r.arrayBuffer())
              .then((buf) => getPlaiceholder(Buffer.from(buf)))
              .then(({ base64 }) => base64)
              .catch(() => undefined)
          : undefined;
        return { ...blog, blurDataURL };
      }),
    ),
    Promise.all(
      (offersData?.data || []).map(async (offer) => {
        const url = offer.cover_image?.url
          ? `${strapiUrl}${offer.cover_image.url}`
          : null;
        const blurDataURL = url
          ? await fetch(url, { next: { revalidate: 86400 } })
              .then((r) => r.arrayBuffer())
              .then((buf) => getPlaiceholder(Buffer.from(buf)))
              .then(({ base64 }) => base64)
              .catch(() => undefined)
          : undefined;
        return { ...offer, blurDataURL };
      }),
    ),
  ]);

  return (
    <main className="flex flex-col bg-white justify-center items-center relative">
      <OrderStatusModalWrapper />
      <HeroSlider hero={hero} />
      <section
        aria-label="product-version-section"
        className=" mt-15 md:mt-54 w-full"
      >
        <ProductVersionSection sections={productSections} />
      </section>
      <OffersSection offers={offers} />
      <BlogSection blogs={blogs} />
      <Footer />
      <FixedBottomBar />
    </main>
  );
}
