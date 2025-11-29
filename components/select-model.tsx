'use client';
import React from 'react';
import { useProductsStore } from '@/store/products';

const ModelSelector = () => {
  const products = useProductsStore((state) => state.products);

  console.log(products);
  const selectedProduct = useProductsStore((state) => state.selectedProduct);
  const setSelectedProduct = useProductsStore(
    (state) => state.setSelectedProduct,
  );

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
                  ? 'border-neutral-800 bg-neutral-100 ring-1 ring-neutral-800'
                  : 'border-neutral-300 hover:border-neutral-500'
              }
            `}
          >
            <input
              type="radio"
              name="model"
              value={item.id}
              checked={isActive}
              onChange={() => setSelectedProduct(item)}
              className="absolute inset-0 z-0 opacity-0 cursor-pointer"
            />

            <div className="flex flex-col gap-1 text-start">
              <h5
                className={`${
                  isActive ? 'text-neutral-900' : 'text-neutral-700'
                } font-medium text-sm`}
              >
                {item.name}
              </h5>
              <p className="text-neutral-600 text-xs">
                {item.short_description}
              </p>
            </div>

            <div className="text-end">
              <strong
                className={`${
                  isActive ? 'text-neutral-700' : 'text-neutral-500'
                } font-semibold text-sm`}
              >
                ${item.price}
              </strong>
              <span className="text-neutral-500 text-xs"> /mo</span>
            </div>
          </label>
        );
      })}
    </section>
  );
};

export default ModelSelector;
