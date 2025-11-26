'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductImagePreviewProps {
  images: string[];
  alt?: string;
}

export default function ProductImagePreview({
  images,
  alt = 'Product image',
}: ProductImagePreviewProps) {
  const [current, setCurrent] = useState(0);

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <span
        className="relative bg-neutral-100 rounded w-full aspect-square h-auto overflow-hidden"
        aria-label="Product main image"
        role="img"
      >
        <div className="absolute flex gap-2 justify-center items-center right-2 top-2 z-10">
          <button
            aria-label="Previous image"
            onClick={prevImage}
            className="p-1  cursor-pointer rounded-full transition"
          >
            <IconChevronLeft className="text-neutral-700" size={20} />
          </button>

          <button
            aria-label="Next image"
            onClick={nextImage}
            className="p-1 cursor-pointer  rounded-full transition"
          >
            <IconChevronRight className="text-neutral-900" size={20} />
          </button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current} // This is critical!
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            src={images[current]}
            alt={alt}
            className="object-cover w-full h-full"
            sizes="100%"
          />
        </AnimatePresence>
      </span>

      <div className="grid grid-cols-5 mt-4 w-full gap-2">
        {images.slice(0, 5).map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Select image ${i + 1}`}
            className={`relative rounded bg-neutral-100 aspect-square overflow-hidden border-2 ${
              current === i ? 'border-neutral-800' : 'border-transparent'
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="100%"
            />
          </button>
        ))}
      </div>
    </>
  );
}
