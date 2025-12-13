'use client';

import { useState } from 'react';
import {
  IconArrowRight,
} from '@tabler/icons-react';
import Link from 'next/link';

interface ProductInfoProps {
  title: string;
  description: string;
  priceAED: number;
  priceUSD: number;
  colors?: { name: string; hex: string }[];
  documentId: string;
  images: string[];
  current: number;
  setCurrent: (index: number) => void;
}

export default function ProductInfo({
  title,
  description,
  priceAED,
  priceUSD,
  colors = [],
  documentId,
  images,
  current,
  setCurrent,
}: ProductInfoProps) {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '');

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));

  return (
    <section className=" flex flex-col gap-4">
      <div className="flex flex-col gap-1 mt-5 md:mt-0 justify-start items-start">
        <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>

      <div className="flex mt-5 gap-4 flex-wrap  justify-start items-center w-full">
        <div className=" hidden items-center gap-2 border border-zinc-500 rounded-lg px-3 py-1.5 bg-white shadow-sm">
          <button
            onClick={decrease}
            aria-label="Decrease quantity"
            className="text-zinc-700 hover:text-zinc-900 px-2 font-semibold"
          >
            -
          </button>

          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            aria-label="Product quantity"
            className="w-12 text-center bg-transparent outline-none text-zinc-800 font-medium"
          />

          <button
            onClick={increase}
            aria-label="Increase quantity"
            className="text-zinc-700 hover:text-zinc-900 px-2 font-semibold"
          >
            +
          </button>
        </div>
        <div className="flex w-full justify-end items-end">
          {colors.length > 0 && (
            <div className=" flex w-full justify-start flex-col gap-2">
              <div className="flex w-full justify-start gap-3 flex-wrap">
                {colors.map((color) => (
                  <label
                    key={color.name}
                    className={`cursor-pointer flex overflow-hidden items-center gap-2 border-2 rounded-lg size-8  bg-white  transition 
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

                    {color.hex.includes('-') ? (
                      // Dual color display - split the hex and show both colors
                      <>
                        <span
                          className="size-full"
                          style={{
                            background: `linear-gradient(45deg, ${
                              color.hex.split('-')[0]
                            } 50%, ${color.hex.split('-')[1]} 50%)`,
                          }}
                        ></span>
                      </>
                    ) : (
                      // Single color display
                      <span
                        className="size-full"
                        style={{ backgroundColor: color.hex }}
                      ></span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}
          <p className="text-zinc-800 font-semibold whitespace-nowrap">
            AED {Math.round(priceAED)}
          </p>
        </div>
        <Link className=" w-full" href={`/order?documentId=${documentId}`}>
          <button
            aria-label="Order product now"
            className="bg-zinc-900 mt-4 capitalize  cursor-pointer w-full  font-medium hover:gap-2 transition-all ease-in-out rounded-xl py-2 px-3 flex text-zinc-50 gap-1 justify-center items-center"
          >
            <p>order now</p>
            <IconArrowRight size={18} />
          </button>
        </Link>

        <div className="hidden md:grid grid-cols-6 mt-4 w-full gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Select image ${i + 1}`}
              className={`relative w-full aspect-square rounded bg-zinc-100 overflow-hidden border-2 ${
                current === i ? 'border-zinc-800' : 'border-transparent'
              }`}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img}`}
                alt={`Thumbnail ${i + 1}`}
                width={100}
                height={100}
                sizes="100%"
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
