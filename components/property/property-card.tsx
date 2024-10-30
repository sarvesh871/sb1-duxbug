import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const statusColors = {
    available: "bg-green-500",
    pending: "bg-yellow-500",
    sold: "bg-blue-500",
    disputed: "bg-red-500",
  };

  return (
    <Link href={`/properties/${property._id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="p-0">
          <div className="relative h-48 bg-muted">
            <Badge
              className={`absolute top-2 right-2 ${
                statusColors[property.status as keyof typeof statusColors]
              }`}
            >
              {property.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Building2 className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {property.area.value} {property.area.unit}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-lg font-bold">
            {formatCurrency(property.price)}
          </span>
          {property.documents.some((doc) => doc.verified) && (
            <Badge variant="outline" className="ml-2">
              Verified
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}