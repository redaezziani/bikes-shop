import { Suspense } from 'react';
import OrderContent from './order-content';

const Page = () => {
  return (
    <Suspense
      fallback={
        <main className="flex flex-col min-h-screen gap-4 justify-center items-center">
          <div className="text-lg">Loading products...</div>
        </main>
      }
    >
      <OrderContent />
    </Suspense>
  );
};

export default Page;
