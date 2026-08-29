import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const property = await Property.findById(id);

    if (!property) return new Response("Property Not Found!", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (err) {
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id: propertyID } = await params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyID);

    if (!property) return new Response("Property Not Found!", { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();
    return new Response("Property Deleted!", { status: 200 });
  } catch (err) {
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required!", {
        status: 401,
      });
    }

    const { id } = await params;
    const { userId } = sessionUser;

    const formData = await request.formData();

    // Get amenities
    const amenities = formData.getAll("amenities");

    // Get property to update
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response("Property Not Found to Update!", { status: 404 });
    }

    // Verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized Owner!", { status: 401 });
    }

    // Create property data
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),

      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },

      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),

      amenities,

      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },

      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },

      owner: userId,
    };

    // Update property on database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData, {
      new: true,
    });

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (err) {
    console.error("PROPERTY PUT ERROR:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
    });

    return new Response("Failed to update property!", {
      status: 500,
    });
  }
};
