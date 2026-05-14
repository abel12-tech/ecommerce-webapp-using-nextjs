import Skeleton from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-7 w-36 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-xl" />
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
            <Skeleton className="aspect-square" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}