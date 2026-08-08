import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pre-Owned Cargo Bikes Dubai | Second-Hand Family & Electric Bikes | along',
  description:
    'Browse pre-owned cargo bikes in Dubai and the UAE. Explore along pre-owned family and electric cargo bikes and contact us for pricing and availability.',
  alternates: {
    canonical: 'https://weridealong.com/pre-owned',
  },
  openGraph: {
    title: 'Pre-Owned Cargo Bikes Dubai | Second-Hand Family & Electric Bikes | along',
    description:
      'Browse pre-owned cargo bikes in Dubai and the UAE. Explore along pre-owned family and electric cargo bikes and contact us for pricing and availability.',
    url: 'https://weridealong.com/pre-owned',
    siteName: 'along',
    images: [
      {
        url: 'https://weridealong.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pre-owned cargo bikes Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pre-Owned Cargo Bikes Dubai | Second-Hand Family & Electric Bikes | along',
    description:
      'Browse pre-owned cargo bikes in Dubai and the UAE. Explore along pre-owned family and electric cargo bikes and contact us for pricing and availability.',
    images: ['https://weridealong.com/og-image.jpg'],
  },
};

export default function PreOwnedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
