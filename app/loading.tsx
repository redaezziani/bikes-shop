export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="h-130 lg:h-[80vh] bg-zinc-200 animate-pulse relative">
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="h-16 bg-zinc-300 rounded-lg max-w-sm" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-4 w-full max-w-2xl px-4">
            <div className="h-12 bg-zinc-300 rounded-lg mx-auto w-3/4" />
            <div className="h-10 bg-zinc-300 rounded-lg mx-auto w-32" />
          </div>
        </div>
      </div>

      {/* Product Section Skeleton */}
      <div className="w-full px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-96 bg-zinc-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-zinc-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
