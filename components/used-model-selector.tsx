'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { UsedModel } from '@/types/used-models';
import { formatPrice } from '@/lib/format-price';

const UsedModelSelector = ({ usedModels }: { usedModels: UsedModel[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const documentIdFromUrl = searchParams.get('documentId');

  const selectedModel =
    usedModels.find((m) => m.documentId === documentIdFromUrl) || null;

  const handleSelect = (item: UsedModel) => {
    router.push(`/pre-owned?documentId=${item.documentId}`, {
      scroll: false,
    });
  };

  return (
    <section className="px-4 grid w-full grid-cols-1  gap-4">
      {usedModels.map((item) => {
        const isActive = selectedModel?.id === item.id;

        return (
          <label
            key={item.id}
            className={`
              relative w-full cursor-pointer rounded-md border py-3.5 px-2.5
              flex justify-between items-center gap-2 transition
              ${
                isActive
                  ? 'border-zinc-800 bg-zinc-100 ring-1 ring-zinc-800'
                  : 'border-zinc-300 hover:border-zinc-500'
              }
            `}
          >
            <input
              type="radio"
              name="used-model"
              value={item.id}
              checked={isActive}
              onChange={() => handleSelect(item)}
              className="absolute inset-0 z-0 opacity-0 cursor-pointer"
            />

            <div className="flex flex-col gap-1 text-start">
              <h5
                className={`${
                  isActive ? 'text-zinc-900' : 'text-zinc-700'
                } font-medium text-sm`}
              >
                {item.name}
              </h5>
              {item.description && (
                <p className="text-zinc-600 line-clamp-3 text-xs">
                  {item.description}
                </p>
              )}
            </div>

            <div className="text-end">
              <strong
                className={`${
                  isActive ? 'text-zinc-700' : 'text-zinc-500'
                } font-semibold text-sm`}
              >
                {formatPrice(item.price)}
              </strong>
            </div>
          </label>
        );
      })}
    </section>
  );
};

export default UsedModelSelector;
