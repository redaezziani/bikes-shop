// app/order/page.tsx
'use client';
import AccessorySelector from '@/components/accessory-selector';
import HeaderDetailsPage from '@/components/header-v2';
import ModelSelector from '@/components/select-model';
import Link from 'next/link';
import {
  useBikeStore,
  getCurrentModel,
  getAvailableColors,
} from '@/store/bike-store';
import OrderSummaryPanel from '@/components/order-summary-panel';
import ModelPreview from '@/components/model-preview';

const Page = () => {
  const currentModel = useBikeStore(getCurrentModel);
  const availableColors = useBikeStore(getAvailableColors);
  const selectedColor = useBikeStore((state) => state.selectedColor);
  const setColor = useBikeStore((state) => state.setColor);
  // TotalPrice is now only used in the panel, so we can remove the direct hook call here.

  if (!currentModel) return null;

  return (
    <main className="flex flex-col min-h-screen gap-4 justify-start items-center relative pb-32 md:pb-40">
      {' '}
      {/* Add padding for the fixed panel */}
      <HeaderDetailsPage />
      <section className="w-full max-w-7xl flex mt-20 flex-col gap-2 justify-start items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 py-10">
          <div className="flex flex-col justify-center items-center gap-6">
            <ModelPreview
              name={currentModel.name}
              image={currentModel.image}
              id={currentModel.id}
            />

            <div className="flex px-4 flex-col gap-1 justify-center items-center text-center">
              <h2 className="text-xl font-semibold text-neutral-900">
                {currentModel.title}
              </h2>
              <p className="text-neutral-600 capitalize text-sm">
                {currentModel.description}{' '}
                <Link className="underline underline-offset-4" href="/">
                  more info
                </Link>
              </p>
            </div>

            <div className="px-4 flex gap-5 justify-between w-full">
              <span className="flex flex-col text-center gap-1">
                <h4 className="text-neutral-800 font-semibold text-sm">
                  Speed
                </h4>
                <p className="text-neutral-600 capitalize font-medium text-sm">
                  {currentModel.specs.speed}
                </p>
              </span>

              <span className="flex flex-col text-center gap-1">
                <h4 className="text-neutral-800 font-semibold text-sm">
                  Range
                </h4>
                <p className="text-neutral-600 capitalize font-medium text-sm">
                  {currentModel.specs.range}
                </p>
              </span>

              <span className="flex flex-col text-center gap-1">
                <h4 className="text-neutral-800 font-semibold text-sm">
                  Battery
                </h4>
                <p className="text-neutral-600 capitalize font-medium text-sm">
                  {currentModel.specs.battery}
                </p>
              </span>
            </div>

            <span className="w-full bg-neutral-400/35 h-px" />

            <ModelSelector />

            <div className="flex gap-1 flex-col justify-center items-center">
              <h2 className="text-xl font-semibold text-neutral-900">Colors</h2>
              <p className="text-neutral-600 capitalize text-sm">
                Choose the color that you want.
              </p>
              {availableColors.length > 0 && (
                <div className="mt-4 flex justify-start flex-col gap-2">
                  <div className="flex w-full justify-start gap-3 flex-wrap">
                    {availableColors.map((color) => (
                      <label
                        key={color.name}
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
                          onChange={() => setColor(color.name)}
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
              <AccessorySelector />
            </div>
          </div>
        </div>
      </section>
      <OrderSummaryPanel />
    </main>
  );
};

export default Page;
