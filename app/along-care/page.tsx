'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer className="w-full bg-white py-12 px-6 text-center text-sm text-zinc-500 border-t border-zinc-200">
    <p>© 2025 along · Leap Originals FZ-LLC</p>
  </footer>
);

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
    <main className="flex flex-col w-full bg-white items-center">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6">
            Along Care
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-800 font-medium mb-4 leading-relaxed">
            With Along Care, You Get At-Home Service And 3 Year Warranty
            Included With Every Bike.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full px-6 md:px-12 py-12 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-zinc-700 leading-relaxed">
            {/* Key Benefits */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                What&apos;s Included
              </h2>
              <p className="text-lg mb-4">
                With Along Care, every bike comes with free at-home service and
                a full 3-year warranty*.
              </p>
            </div>

            {/* At-Home Service */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
              <h3 className="text-xl font-bold text-zinc-900 mb-4">
                At-Home Service
              </h3>
              <div className="space-y-4">
                <p>
                  A certified Along Care service partner visits your home the
                  day after delivery to complete a full quality check and
                  safety briefing. Follow up at-home service after 3 months is
                  also included.
                </p>
                <p>
                  All our service partners are professionally trained and follow
                  along&apos;s strict quality and safety standards, ensuring
                  consistent and reliable service wherever you are in the UAE.
                </p>
              </div>
            </div>

            {/* Warranty Coverage */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
              <h3 className="text-xl font-bold text-zinc-900 mb-4">
                Warranty Coverage
              </h3>
              <div className="space-y-4">
                <p>
                  Your bike is protected with a 3-year frame warranty and an
                  18-month warranty on all other components.
                </p>
                <p className="text-sm text-zinc-600 italic">
                  Terms and conditions apply — see our full warranty policy for
                  details.
                </p>
              </div>
            </div>

            {/* Maintenance Recommendations */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
              <h3 className="text-xl font-bold text-zinc-900 mb-4">
                Regular Maintenance
              </h3>
              <p>
                To keep your bike performing at its best, we recommend a
                service every 6 months with one of our certified partners.
                Regular servicing also helps maintain full warranty coverage.
              </p>
            </div>

            {/* Support */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
              <h3 className="text-xl font-bold text-zinc-900 mb-4">
                Need Help?
              </h3>
              <p>
                If you have questions or want to start a warranty claim, contact
                us anytime.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-12 justify-center">
            <Link href="/contact">
              <button className="bg-zinc-900 text-white font-semibold rounded-lg px-8 py-4 text-base hover:bg-zinc-800 transition w-full md:w-auto">
                Contact Us
              </button>
            </Link>
            <a href="#find-partner">
              <button className="bg-white border-2 border-zinc-900 text-zinc-900 font-semibold rounded-lg px-8 py-4 text-base hover:bg-zinc-50 transition w-full md:w-auto">
                Find Service Partner
              </button>
            </a>
            <Link href="/warranty-policy">
              <button className="bg-white border-2 border-zinc-900 text-zinc-900 font-semibold rounded-lg px-8 py-4 text-base hover:bg-zinc-50 transition w-full md:w-auto">
                Warranty Policy
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Service Partner Section */}
      <section
        id="find-partner"
        className="w-full px-6 md:px-12 py-12 md:py-20 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              Find a Certified Service Partner
            </h2>
            <p className="text-lg text-zinc-700 max-w-3xl mx-auto">
              We work with trained and approved partners who follow
              along&apos;s strict quality standards and use genuine spare parts.
              Find and contact your nearest certified partner to book service
              or maintenance below.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="max-w-xl mx-auto">
              <label
                htmlFor="city-search"
                className="block text-sm font-medium text-zinc-700 mb-2"
              >
                Search By City
              </label>
              <input
                id="city-search"
                type="text"
                placeholder="Enter city name..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              />
            </div>
          </div>

          {/* Service Partners List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.length > 0 ? (
              filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white border border-zinc-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">
                    {partner.name}
                  </h3>
                  <div className="space-y-2 text-zinc-700">
                    <p className="text-sm">
                      <span className="font-semibold">City:</span>{' '}
                      {partner.city}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Area:</span>{' '}
                      {partner.area}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Phone:</span>{' '}
                      <a
                        href={`tel:${partner.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {partner.phone}
                      </a>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Email:</span>{' '}
                      <a
                        href={`mailto:${partner.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {partner.email}
                      </a>
                    </p>
                  </div>
                  <button className="mt-4 w-full bg-zinc-900 text-white font-medium rounded-lg px-4 py-2 text-sm hover:bg-zinc-800 transition">
                    Contact Partner
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
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
  );
}
