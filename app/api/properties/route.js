import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { uploadToImageKit } from "@/utils/uploadToImageKit";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6;

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      properties,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (err) {
    console.error("PROPERTY GET ERROR:", err);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
};

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required!", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    // Get amenities
    const amenities = formData.getAll("amenities");

    // Get images
    const images = formData
      .getAll("images")
      .filter((image) => image instanceof File && image.name !== "");

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

    // Upload images to ImageKit
    const imageUploadPromises = images.map(async (image) => {
      const imageBuffer = Buffer.from(await image.arrayBuffer());

      const uploadResult = await uploadToImageKit(
        imageBuffer,
        `${Date.now()}-${image.name}`,
      );
      return uploadResult.url;
    });

    // Wait for all uploads
    const uploadedImages = await Promise.all(imageUploadPromises);

    // Add image URLs to property data
    propertyData.images = uploadedImages;

    // Save property
    const newProperty = new Property(propertyData);

    await newProperty.save();

    // Redirect to property page
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
    );
  } catch (err) {
    console.error("PROPERTY POST ERROR:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
    });

    return new Response("Failed to add property!", {
      status: 500,
    });
  }
};
