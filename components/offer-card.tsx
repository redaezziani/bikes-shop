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
    <article className="flex flex-col rounded-lg overflow-hidden border border-zinc-200 bg-white  transition-shadow">
      {imageUrl && (
        <div className="relative w-full h-[240px]">
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
        </div>
      )}

      <div className="flex flex-col bg-zinc-50 grow p-6">
        <h2 className="text-xl font-bold text-zinc-900 mb-3">{offer.title}</h2>
        {offer.description && (
          <p className="text-sm text-zinc-600 mb-6 line-clamp-3 grow">
            {offer.description}
          </p>
        )}
        <Link
          href={href}
          className="bg-zinc-100 max-w-[70%] text-zinc-800 font-medium rounded-lg px-6 py-3 text-sm hover:bg-zinc-200 transition text-center"
          aria-label={`View offer details: ${offer.title}`}
        >
          {offer.button_text || 'View Offer Details'}
        </Link>
      </div>
    </article>
  );
};

export default OfferCard;
