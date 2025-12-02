'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const ModelSelector = ({ products }: { products: any[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const documentIdFromUrl = searchParams.get('documentId');

  // 🔥 Auto-select product when URL contains ?documentId=xxx
  useEffect(() => {
    if (!documentIdFromUrl || products.length === 0) return;

    const found = products.find((p) => p.documentId === documentIdFromUrl);

    if (found && found.id !== selectedProduct?.id) {
      setSelectedProduct(found);
    }
  }, [documentIdFromUrl, products, selectedProduct]);

  const handleSelect = (item: any) => {
    setSelectedProduct(item);

    // 🔥 Update URL with selected model documentId
    router.push(`/order?documentId=${item.documentId}`, { scroll: false });
  };

  return (
    <section className="px-4 grid w-full grid-cols-1 md:grid-cols-3 gap-4">
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
              <p className="text-zinc-600 text-xs">{item.short_description}</p>
            </div>

            <div className="text-end">
              <strong
                className={`${
                  isActive ? 'text-zinc-700' : 'text-zinc-500'
                } font-semibold text-sm`}
              >
                ${item.price}
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
