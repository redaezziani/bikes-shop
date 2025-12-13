import { notFound } from 'next/navigation';
import Footer from '@/components/footer';
import HeaderDetailsPage from '@/components/header-v2';
import FixedBottomBar from '@/components/fixed-bottom-bar';
import ProductPageClient from '@/components/product-page-client';
import { getProductBySlug, getAllProductSlugs } from '@/lib/products-service';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

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
    title: `${product.name} | Bikes Shop`,
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

  const allImages = (product.preview_images || [])
    .map((img) => img.url)
    .filter((url): url is string => !!url);

  return (
    <main className="flex flex-col min-h-screen gap-4 justify-start items-center relative">
      <HeaderDetailsPage />
      <section className="w-full max-w-7xl px-4 flex flex-col gap-2 justify-start items-center">
        <ProductPageClient product={product} allImages={allImages} />

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
          {product.specs_image && (
            <Image
              className="mt-5"
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product.specs_image.url}`}
              alt={
                product.specs_image.alternativeText ||
                'Product specifications'
              }
              width={product.specs_image.width}
              height={product.specs_image.height}
              quality={90}
              priority
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
      </section>
      <Footer />
      <FixedBottomBar />
    </main>
  );
}
