import Skeleton from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-16" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <Skeleton className="aspect-square rounded-2xl" />

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-9 w-32" />
          <div className="space-y-2 pt-5 border-t border-gray-100">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}