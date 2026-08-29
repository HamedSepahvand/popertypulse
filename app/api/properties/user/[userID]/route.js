import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/user/:userID
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const { userID } = await params;

    if (!userID) {
      return new Response("User ID is required", { status: 400 });
    }

    const properties = await Property.find({ owner: userID });

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
