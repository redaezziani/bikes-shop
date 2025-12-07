'use client';

import { Offer } from '@/types/offers';
import OfferCard from './offer-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

interface OffersSectionProps {
  offers: Offer[];
}

const OffersSection = ({ offers }: OffersSectionProps) => {
  return (
    <section className="w-full pl-4 pb-5 bg-white">
      {offers.length > 0 ? (
        <>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            centeredSlides={false}
            pagination={{ clickable: true }}
            className="px-4 offers-swiper"
          >
            {offers.map((offer) => (
              <SwiperSlide key={offer.id}>
                <OfferCard offer={offer} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className="text-center py-12 px-4">
          <p className="text-zinc-600">No offers available yet.</p>
        </div>
      )}

     
    </section>
  );
};

export default OffersSection;
