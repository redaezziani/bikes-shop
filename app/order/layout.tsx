import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Cargo Bike Dubai | Order Family & Electric Bikes UAE | along',
  description:
    'Buy cargo bikes in Dubai and the UAE. Explore along family and electric cargo bikes, check pricing, and order online with delivery and home setup included.',
  alternates: {
    canonical: 'https://weridealong.com/order',
  },
  openGraph: {
    title: 'Buy Cargo Bike Dubai | Order Family & Electric Bikes UAE | along',
    description:
      'Buy cargo bikes in Dubai and the UAE. Explore along family and electric cargo bikes, check pricing, and order online with delivery and home setup included.',
    url: 'https://weridealong.com/order',
    siteName: 'along',
    images: [
      {
        url: 'https://weridealong.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Order cargo bike Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Cargo Bike Dubai | Order Family & Electric Bikes UAE | along',
    description:
      'Buy cargo bikes in Dubai and the UAE. Explore along family and electric cargo bikes, check pricing, and order online with delivery and home setup included.',
    images: ['https://weridealong.com/og-image.jpg'],
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
