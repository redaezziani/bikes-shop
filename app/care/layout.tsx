import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'along Cargo Bikes Dubai | Warranty & Home Service UAE | Along Care Program',
  description:
    'Along Care includes home servicing, warranty, and certified support for cargo bikes across Dubai and the UAE. Ride with confidence every day.',
  alternates: {
    canonical: 'https://weridealong.com/care',
  },
};

export default function CareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
