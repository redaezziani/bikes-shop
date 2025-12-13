'use client';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductImagePreviewProps {
  images: string[];
  alt?: string;
  current: number;
  setCurrent: (index: number) => void;
}

export default function ProductImagePreview({
  images,
  alt = 'Product image',
  current,
  setCurrent,
}: ProductImagePreviewProps) {

  const prevImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className=" flex flex-col gap-4">
      <span
        className="relative bg-zinc-100 md:bg-transparent rounded w-full aspect-square h-auto overflow-hidden"
        aria-label="Product main image"
        role="img"
      >
        <div className="absolute flex gap-2 justify-center items-center right-2 top-2 z-10">
          <button
            aria-label="Previous image"
            onClick={prevImage}
            className="p-1  cursor-pointer rounded-full transition"
          >
            <IconChevronLeft className="text-zinc-700" size={20} />
          </button>

          <button
            aria-label="Next image"
            onClick={nextImage}
            className="p-1 cursor-pointer  rounded-full transition"
          >
            <IconChevronRight className="text-zinc-900" size={20} />
          </button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${images[current]}`}
            alt={alt}
            className="object-cover w-full h-full"
            sizes="100%"
          />
        </AnimatePresence>
      </span>

      <div className="grid grid-cols-6  md:hidden mt-4 w-full gap-2">
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
  );
}
