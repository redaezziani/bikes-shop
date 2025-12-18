'use client';

import dynamic from 'next/dynamic';

const OrderStatusModal = dynamic(
  () => import('@/components/order-status-modal').then(mod => ({ default: mod.OrderStatusModal })),
  { ssr: false }
);

export default function OrderStatusModalWrapper() {
  return <OrderStatusModal />;
}
