import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Cycling Tips, Guides & Stories | Electric Cargo Bikes Dubai',
  description:
    'Discover insights, tips, and stories about bikes, riding techniques, and cycling lifestyle. Expert guides on electric cargo bikes, bike maintenance, safety tips, and more.',
  keywords:
    'cycling blog, bike tips, electric bike guides, cargo bike safety, cycling lifestyle Dubai, bike maintenance tips, cycling stories UAE',
  openGraph: {
    title: 'Blog - Cycling Tips, Guides & Stories',
    description:
      'Discover insights, tips, and stories about bikes, riding techniques, and cycling lifestyle. Expert guides on electric cargo bikes and more.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
