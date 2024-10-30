import { Suspense } from "react";
import PropertyList from "@/components/property/property-list";
import PropertySearch from "@/components/property/property-search";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
      <PropertySearch />
      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyList />
      </Suspense>
    </div>
  );
}

function PropertyListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-lg border bg-card">
          <Skeleton className="h-48 rounded-t-lg" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}