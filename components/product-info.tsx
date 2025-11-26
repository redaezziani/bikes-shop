'use client';

import { useState } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';

interface ProductInfoProps {
  title: string;
  description: string;
  priceAED: number;
  priceUSD: number;
  colors?: { name: string; hex: string }[];
}

export default function ProductInfo({
  title,
  description,
  priceAED,
  priceUSD,
  colors = [],
}: ProductInfoProps) {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '');

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));

  return (
    <>
      <div className="flex flex-col gap-1 mt-5 justify-start items-start">
        <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
        <p className="text-neutral-500 text-sm">{description}</p>
      </div>

      {colors.length > 0 && (
        <div className="mt-4 flex w-full justify-start flex-col gap-2">
          <p className="text-neutral-700 font-medium text-sm">Choose Color</p>

          <div className="flex w-full justify-start gap-3 flex-wrap">
            {colors.map((color) => (
              <label
                key={color.name}
                className={`cursor-pointer flex overflow-hidden items-center gap-2 border-2 rounded-lg size-8  bg-white  transition 
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
                  className="size-full "
                  style={{ backgroundColor: color.hex }}
                ></span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex mt-5 gap-4 flex-wrap justify-start items-center w-full">
        <div className="flex items-center gap-2 border border-neutral-500 rounded-lg px-3 py-1.5 bg-white shadow-sm">
          <button
            onClick={decrease}
            aria-label="Decrease quantity"
            className="text-neutral-700 hover:text-neutral-900 px-2 font-semibold"
          >
            -
          </button>

          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            aria-label="Product quantity"
            className="w-12 text-center bg-transparent outline-none text-neutral-800 font-medium"
          />

          <button
            onClick={increase}
            aria-label="Increase quantity"
            className="text-neutral-700 hover:text-neutral-900 px-2 font-semibold"
          >
            +
          </button>
        </div>

        <p className="text-neutral-800 font-semibold whitespace-nowrap">
          {priceAED} AED / {priceUSD} $
        </p>

        <button
          aria-label="Order product now"
          className="bg-neutral-900 focus:ring cursor-pointer w-full border font-medium rounded-lg py-2 px-3 flex text-neutral-50 gap-1 justify-center items-center"
        >
          <p>order now</p>
          <IconShoppingCart size={20} />
        </button>
      </div>
    </>
  );
}
