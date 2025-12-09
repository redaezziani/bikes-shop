'use client';

import { Offer } from '@/types/offers';
import OfferCard from './offer-card';

interface OffersSectionProps {
  offers: Offer[];
}

const OffersSection = ({ offers }: OffersSectionProps) => {
  return (
    <section className="w-full px-4 pb-5 bg-white">
      {offers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <p className="text-zinc-600">No offers available yet.</p>
        </div>
      )}
    </section>
  );
};

export default OffersSection;
