'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/types/products';

const ModelSelector = ({ products }: { products: Product[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const documentIdFromUrl = searchParams.get('documentId');

  // Derive selected product from URL and products list
  const selectedProduct = products.find((p) => p.documentId === documentIdFromUrl) || null;

  const handleSelect = (item: Product) => {
    router.push(`/order?documentId=${item.documentId}`, { scroll: false });
  };

  return (
    <section className="px-4 grid w-full grid-cols-1  gap-4">
      {products.map((item) => {
        const isActive = selectedProduct?.id === item.id;

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
              name="model"
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
              <p className="text-zinc-600 line-clamp-3 text-xs">
                {item.short_description}
              </p>
            </div>

            <div className="text-end">
              <strong
                className={`${
                  isActive ? 'text-zinc-700' : 'text-zinc-500'
                } font-semibold text-sm`}
              >
                AED {item.price}
              </strong>
              <span className="text-zinc-500 text-xs"> /mo</span>
            </div>
          </label>
        );
      })}
    </section>
  );
};

export default ModelSelector;
