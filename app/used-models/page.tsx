import { Suspense } from 'react';
import UsedModelsContent from './used-models-content';

const Page = async () => {
  return (
    <Suspense
      fallback={
        <main className="flex flex-col min-h-screen gap-4 justify-center items-center">
          <>
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        </main>
      }
    >
      <UsedModelsContent />
    </Suspense>
  );
};

export default Page;
