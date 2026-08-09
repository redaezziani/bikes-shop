'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HeaderDetailsPage from '@/components/header-v2';
import UsedModelSelector from '@/components/used-model-selector';
import { useUsedModels } from '@/store/used-products';
import ModelPreview from '@/components/model-preview';
import ProductImagePreview from '@/components/product-image-priview';
import FixedBottomBar from '@/components/fixed-bottom-bar';

const PreOwnedContent = () => {
  const { data, isLoading } = useUsedModels();

  const searchParams = useSearchParams();
  const documentIdFromUrl = searchParams.get('documentId');

  const usedModels = data?.data || [];

  const currentModel = useMemo(() => {
    if (usedModels.length === 0) return null;

    if (documentIdFromUrl) {
      const found = usedModels.find((m) => m.documentId === documentIdFromUrl);
      if (found) return found;
    }

    return null;
  }, [documentIdFromUrl, usedModels]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index whenever the selected model changes
  const currentModelId = currentModel?.documentId;
  useMemo(() => {
    setCurrentImageIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentModelId]);

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen gap-4 justify-center items-center">
        <main className="flex flex-col min-h-screen gap-4 justify-center items-center">
          <span className="flex gap-1 justify-center items-center">
            <div className="w-3 h-3 border-2 border-white/30 border-t-black rounded-full animate-spin" />
            Processing...
          </span>
        </main>
      </main>
    );
  }

  const allImages = currentModel
    ? (currentModel.images || []).filter((img) => !!img.url)
    : [];

  return (
    <main className="flex flex-col min-h-screen gap-4 justify-start items-center relative pb-32 md:pb-40">
      <HeaderDetailsPage />
      <section className="w-full max-w-7xl flex flex-col gap-2 justify-start items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 pb-10">
          <div className="flex w-full md:p-10 md:mt-14 sticky top-0 md:top-20 self-start z-10 bg-white md:bg-transparent">
            {currentModel ? (
              <>
                {allImages.length > 0 ? (
                  <span className="md:block hidden w-full">
                    <ProductImagePreview
                      images={allImages}
                      alt={currentModel.name}
                      current={currentImageIndex}
                      setCurrent={setCurrentImageIndex}
                    />
                  </span>
                ) : (
                  <div className="hidden md:flex w-full h-96 items-center justify-center bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-300">
                    <div className="text-center px-6">
                      <p className="text-zinc-500 font-medium text-lg mb-2">
                        No Images Available
                      </p>
                      <p className="text-zinc-400 text-sm">
                        Photos for this bike will be added soon
                      </p>
                    </div>
                  </div>
                )}
                {currentModel.images?.[0]?.url ? (
                  <span className="block md:hidden w-full">
                    <ModelPreview
                      name={currentModel.name}
                      image={currentModel.images[0].url}
                      id={currentModel.documentId}
                    />
                  </span>
                ) : (
                  <div className="flex md:hidden w-full h-96 items-center justify-center bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-300">
                    <div className="text-center px-6">
                      <p className="text-zinc-500 font-medium text-lg mb-2">
                        No Images Available
                      </p>
                      <p className="text-zinc-400 text-sm">
                        Photos for this bike will be added soon
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-300" />
            )}
          </div>
          <div className="flex flex-col border-l border-zinc-300/26 md:mt-32 gap-6">
            {currentModel && (
              <>
                <div className="flex px-4 flex-col gap-1 justify-center items-center text-center">
                  <h2 className="text-xl font-semibold text-zinc-900">
                    {currentModel.name}
                  </h2>
                </div>

                <span className="w-full bg-zinc-400/35 h-px" />
              </>
            )}

            <UsedModelSelector usedModels={usedModels} />

            <p className="px-4 text-center text-xs text-zinc-500">
              Don&apos;t see what you&apos;re looking for? Send us a WhatsApp
              message, and we&apos;ll help you find the right bike.
            </p>
          </div>
        </div>
      </section>

      <FixedBottomBar />
    </main>
  );
};

export default PreOwnedContent;
