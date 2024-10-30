import { notFound } from "next/navigation";
import { getProperty } from "@/lib/actions/properties";
import PropertyDetails from "@/components/property/property-details";
import DocumentUpload from "@/components/property/document-upload";
import { auth } from "@/auth";

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  const isOwner = session?.user?.id === property.owner.toString();
  const isOfficial = session?.user?.role === "official";

  return (
    <div className="container mx-auto py-10">
      <PropertyDetails property={property} />
      {(isOwner || isOfficial) && (
        <div className="mt-8">
          <DocumentUpload propertyId={property._id} />
        </div>
      )}
    </div>
  );
}