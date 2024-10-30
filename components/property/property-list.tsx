"use client";

import { useEffect, useState } from "react";
import { Property } from "@/types/property";
import PropertyCard from "./property-card";
import { useSearchParams } from "next/navigation";

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchProperties() {
      try {
        const params = new URLSearchParams(searchParams);
        const response = await fetch(`/api/properties?${params}`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [searchParams]);

  if (loading) {
    return null; // Skeleton is handled by Suspense
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
}