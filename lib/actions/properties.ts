import dbConnect from "@/lib/db";
import Property from "@/lib/models/property";

export async function getProperty(id: string) {
  try {
    await dbConnect();
    const property = await Property.findById(id)
      .populate("owner", "name email")
      .lean();
    
    if (!property) return null;

    return {
      ...property,
      _id: property._id.toString(),
      owner: {
        ...property.owner,
        _id: property.owner._id.toString(),
      },
    };
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}