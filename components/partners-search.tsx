'use client';

import { useState } from 'react';
import { Partner } from '@/types/along-care';

interface PartnersSearchProps {
  partners: Partner[];
}

export default function PartnersSearch({ partners }: PartnersSearchProps) {
  const [searchCity, setSearchCity] = useState('');

  const filteredPartners = searchCity
    ? partners.filter((partner) =>
        partner.city.toLowerCase().includes(searchCity.toLowerCase())
      )
    : partners;

  return (
    <section id="find-partner" className="w-full px-6 md:px-12 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            Find a Service Partner
          </h2>
          <p className="text-lg text-zinc-600">
            Our certified partners provide professional service using genuine parts.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <input
            id="city-search"
            type="text"
            placeholder="Search by city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full px-4 py-3 border border-zinc-300 focus:outline-none focus:border-zinc-900"
          />
        </div>

        {/* Service Partners List */}
        <div className="space-y-4">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-zinc-50 p-6 border border-zinc-200"
              >
                <h3 className="text-xl font-bold text-zinc-900 mb-3">
                  {partner.name}
                </h3>
                <div className="space-y-1 text-zinc-700 mb-4">
                  <p>{partner.city}, {partner.country}</p>
                </div>
                {partner.link && (
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-zinc-900 text-white font-medium px-6 py-2 rounded-xl hover:bg-zinc-800 transition"
                  >
                    Visit Partner
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-600">
                No service partners found for &quot;{searchCity}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
