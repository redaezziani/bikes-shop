import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cargo Bike Support Dubai | Help, Service & Contact UAE | along',
  description:
    'Need help with your cargo bike in Dubai? Contact along for support, service, and quick assistance across the UAE. Simple, fast, and reliable help.',
  alternates: {
    canonical: 'https://weridealong.com/support',
  },
  openGraph: {
    title: 'Cargo Bike Support Dubai | Help, Service & Contact UAE | along',
    description:
      'Need help with your cargo bike in Dubai? Contact along for support, service, and quick assistance across the UAE. Simple, fast, and reliable help.',
    url: 'https://weridealong.com/support',
    siteName: 'along',
    images: [
      {
        url: 'https://weridealong.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'along cargo bike support Dubai',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cargo Bike Support Dubai | Help, Service & Contact UAE | along',
    description:
      'Need help with your cargo bike in Dubai? Contact along for support, service, and quick assistance across the UAE. Simple, fast, and reliable help.',
    images: ['https://weridealong.com/og-image.jpg'],
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
