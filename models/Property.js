import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      street: { type: String, required: [true, "Street is required"] },
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
      zipcode: { type: Number, required: [true, "Zipcode is required"] },
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },

        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
    beds: {
      type: Number,
      required: [true, "Number of beds is required"],
    },
    baths: {
      type: Number,
      required: [true, "Number of baths is required"],
    },
    square_feet: {
      type: Number,
      required: [true, "Square feet is required"],
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      weekly: { type: Number },
      monthly: { type: Number },
      nightly: { type: Number },
    },
    seller_info: {
      name: { type: String, required: [true, "Seller name is required"] },
      email: { type: String, required: [true, "Seller email is required"] },
      phone: { type: String, required: [true, "Seller phone is required"] },
    },
    images: [{ type: String }],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

PropertySchema.index({ "location.coordinates": "2dsphere" });

const Property = models.Property || model("Property", PropertySchema);

export default Property;
