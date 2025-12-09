import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { ToasterProvider } from '@/providers/Toaster';

export const metadata: Metadata = {
  title: 'Electric Cargo Bikes Dubai | E-Bike Delivery Solutions UAE',
  description:
    'Premium electric cargo bikes in Dubai. Explore our range of e-bikes perfect for deliveries, family transport, and urban mobility across the UAE. Free consultation available.',
  keywords:
    'electric cargo bikes Dubai, e-bike UAE, cargo bike delivery Dubai, electric bikes Dubai, family cargo bike, urban mobility Dubai, sustainable transport UAE',
  authors: [{ name: 'Your Shop Name' }],
  openGraph: {
    title: 'Electric Cargo Bikes Dubai | E-Bike Delivery Solutions UAE',
    description:
      'Premium electric cargo bikes in Dubai. Perfect for deliveries, family transport, and sustainable urban mobility across the UAE.',
    url: 'https://yourdomain.com',
    siteName: 'Your Shop Name',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'Electric cargo bikes in Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electric Cargo Bikes Dubai | E-Bike Delivery Solutions UAE',
    description:
      'Premium electric cargo bikes in Dubai. Perfect for deliveries, family transport, and sustainable urban mobility.',
    images: ['/twitter-image.jpg'], // Add your Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
  verification: {
    google: 'your-google-verification-code', // Add when you set up Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://api.alongweride.com" />
        <link rel="dns-prefetch" href="https://api.alongweride.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'Your Shop Name',
              image: 'https://yourdomain.com/logo.jpg',
              '@id': 'https://yourdomain.com',
              url: 'https://yourdomain.com',
              telephone: '+971-XX-XXX-XXXX', // Add your phone
              priceRange: 'AED',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Your Street Address',
                addressLocality: 'Dubai',
                addressRegion: 'Dubai',
                postalCode: 'XXXXX',
                addressCountry: 'AE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 25.2048, // Replace with your actual coordinates
                longitude: 55.2708,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '09:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '10:00',
                  closes: '17:00',
                },
              ],
              sameAs: [
                'https://www.facebook.com/yourpage', // Add your social media
                'https://www.instagram.com/yourpage',
                'https://www.linkedin.com/company/yourpage',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <QueryProvider>
          <ToasterProvider />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
