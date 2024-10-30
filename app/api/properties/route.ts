import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Property from "@/lib/models/property";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const city = searchParams.get("city");
    const status = searchParams.get("status");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    await dbConnect();

    let filter: any = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" };
    }

    if (status) {
      filter.status = status;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { message: "Error fetching properties" },
      { status: 500 }
    );
  }
}