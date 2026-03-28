import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Cargo Bike Dubai | Order Family & Electric Bikes UAE | along',
  description:
    'Buy cargo bikes in Dubai and the UAE. Explore along family and electric cargo bikes, check pricing, and order online with delivery and home setup included.',
  alternates: {
    canonical: 'https://weridealong.com/order',
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
