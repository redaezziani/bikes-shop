import { notFound } from 'next/navigation';
import Footer from '@/components/footer';
import HeaderDetailsPage from '@/components/header-v2';
import FixedBottomBar from '@/components/fixed-bottom-bar';
import ProductPageClient from '@/components/product-page-client';
import ProductAccessories from '@/components/product-accessories';
import { getProductBySlug, getAllProductSlugs } from '@/lib/products-service';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

// Enable ISR
export const revalidate = 60;

// Generate static paths for all products
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `Cargo Bike Family UAE - ${product.name}`,
    description: product.short_description || product.long_description?.substring(0, 160),
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? '';

  const fetchBlur = (url: string) =>
    fetch(`${strapiUrl}${url}`, { next: { revalidate: 86400 } })
      .then((r) => r.arrayBuffer())
      .then((buf) => getPlaiceholder(Buffer.from(buf)))
      .then(({ base64 }) => base64)
      .catch(() => undefined);

  const [previewImagesWithBlur, accessoriesWithBlur, specsImageBlurDataURL] =
    await Promise.all([
      Promise.all(
        (product.preview_images || []).map(async (img) => ({
          ...img,
          blurDataURL: img.url ? await fetchBlur(img.url) : undefined,
        })),
      ),
      Promise.all(
        (product.available_accessories || []).map(async (acc) => ({
          ...acc,
          blurDataURL: acc.image?.url
            ? await fetchBlur(acc.image.url)
            : undefined,
        })),
      ),
      product.specs_image?.url ? fetchBlur(product.specs_image.url) : undefined,
    ]);

  const productWithBlur = {
    ...product,
    preview_images: previewImagesWithBlur,
    available_accessories: accessoriesWithBlur,
    specsImageBlurDataURL,
  };

  const allImages = previewImagesWithBlur.filter((img) => !!img.url) as (typeof previewImagesWithBlur[0] & { url: string })[];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.long_description?.substring(0, 160),
    image: product.cover_image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.cover_image.url}`
      : undefined,
    brand: {
      '@type': 'Brand',
      name: 'WE RIDE ALONG',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'AED',
      availability: 'https://schema.org/InStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/models/${product.slug}`,
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'AED',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AE',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <main className="flex flex-col min-h-screen gap-4 justify-start items-center relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <HeaderDetailsPage />
      <section className="w-full max-w-7xl px-4 flex flex-col gap-2 justify-start items-center">
        <ProductPageClient product={productWithBlur} allImages={allImages} />

        <section className="w-full mt-10 prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              h4: ({ node, ...props }) => (
                <h4 className="text-base font-semibold mt-4 mb-2" {...props} />
              ),
              h5: ({ node, ...props }) => (
                <h5 className="text-sm font-medium mt-3 mb-1" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-sm text-zinc-700 leading-relaxed"
                  {...props}
                />
              ),
              img: ({ node, src, alt, ...props }) => {
                if (typeof src === 'string' && src) {
                  return (
                    <Image
                      src={src}
                      alt={(alt as string) || ''}
                      width={800}
                      height={600}
                      className="mt-2 mb-4 rounded-lg"
                    />
                  );
                }
                return (
                  <img
                    src={src as string}
                    alt={alt as string}
                    className="mt-2 mb-4 rounded-lg"
                    {...props}
                  />
                );
              },
            }}
          >
            {product.long_description}
          </ReactMarkdown>
        </section>

        <section className="w-full py-2 border-x-0 border-zinc-400/25 flex flex-col gap-4 mt-10 justify-center items-center">
          <h3 className="font-semibold text-zinc-700 text-2xl">
            Key Specifications
          </h3>
          {productWithBlur.specs_image && (
            <Image
              className="mt-5"
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${productWithBlur.specs_image.url}`}
              alt={
                productWithBlur.specs_image.alternativeText ||
                `We Ride Along ${product.name} - specifications`
              }
              width={productWithBlur.specs_image.width}
              height={productWithBlur.specs_image.height}
              quality={90}
              priority
              placeholder={specsImageBlurDataURL ? 'blur' : 'empty'}
              {...(specsImageBlurDataURL && {
                blurDataURL: specsImageBlurDataURL,
              })}
            />
          )}

          <div className="grid pb-5 gap-4 mt-5 w-full grid-cols-1 md:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.id} className="flex w-full flex-col gap-1">
                <div className="flex w-full justify-between">
                  <p className="text-zinc-600">{spec.name}</p>
                  <p className="text-zinc-600">
                    {spec.value}
                    {spec.measure && ` ${spec.measure}`}
                  </p>
                </div>
                <span className="w-full h-1 bg-zinc-400"></span>
              </div>
            ))}
          </div>
        </section>

        <ProductAccessories accessories={productWithBlur.available_accessories} />
      </section>
      <Footer />
      <FixedBottomBar />
    </main>
  );
}
