import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Used Cargo Bikes Dubai | Second-Hand Family & Electric Bikes | along',
  description:
    'Browse second-hand cargo bikes in Dubai and the UAE. Explore along used family and electric cargo bikes and contact us for pricing and availability.',
  alternates: {
    canonical: 'https://weridealong.com/used-models',
  },
  openGraph: {
    title: 'Used Cargo Bikes Dubai | Second-Hand Family & Electric Bikes | along',
    description:
      'Browse second-hand cargo bikes in Dubai and the UAE. Explore along used family and electric cargo bikes and contact us for pricing and availability.',
    url: 'https://weridealong.com/used-models',
    siteName: 'along',
    images: [
      {
        url: 'https://weridealong.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Used cargo bikes Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Used Cargo Bikes Dubai | Second-Hand Family & Electric Bikes | along',
    description:
      'Browse second-hand cargo bikes in Dubai and the UAE. Explore along used family and electric cargo bikes and contact us for pricing and availability.',
    images: ['https://weridealong.com/og-image.jpg'],
  },
};

export default function UsedModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
