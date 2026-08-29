import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/featured
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({
      is_featured: true,
    });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.error("PROPERTY GET ERROR:", err);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
