import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cargo Bike Support Dubai | Help, Service & Contact UAE | along',
  description:
    'Need help with your cargo bike in Dubai? Contact along for support, service, and quick assistance across the UAE. Simple, fast, and reliable help.',
  alternates: {
    canonical: 'https://weridealong.com/support',
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
