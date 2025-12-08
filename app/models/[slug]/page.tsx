'use client';

import AccessoryModal from '@/components/accessory-model';
import Footer from '@/components/footer';
import HeaderDetailsPage from '@/components/header-v2';
import ProductImagePreview from '@/components/product-image-priview';
import ProductInfo from '@/components/product-info';
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

  const {
    selectedAccessories,
  } = useProductSelection(selectedProduct || null);

  const [activeAccessory, setActiveAccessory] = useState<Accessory | null>(
    null,
  );

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
          <ProductImagePreview images={allImages} />
          <ProductInfo
            title={selectedProduct.name}
            description={selectedProduct.short_description}
            priceAED={totalPrice}
            priceUSD={totalPrice * 0.27}
            colors={selectedProduct.colors}
            documentId={selectedProduct.documentId}
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
                return <img src={src as string} alt={alt as string} className="mt-2 mb-4 rounded-lg" {...props} />;
              },
            }}
          >
            {selectedProduct.long_description}
          </ReactMarkdown>
        </section>

        <section className=" w-full  border-t border-b py-2 border-x-0 border-zinc-400/25  flex flex-col gap-4 mt-10 justify-center items-center">
          <h3 className="  font-semibold text-zinc-700 text-2xl">
            Key Specifications
          </h3>
          {selectedProduct.specs_image && (
            <Image
              className="mt-5"
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${selectedProduct.specs_image.url}`}
              alt={selectedProduct.specs_image.alternativeText || 'Product specifications'}
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

            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-zinc-600">Category</p>
                <p className="text-zinc-600">{selectedProduct.category}</p>
              </div>
              <span className="w-full h-1 bg-zinc-400"></span>
            </div>
          </div>
        </section>

        {selectedProduct.available_accessories.length > 0 && (
          <section className="w-full flex mt-15 flex-col gap-2 justify-start items-start">
            <h3 className="text-lg font-medium text-zinc-800">
              Related Accessories
            </h3>
            <p className="text-sm text-zinc-600">
              Upgrade your ride with accessories designed to pair perfectly with
              this product.
            </p>
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
      <section className=" fixed  gap-2 flex justify-center z-30 h-16 shadow-xl  bg-white w-full bottom-0 pt-2 pb-6 px-4">
        <button className=" w-10 h-10 md:w-full gap-2 flex justify-center items-center    ">
          <svg
            className=" fill-zinc-700 stroke-zinc-700 size-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          <p className=" hidden md:inline-block text-zinc-700 capitalize font-semibold text-xs">
            Ask On Whatsapp
          </p>
        </button>
        <button className="border h-10 bg-zinc-400/10 border-zinc-400/45 flex justify-center items-center gap-2 rounded w-full">
          <p className=" text-zinc-700 capitalize font-semibold text-xs">
            Book your Free test ride
          </p>
        </button>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
