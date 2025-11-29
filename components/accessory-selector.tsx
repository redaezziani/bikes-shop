'use client';
import React, { useState, useCallback } from 'react';
import { useOrderStore } from '@/store/order';

const AccessorySelector = ({ product }: { product: any }) => {
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);

  const toggleAccessory = useCallback((accessoryId: number) => {
    setSelectedAccessories((prev) =>
      prev.includes(accessoryId)
        ? prev.filter((id) => id !== accessoryId)
        : [...prev, accessoryId],
    );
  }, []);

  const availableAccessories = product?.available_accessories || [];

  console.log(availableAccessories);

  return (
    <section className="px-4 grid w-full grid-cols-1 md:grid-cols-3 gap-4">
      {availableAccessories.map((item: any) => {
        const isActive = selectedAccessories.includes(item.id);

        return (
          <label
            key={item.id}
            className={`
              relative w-full cursor-pointer rounded-md border p-3 
              flex gap-3 transition
              ${
                isActive
                  ? 'border-neutral-800 bg-neutral-100 ring-1 ring-neutral-800'
                  : 'border-neutral-300 hover:border-neutral-500'
              }
            `}
          >
            <span
              className={`
                absolute top-2 left-2 h-4 w-4 flex items-center justify-center rounded-sm border
                ${
                  isActive
                    ? 'bg-neutral-800 border-neutral-800'
                    : 'bg-white border-neutral-400'
                }
              `}
            >
              {isActive && (
                <svg
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 103.293 9.293l4 4a1 1 0 001.414 0l8-8z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>

            <input
              type="checkbox"
              checked={isActive}
              onChange={() => toggleAccessory(item.id)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                item.image?.url || '/placeholder.png'
              }`}
              alt={item.title || item.title || 'Accessory'}
              className="w-1/2 h-16 object-contain rounded"
            />

            <div className="flex flex-col gap-1">
              <h5
                className={`text-sm font-semibold ${
                  isActive ? 'text-neutral-900' : 'text-neutral-700'
                }`}
              >
                {item.title}
              </h5>
              <p className="text-neutral-600 text-xs">{item.description}</p>
            </div>

            <div className="text-start">
              <strong
                className={`text-sm font-semibold ${
                  isActive ? 'text-neutral-900' : 'text-neutral-600'
                }`}
              >
                {item.price === 0 ? 'Free' : `$ ${item.price}`}
              </strong>
            </div>
          </label>
        );
      })}
    </section>
  );
};

export default AccessorySelector;
