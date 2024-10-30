"use client";

import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Calendar,
  IndianRupee,
  MapPin,
  User,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface PropertyDetailsProps {
  property: Property & { owner: { name: string; email: string } };
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const statusColors = {
    available: "bg-green-500",
    pending: "bg-yellow-500",
    sold: "bg-blue-500",
    disputed: "bg-red-500",
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{property.title}</CardTitle>
              <CardDescription className="mt-2">
                {property.description}
              </CardDescription>
            </div>
            <Badge
              className={
                statusColors[property.status as keyof typeof statusColors]
              }
            >
              {property.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              {property.location.address}, {property.location.city},{" "}
              {property.location.state} - {property.location.pincode}
            </span>
          </div>
          <div className="flex items-center">
            <Building2 className="w-4 h-4 mr-2" />
            <span>
              {property.area.value} {property.area.unit}
            </span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-4 h-4 mr-2" />
            <span className="text-lg font-bold">
              {formatCurrency(property.price)}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              Listed on{" "}
              {format(new Date(property.createdAt), "dd MMMM yyyy")}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Owner Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>{property.owner.name}</span>
          </div>
          <Button variant="outline" className="w-full">
            Contact Owner
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {property.documents.length > 0 ? (
            <div className="grid gap-4">
              {property.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    {doc.verified && (
                      <Badge variant="outline" className="mt-1">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" asChild>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No documents uploaded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}