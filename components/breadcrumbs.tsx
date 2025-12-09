'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChevronRight } from '@tabler/icons-react';

interface BreadcrumbsProps {
  customLabels?: Record<string, string>;
  className?: string;
}

export default function Breadcrumbs({ customLabels = {}, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Default labels for common paths
  const defaultLabels: Record<string, string> = {
    'along-care': 'Along Care',
    'privacy-policy': 'Privacy Policy',
    'shipping-returns': 'Shipping and Returns',
    'terms-conditions': 'Terms & Conditions',
    'warranty': 'Warranty',
    'warranty-policy': 'Warranty Policy',
    blog: 'Blog',
    models: 'Models',
    order: 'Order',
    routes: 'Routes',
    ...customLabels,
  };

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter((path) => path);

    const breadcrumbs = paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = defaultLabels[path] || path.charAt(0).toUpperCase() + path.slice(1);

      return { href, label };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;

  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        href="/"
        className="text-zinc-500 hover:text-zinc-900 transition"
      >
        Home
      </Link>

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={crumb.href} className="flex items-center gap-2">
            <IconChevronRight size={16} className="text-zinc-400" />
            {isLast ? (
              <span className="text-zinc-900 font-medium">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-zinc-500 hover:text-zinc-900 transition"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
