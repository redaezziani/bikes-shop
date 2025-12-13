'use client';

import AccessoryModal from '@/components/accessory-model';
import Footer from '@/components/footer';
import HeaderDetailsPage from '@/components/header-v2';
import ProductImagePreview from '@/components/product-image-priview';
import ProductInfo from '@/components/product-info';
import FixedBottomBar from '@/components/fixed-bottom-bar';
import {
  Accessory,
  useProductBySlug,
  useProductSelection,
} from '@/store/products';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

const ProductDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const productSlug = Array.isArray(slug) ? slug[0] : slug;

  const {
    data: selectedProduct,
    isLoading,
    error,
  } = useProductBySlug(productSlug as string);

  const { selectedAccessories } = useProductSelection(selectedProduct || null);

  const [activeAccessory, setActiveAccessory] = useState<Accessory | null>(
    null,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading || !selectedProduct) {
    return (
      <main className="flex flex-col min-h-screen gap-4 justify-start items-center relative">
        <HeaderDetailsPage />
        <section className="w-full max-w-7xl px-4 flex mt-20 flex-col gap-8 justify-start items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="animate-pulse bg-zinc-200 aspect-square rounded-lg h-96"></div>
            <div className="flex flex-col gap-4">
              <div className="animate-pulse bg-zinc-200 h-8 w-3/4 rounded"></div>
              <div className="animate-pulse bg-zinc-200 h-4 w-full rounded"></div>
              <div className="animate-pulse bg-zinc-200 h-4 w-5/6 rounded"></div>
              <div className="animate-pulse bg-zinc-200 h-4 w-3/5 rounded"></div>
            </div>
          </div>
          <div className="animate-pulse bg-zinc-200 h-96 w-full rounded"></div>
        </section>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen gap-4 justify-start items-center relative">
        <HeaderDetailsPage />
        <section className="w-full max-w-7xl px-4 flex mt-20 flex-col gap-8 justify-start items-center">
          <h2 className="text-2xl font-bold text-red-600">
            Error Loading Product
          </h2>
          <p className="text-zinc-600">Product not found</p>
        </section>
        <Footer />
      </main>
    );
  }

  const allImages = (selectedProduct.preview_images || [])
    .map((img) => img.url)
    .filter((url): url is string => !!url);

  const totalAccessoryPrice = selectedProduct.available_accessories
    .filter((acc) => selectedAccessories.includes(acc.id))
    .reduce((sum, acc) => sum + acc.price, 0);

  const productPrice = selectedProduct.price;
  const totalPrice = productPrice + totalAccessoryPrice;

  return (
    <main className=" flex flex-col min-h-screen gap-4 justify-start items-center relative">
      <HeaderDetailsPage />
      <section className="w-full max-w-7xl px-4 flex  flex-col gap-2 justify-start items-center">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProductImagePreview
            images={allImages}
            current={currentImageIndex}
            setCurrent={setCurrentImageIndex}
          />
          <ProductInfo
            title={selectedProduct.name}
            description={selectedProduct.short_description}
            priceAED={totalPrice}
            priceUSD={totalPrice * 0.27}
            colors={selectedProduct.colors}
            documentId={selectedProduct.documentId}
            images={allImages}
            current={currentImageIndex}
            setCurrent={setCurrentImageIndex}
          />
        </div>

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
                // Only use Image component if src is a string
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
                // Fallback to regular img tag for non-string sources
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
            {selectedProduct.long_description}
          </ReactMarkdown>
        </section>

        <section className=" w-full   py-2 border-x-0 border-zinc-400/25  flex flex-col gap-4 mt-10 justify-center items-center">
          <h3 className="  font-semibold text-zinc-700 text-2xl">
            Key Specifications
          </h3>
          {selectedProduct.specs_image && (
            <Image
              className="mt-5"
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${selectedProduct.specs_image.url}`}
              alt={
                selectedProduct.specs_image.alternativeText ||
                'Product specifications'
              }
              width={selectedProduct.specs_image.width}
              height={selectedProduct.specs_image.height}
              quality={90}
              priority
            />
          )}

          <div className="grid pb-5 gap-4 mt-5 w-full grid-cols-1 md:grid-cols-2">
            {selectedProduct.specs.map((spec) => (
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

        {selectedProduct.available_accessories.length > 0 && (
          <section className="w-full flex mt-15 flex-col gap-2 justify-start items-start">
            <h3 className="text-lg font-medium text-zinc-800">
              Related Accessories
            </h3>

            <div className="grid w-full mt-5 grid-cols-2 md:grid-cols-3 gap-2">
              {selectedProduct.available_accessories.slice(0, 3).map((acc) => (
                <div
                  key={acc.id}
                  className="w-full bg-zinc-100 rounded aspect-square cursor-pointer relative overflow-hidden"
                  onClick={() => setActiveAccessory(acc)}
                >
                  {acc.image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${acc.image.url}`}
                      alt={acc.name || acc.title || 'Related Accessory'}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeAccessory && (
          <AccessoryModal
            accessory={activeAccessory}
            onClose={() => setActiveAccessory(null)}
          />
        )}
      </section>
      <Footer />
      <FixedBottomBar />
    </main>
  );
};

export default ProductDetailsPage;
