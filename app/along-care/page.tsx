'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function AlongCarePage() {
  const [searchCity, setSearchCity] = useState('');

  // Mock service partners data - replace with actual data from Strapi
  const servicePartners = [
    {
      id: 1,
      name: 'Dubai Bike Care',
      city: 'Dubai',
      area: 'Jumeirah',
      phone: '+971 50 123 4567',
      email: 'dubai@bikescare.ae',
    },
    {
      id: 2,
      name: 'Abu Dhabi Cycling Center',
      city: 'Abu Dhabi',
      area: 'Al Reem Island',
      phone: '+971 50 234 5678',
      email: 'abudhabi@cyclingcenter.ae',
    },
    {
      id: 3,
      name: 'Sharjah Service Hub',
      city: 'Sharjah',
      area: 'Al Majaz',
      phone: '+971 50 345 6789',
      email: 'sharjah@servicehub.ae',
    },
  ];

  const filteredPartners = searchCity
    ? servicePartners.filter((partner) =>
        partner.city.toLowerCase().includes(searchCity.toLowerCase())
      )
    : servicePartners;

  return (
    <>
      <Header />
      <main className="flex flex-col w-full bg-white items-center">
        {/* Hero Section */}
        <section className="w-full px-6 md:px-12 py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6">
            Along Care
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed">
            Free at-home service and 3-year warranty included with every bike.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full px-6 md:px-12 py-16 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* At-Home Service */}
            <div className="bg-white p-8 md:p-12 rounded-lg">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                At-Home Service
              </h2>
              <p className="text-lg text-zinc-700 mb-4 leading-relaxed">
                A certified Along Care service partner visits your home the
                day after delivery to complete a full quality check and
                safety briefing. Follow-up service after 3 months is also included.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                All our service partners are professionally trained and follow
                along&apos;s strict quality and safety standards, ensuring
                consistent and reliable service wherever you are in the UAE.
              </p>
            </div>

            {/* Warranty Coverage */}
            <div className="bg-white p-8 md:p-12 rounded-lg">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                Warranty Coverage
              </h2>
              <p className="text-lg text-zinc-700 mb-6 leading-relaxed">
                Your bike is protected with a 3-year frame warranty and an
                18-month warranty on all other components.
              </p>
              <p className="text-sm text-zinc-500 italic">
                Terms and conditions apply — see our full warranty policy for details.
              </p>
            </div>

            {/* Maintenance */}
            <div className="bg-white p-8 md:p-12 rounded-lg">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                Regular Maintenance
              </h2>
              <p className="text-lg text-zinc-700 leading-relaxed">
                To keep your bike performing at its best, we recommend a
                service every 6 months with one of our certified partners.
                Regular servicing also helps maintain full warranty coverage.
              </p>
            </div>

            {/* Support */}
            <div className="bg-white p-8 md:p-12 rounded-lg">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                Need Help?
              </h2>
              <p className="text-lg text-zinc-700 leading-relaxed">
                If you have questions or want to start a warranty claim, contact
                us anytime.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link href="/contact" className="flex-1">
              <button className="w-full bg-zinc-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-zinc-800 transition">
                Contact Us
              </button>
            </Link>
            <a href="#find-partner" className="flex-1">
              <button className="w-full border border-zinc-900 text-zinc-900 font-medium px-6 py-3 rounded-xl hover:bg-zinc-50 transition">
                Find Service Partner
              </button>
            </a>
            <Link href="/warranty-policy" className="flex-1">
              <button className="w-full border border-zinc-300 text-zinc-700 font-medium px-6 py-3 rounded-xl hover:bg-zinc-50 transition">
                Warranty Policy
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Service Partner Section */}
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
                    <p>{partner.city}, {partner.area}</p>
                    <p>
                      <a href={`tel:${partner.phone}`} className="hover:underline">
                        {partner.phone}
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${partner.email}`} className="hover:underline">
                        {partner.email}
                      </a>
                    </p>
                  </div>
                  <button className="bg-zinc-900 text-white font-medium px-6 py-2 rounded-xl hover:bg-zinc-800 transition">
                    Contact Partner
                  </button>
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

      <Footer />
    </main>
    </>
  );
}
