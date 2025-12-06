'use client';

import { Offer } from '@/types/offers';
import Link from 'next/link';
import Image from 'next/image';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const imageUrl = offer.cover_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${offer.cover_image.url}`
    : '';

  const href = offer.link || '#';

  return (
    <Link href={href}>
      <article className="relative rounded-lg overflow-hidden h-[400px] bg-zinc-80le0">
        {imageUrl && (
          <>
            <Image
              src={imageUrl}
              alt={offer.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
            />
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-2xl font-bold">{offer.title}</h2>
          {offer.description && (
            <p className="text-sm mt-1 line-clamp-2 mb-6">
              {offer.description}
            </p>
          )}
          <div className="flex gap-3">
            <button
              className="bg-white min-w-40 text-gray-900 font-medium rounded-lg px-4 py-2 text-sm hover:bg-gray-100 transition"
              aria-label={`Learn more about ${offer.title}`}
            >
              {offer.button_text || 'Learn More'}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default OfferCard;
