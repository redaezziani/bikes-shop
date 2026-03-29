'use client';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { PreviewImage } from '@/types/products';

interface ProductImagePreviewProps {
  images: PreviewImage[];
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
  const safeIndex = Math.min(current, images.length - 1);

  const prevImage = () => {
    setCurrent(safeIndex === 0 ? images.length - 1 : safeIndex - 1);
  };

  const nextImage = () => {
    setCurrent(safeIndex === images.length - 1 ? 0 : safeIndex + 1);
  };

  return (
    <div className=" flex flex-col gap-4">
      <div
        className="relative bg-zinc-100  border-zinc-200 border-2 md:bg-transparent rounded w-full aspect-square overflow-hidden block"
        aria-label={`Product image gallery, showing image ${safeIndex + 1} of ${images.length}`}
        role="region"
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
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${images[safeIndex].url}`}
              alt={`${alt} - ${safeIndex + 1} of ${images.length}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={safeIndex === 0}
              placeholder={images[safeIndex].blurDataURL ? 'blur' : 'empty'}
              {...(images[safeIndex].blurDataURL && {
                blurDataURL: images[safeIndex].blurDataURL,
              })}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-6  md:hidden mt-4 w-full gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`View image ${i + 1} of ${images.length}`}
            aria-current={safeIndex === i ? 'true' : undefined}
            className={`relative w-full aspect-square rounded bg-zinc-100 overflow-hidden border-2 ${
              safeIndex === i ? 'border-zinc-800' : 'border-zinc-200'
            }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="10vw"
              className="object-cover"
              placeholder={img.blurDataURL ? 'blur' : 'empty'}
              {...(img.blurDataURL && { blurDataURL: img.blurDataURL })}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
