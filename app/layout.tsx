import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { ToasterProvider } from '@/providers/Toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'along Cargo Bikes Dubai | Family Cargo Bikes UAE | Test Ride',
  description:
    'Front loader family cargo bikes for Dubai and the UAE. Safe, fun, and built for school runs, family rides, and daily life. Book a free test ride.',
  keywords:
    'Cargo bike Dubai, Cargo bike UAE, Family bike Dubai, Electric Cargo Bike Dubai, Electric Cargo Bike UAE, Front loader cargo bike, 3 wheel cargo bike Dubai, tricycles, Bike with Child Seat, outdoor family activities Dubai, active parenting Dubai, family lifestyle Dubai, shared experiences with children, family bonding activities, sensory experience for kids, Bonding with young children Dubai',
  authors: [{ name: 'along' }],
  openGraph: {
    title: 'along Cargo Bikes Dubai | Family Cargo Bikes UAE | Test Ride',
    description:
      'Front loader family cargo bikes for Dubai and the UAE. Safe, fun, and built for school runs, family rides, and daily life. Book a free test ride.',
    url: 'https://weridealong.com',
    siteName: 'along',
    images: [
      {
        url: '/along-logo.svg',
        width: 1200,
        height: 630,
        alt: 'along family cargo bikes in Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'along Cargo Bikes Dubai | Family Cargo Bikes UAE | Test Ride',
    description:
      'Front loader family cargo bikes for Dubai and the UAE. Safe, fun, and built for school runs, family rides, and daily life. Book a free test ride.',
    images: ['/along-logo.svg'],
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
    canonical: 'https://weridealong.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://api.weridealong.com" />
        <link rel="dns-prefetch" href="https://api.weridealong.com" />

        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'along',
              image: 'https://weridealong.com/along-logo.svg',
              '@id': 'https://weridealong.com',
              url: 'https://weridealong.com',
              telephone: '+971523160662',
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
                'https://www.instagram.com/alongcargobikes',
                'https://www.linkedin.com/company/alongcargobikes/',
                'https://youtube.com/@along_cargo_bikes',
                'https://www.komoot.com/user/along',
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
