'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import AccessorySelector from '@/components/accessory-selector';
import HeaderDetailsPage from '@/components/header-v2';
import ModelSelector from '@/components/select-model';
import Link from 'next/link';
import { useProducts, useProductSelection } from '@/store/products';
import OrderSummaryPanel from '@/components/order-summary-panel';
import ModelPreview from '@/components/model-preview';
import ProductImagePreview from '@/components/product-image-priview';

const OrderContent = () => {
  const { data, isLoading } = useProducts({ pageSize: 10 });

  const searchParams = useSearchParams();
  const documentIdFromUrl = searchParams.get('documentId');

  const products = data?.data || [];

  // Derive current product from URL and products list
  const currentProduct = useMemo(() => {
    if (products.length === 0) return null;

    if (documentIdFromUrl) {
      const found = products.find((p) => p.documentId === documentIdFromUrl);
      if (found) return found;
    }

    // Fallback to first product if no documentId in URL
    return products[0] || null;
  }, [documentIdFromUrl, products]);

  const {
    selectedColor,
    setSelectedColor,
    selectedAccessories,
    toggleAccessory,
  } = useProductSelection(currentProduct);

  const availableColors = currentProduct?.colors || [];

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen gap-4 justify-center items-center">
        <main className="flex flex-col min-h-screen gap-4 justify-center items-center">
          <span className=" flex gap-1 justify-center items-center">
            <div className="w-3 h-3 border-2 border-white/30 border-t-black rounded-full animate-spin" />
            Processing...
          </span>
        </main>
      </main>
    );
  }

  if (!currentProduct) return null;

  const allImages = (currentProduct.preview_images || [])
    .map((img) => img.url)
    .filter((url): url is string => !!url);

  return (
    <main className="flex flex-col min-h-screen gap-4 justify-start items-center relative pb-32 md:pb-40">
      <HeaderDetailsPage />
      <section className="w-full max-w-7xl flex flex-col gap-2 justify-start items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 pb-10">
          <div className="flex md:p-10 md:mt-14">
            <span className="  md:block hidden">
              <ProductImagePreview images={allImages} />
            </span>
            <span className=" block md:hidden">
              <ModelPreview
                name={currentProduct.name}
                image={currentProduct.cover_image.url}
                id={currentProduct.documentId}
              />
            </span>
          </div>
          <div className="flex flex-col border-l border-zinc-300/26 md:mt-32 gap-6">
            <div className="flex px-4 flex-col gap-1 justify-center items-center text-center">
              <h2 className="text-xl font-semibold text-zinc-900">
                {currentProduct.name}
              </h2>
              <p className="text-zinc-600 line-clamp-1 capitalize text-sm">
                {currentProduct.short_description}{' '}
              </p>
              <Link
                className="underline text-zinc-600 underline-offset-4"
                href={`/models/${currentProduct.slug}`}
              >
                more info
              </Link>
            </div>

            <div className="px-4 flex gap-5 justify-between w-full">
              {currentProduct.specs.slice(0, 3).map((spec) => (
                <span key={spec.id} className="flex flex-col text-center gap-1">
                  <h4 className="text-zinc-800 font-semibold text-sm">
                    {spec.name}
                  </h4>
                  <p className="text-zinc-600 capitalize font-medium text-sm">
                    {spec.value}
                    {spec.measure && ` ${spec.measure}`}
                  </p>
                </span>
              ))}
            </div>

            <span className="w-full bg-zinc-400/35 h-px" />

            <ModelSelector products={products} />

            <div className="flex gap-1 flex-col justify-center items-center">
              <h2 className="text-xl font-semibold text-zinc-900">Colors</h2>
              <p className="text-zinc-600 capitalize text-sm">
                Choose the color that you want.
              </p>
              {availableColors.length > 0 && (
                <div className="mt-4 flex justify-start flex-col gap-2">
                  <div className="flex w-full justify-start gap-3 flex-wrap">
                    {availableColors.map((color) => (
                      <label
                        key={color.id}
                        className={`cursor-pointer flex overflow-hidden items-center gap-2 border-2 rounded-lg size-8 bg-white transition
                          ${
                            selectedColor === color.name
                              ? 'border-zinc-900'
                              : 'border-zinc-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="product-color"
                          aria-label={`Choose color ${color.name}`}
                          checked={selectedColor === color.name}
                          onChange={() => setSelectedColor(color.name)}
                          className="hidden"
                        />
                        <span
                          className="size-full"
                          style={{ backgroundColor: color.hex }}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-1 mt-5 flex-col justify-center items-center">
              <h2 className="text-xl pb-5 font-semibold text-zinc-900">
                Accessories
              </h2>
              <AccessorySelector
                product={currentProduct}
                selectedAccessories={selectedAccessories}
                toggleAccessory={toggleAccessory}
              />
            </div>
          </div>
        </div>
      </section>
      <OrderSummaryPanel
        currentProduct={currentProduct}
        selectedColorName={selectedColor}
        selectedAccessoryIds={selectedAccessories}
      />
    </main>
  );
};

export default OrderContent;
