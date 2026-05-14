import Skeleton from "@/components/ui/Skeleton";

export default function CategoriesLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-2xl p-6 space-y-4"
          >
            <Skeleton className="w-12 h-12 rounded-xl" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}