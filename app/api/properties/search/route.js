import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/search
export const GET = async (request) => {
  let query;
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("q");
    const propertyType = searchParams.get("propertyType");

    if (location) {
      const isZipcode = /^\d+$/.test(location);

      const escapeRegex = (value) => {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      };

      const locationPattern = new RegExp(escapeRegex(location), "i");
      // Match location pattern againts database fields
      query = {
        $or: [
          { name: locationPattern },
          { description: locationPattern },
          {
            "location.street": locationPattern,
          },
          {
            "location.city": locationPattern,
          },
          {
            "location.state": locationPattern,
          },
        ],
      };

      if (isZipcode) {
        query.$or.push({
          "location.zipcode": Number(location),
        });
      }
    } else {
      query = {};
    }

    // Only check for property if its not 'All']
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "UnsuccessSearch" }), {
      status: 500,
    });
  }
};
