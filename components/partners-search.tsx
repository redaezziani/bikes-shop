'use client';

import { useState } from 'react';
import { Partner } from '@/types/along-care';

interface PartnersSearchProps {
  partners: Partner[];
}

export default function PartnersSearch({ partners }: PartnersSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = searchQuery
    ? partners.filter((partner) => {
        const query = searchQuery.toLowerCase();

        // Search by name
        const matchesName = partner.name.toLowerCase().includes(query);

        // Search by country
        const matchesCountry = partner.country.toLowerCase().includes(query);

        // Search by cities (check if any city matches)
        const matchesCity = partner.cities.some((city) =>
          city.toLowerCase().includes(query),
        );

        return matchesName || matchesCountry || matchesCity;
      })
    : partners;

  return (
    <section id="find-partner" className="w-full px-6 md:px-12 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">
            Find a Service Partner
          </h2>
          <p className="text-lg text-zinc-600">
            Our certified partners provide professional service using genuine
            parts.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <input
            id="partner-search"
            type="text"
            placeholder="Search by name, country, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg border-zinc-300 focus:outline-none focus:border-zinc-900"
          />
        </div>

        {/* Service Partners List */}
        <div className="space-y-4">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-zinc-50 p-6 border rounded-lg border-zinc-200"
              >
                <h3 className="text-xl font-bold text-zinc-900 mb-3">
                  {partner.name}
                </h3>
                <div className="space-y-2 text-zinc-700 mb-4">
                  <p className="font-medium">
                    <span className="text-zinc-500">Country:</span>{' '}
                    {partner.country}
                  </p>
                  <div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {partner.cities.map((city, index) => (
                        <span
                          key={index}
                          className="inline-block bg-white px-3 py-0.5 rounded-full text-sm border border-zinc-300"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
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
                No service partners found for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
