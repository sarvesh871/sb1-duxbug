import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Property from "@/lib/models/property";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const file = formData.get("file") as File;

    if (!title || !file) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const property = await Property.findById(params.id);

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    // In a real application, you would upload the file to a storage service
    // and get back a URL. For now, we'll just store the file name
    const document = {
      title,
      url: `/uploads/${file.name}`, // This is a placeholder URL
      verified: false,
    };

    property.documents.push(document);
    await property.save();

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { message: "Error uploading document" },
      { status: 500 }
    );
  }
}