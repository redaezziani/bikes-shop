'use client';
import { useState, useEffect } from 'react';
import AccessorySelector from '@/components/accessory-selector';
import HeaderDetailsPage from '@/components/header-v2';
import ModelSelector from '@/components/select-model';
import Link from 'next/link';
import { useProducts, useProductSelection } from '@/store/products';
import OrderSummaryPanel from '@/components/order-summary-panel';
import ModelPreview from '@/components/model-preview';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const { data, isLoading } = useProducts({ pageSize: 10 });
  const searchParams = useSearchParams();
  const documentIdFromUrl = searchParams.get('documentId');

  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const products = data?.data || [];

  // Auto-select product from URL or first product
  useEffect(() => {
    if (products.length === 0) return;

    if (documentIdFromUrl) {
      const found = products.find((p) => p.documentId === documentIdFromUrl);
      if (found) {
        setCurrentProduct(found);
        return;
      }
    }

    // Fallback to first product if no documentId in URL
    setCurrentProduct(products[0] || null);
  }, [documentIdFromUrl, products]);

  const {
    selectedColor,
    setSelectedColor,
    selectedAccessories,
    toggleAccessory,
    getSelectedAccessoriesDetails,
    getSelectedColorHex,
    getTotalPrice,
  } = useProductSelection(currentProduct);

  const availableColors = currentProduct?.colors || [];

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen gap-4 justify-center items-center">
        <div className="text-lg">Loading products...</div>
      </main>
    );
  }

  console.log(currentProduct);

  if (!currentProduct) return null;

  return (
    <main className="flex flex-col min-h-screen gap-4 justify-start items-center relative pb-32 md:pb-40">
      <HeaderDetailsPage />
      <section className="w-full max-w-7xl flex flex-col gap-2 justify-start items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 pb-10">
          <div className="flex flex-col justify-center items-center gap-6">
            <ModelPreview
              name={currentProduct.name}
              image={currentProduct.cover_image.url}
              id={currentProduct.documentId}
            />

            <div className="flex px-4 flex-col gap-1 justify-center items-center text-center">
              <h2 className="text-xl font-semibold text-neutral-900">
                {currentProduct.name}
              </h2>
              <p className="text-neutral-600 capitalize text-sm">
                {currentProduct.short_description}{' '}
                <Link
                  className="underline underline-offset-4"
                  href={`/models/${currentProduct.slug}`}
                >
                  more info
                </Link>
              </p>
            </div>

            <div className="px-4 flex gap-5 justify-between w-full">
              {['speed', 'range', 'battery'].map((spec) => (
                <span key={spec} className="flex flex-col text-center gap-1">
                  <h4 className="text-neutral-800 font-semibold text-sm">
                    {spec.charAt(0).toUpperCase() + spec.slice(1)}
                  </h4>
                  <p className="text-neutral-600 capitalize font-medium text-sm">
                    {
                      currentProduct.specs[
                        spec as keyof typeof currentProduct.specs
                      ]
                    }
                  </p>
                </span>
              ))}
            </div>

            <span className="w-full bg-neutral-400/35 h-px" />

            <ModelSelector products={products} />

            <div className="flex gap-1 flex-col justify-center items-center">
              <h2 className="text-xl font-semibold text-neutral-900">Colors</h2>
              <p className="text-neutral-600 capitalize text-sm">
                Choose the color that you want.
              </p>
              {availableColors.length > 0 && (
                <div className="mt-4 flex justify-start flex-col gap-2">
                  <div className="flex w-full justify-start gap-3 flex-wrap">
                    {availableColors.map((color: any) => (
                      <label
                        key={color.id}
                        className={`cursor-pointer flex overflow-hidden items-center gap-2 border-2 rounded-lg size-8 bg-white transition
                          ${
                            selectedColor === color.name
                              ? 'border-neutral-900'
                              : 'border-neutral-300'
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
              <h2 className="text-xl pb-5 font-semibold text-neutral-900">
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

export default Page;
