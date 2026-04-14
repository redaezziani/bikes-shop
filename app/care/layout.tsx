import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'along Cargo Bikes Dubai | Warranty & Home Service UAE | Along Care Program',
  description:
    'Along Care includes home servicing, warranty, and certified support for cargo bikes across Dubai and the UAE. Ride with confidence every day.',
  alternates: {
    canonical: 'https://weridealong.com/care',
  },
  openGraph: {
    title: 'along Cargo Bikes Dubai | Warranty & Home Service UAE | Along Care Program',
    description:
      'Along Care includes home servicing, warranty, and certified support for cargo bikes across Dubai and the UAE. Ride with confidence every day.',
    url: 'https://weridealong.com/care',
    siteName: 'along',
    images: [
      {
        url: 'https://weridealong.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'along Care Program Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'along Cargo Bikes Dubai | Warranty & Home Service UAE | Along Care Program',
    description:
      'Along Care includes home servicing, warranty, and certified support for cargo bikes across Dubai and the UAE. Ride with confidence every day.',
    images: ['https://weridealong.com/og-image.jpg'],
  },
};

export default function CareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
