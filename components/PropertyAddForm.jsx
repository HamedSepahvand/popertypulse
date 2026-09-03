"use client";
import { useState, useEffect } from "react";
import { states, citiesByState } from "./statesAndCities";

const PropertyAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    type: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    beds: "",
    baths: "",
    square_feet: "",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
    images: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if nested property
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
      // Not nested property
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;

    const updatedAmenities = [...fields.amenities];
    if (checked) {
      // Add value to array
      updatedAmenities.push(value);
    } else {
      // Remove value from array
      const index = updatedAmenities.indexOf(value);

      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }
    // Update state with updated array
    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;

    // Clone images array
    const updatedImages = [...fields.images];

    // Add new files to the array
    for (const file of files) {
      updatedImages.push(file);
    }

    // Update state with array of images
    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  const fieldRates = [
    fields.rates.weekly,
    fields.rates.monthly,
    fields.rates.nightly,
  ];
  return (
    mounted && (
      <form
        className="p-6 md:p-8"
        action="/api/properties"
        method="POST"
        encType="multipart/form-data"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl text-white shadow-lg shadow-blue-500/30">
            🏠
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Add Property
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Add your property details and make your listing stand out.
          </p>
        </div>

        {/* Property Type */}
        <div className="mb-5">
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Property Type
          </label>

          <select
            id="type"
            name="type"
            className="w-full rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value="Apartment" className="bg-cyan-50">
              Apartment
            </option>
            <option className="bg-cyan-50" value="Condo">
              Condo
            </option>
            <option className="bg-cyan-50" value="House">
              House
            </option>
            <option className="bg-cyan-50" value="Cabin Or Cottage">
              Cabin or Cottage
            </option>
            <option className="bg-cyan-50" value="Room">
              Room
            </option>
            <option className="bg-cyan-50" value="Studio">
              Studio
            </option>
            <option className="bg-cyan-50" value="Other">
              Other
            </option>
          </select>
        </div>

        {/* Listing Name */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Listing Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            placeholder="eg. Beautiful Apartment In Miami"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            className="min-h-40 w-full resize-none rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            rows="4"
            placeholder="Add an optional description of your property"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Location */}
        <div className="mb-6 rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-blue-50 p-5">
          <h3 className="mb-4 text-lg font-bold text-slate-800">📍 Location</h3>

          <div className="space-y-3">
            <select
              id="state"
              name="location.state"
              value={fields.location.state}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-cyan-500 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 cursor-pointer"
            >
              <option value="">Select State</option>

              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>

            <select
              id="city"
              name="location.city"
              value={fields.location.city}
              onChange={handleChange}
              required
              disabled={!fields.location.state}
              className="w-full rounded-xl border border-cyan-500 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 cursor-pointer"
            >
              <option value="">Select City</option>

              {(citiesByState[fields.location.state] || []).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="text"
              id="street"
              name="location.street"
              className="w-full rounded-xl border border-cyan-500 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
              placeholder="Street"
              value={fields.location.street}
              onChange={handleChange}
            />

            <input
              type="text"
              id="zipcode"
              name="location.zipcode"
              className="w-full rounded-xl border border-cyan-500 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
              placeholder="Zipcode"
              required
              value={fields.location.zipcode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-bold text-slate-800">
            Property Details
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="beds"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Beds
              </label>
              <input
                type="number"
                id="beds"
                name="beds"
                className="w-full rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                required
                value={fields.beds}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="baths"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Baths
              </label>
              <input
                type="number"
                id="baths"
                name="baths"
                className="w-full rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                required
                value={fields.baths}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="square_feet"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Square Feet
              </label>
              <input
                type="number"
                id="square_feet"
                name="square_feet"
                className="w-full rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                required
                value={fields.square_feet}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-bold text-slate-800">Amenities</h3>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-3">
            {[
              ["amenity_wifi", "Wifi", "Wifi"],
              ["amenity_kitchen", "Full kitchen", "Full Kitchen"],
              ["amenity_washer_dryer", "Washer & Dryer", "Washer & Dryer"],
              ["amenity_free_parking", "Free Parking", "Free Parking"],
              ["amenity_pool", "Swimming Pool", "Swimming Pool"],
              ["amenity_hot_tub", "Hot Tub", "Hot Tub"],
              ["amenity_24_7_security", "24/7 Security", "24/7 Security"],
              [
                "amenity_wheelchair_accessible",
                "Wheelchair Accessible",
                "Wheelchair Accessible",
              ],
              ["amenity_elevator_access", "Elevator Access", "Elevator Access"],
              ["amenity_dishwasher", "Dishwasher", "Dishwasher"],
              [
                "amenity_gym_fitness_center",
                "Gym/Fitness Center",
                "Gym/Fitness Center",
              ],
              [
                "amenity_air_conditioning",
                "Air Conditioning",
                "Air Conditioning",
              ],
              ["amenity_balcony_patio", "Balcony/Patio", "Balcony/Patio"],
              ["amenity_smart_tv", "Smart TV", "Smart TV"],
              ["amenity_coffee_maker", "Coffee Maker", "Coffee Maker"],
            ].map(([id, label, value]) => (
              <label
                key={id}
                htmlFor={id}
                className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm text-slate-600 transition hover:bg-white hover:text-blue-600"
              >
                <input
                  type="checkbox"
                  id={id}
                  name="amenities"
                  value={value}
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                  checked={fields.amenities.includes(value)}
                  onChange={handleAmenitiesChange}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Rates */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
          <h3 className="mb-1 text-lg font-bold text-slate-800">Rates</h3>

          <p className="mb-4 text-sm text-slate-500">
            Leave blank if not applicable.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["weekly_rate", "rates.weekly", "Weekly"],
              ["monthly_rate", "rates.monthly", "Monthly"],
              ["nightly_rate", "rates.nightly", "Nightly"],
            ].map(([id, name, label], i) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  {label}
                </label>

                <input
                  type="number"
                  id={id}
                  name={name}
                  className="w-full rounded-xl border border-cyan-500 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  value={fieldRates[i] ?? ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Seller Information */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-bold text-slate-800">
            Seller Information
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              id="seller_name"
              name="seller_info.name"
              className="w-full rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Seller Name"
              value={fields.seller_info.name}
              onChange={handleChange}
            />

            <input
              type="email"
              id="seller_email"
              name="seller_info.email"
              className="w-full rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Seller Email"
              required
              value={fields.seller_info.email}
              onChange={handleChange}
            />

            <input
              type="tel"
              id="seller_phone"
              name="seller_info.phone"
              className="w-full rounded-xl border border-cyan-500 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Seller Phone"
              value={fields.seller_info.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Images */}
        <div className="mb-7">
          <label
            htmlFor="images"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Property Images
          </label>

          <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-5 transition hover:border-blue-400 hover:bg-blue-50">
            <input
              type="file"
              id="images"
              name="images"
              className="w-full cursor-pointer rounded-xl border border-cyan-500 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />

            <p className="mt-2 text-xs text-slate-500">
              Select up to 4 images.
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:translate-y-0 cursor-pointer"
          type="submit"
        >
          Add Property
        </button>
      </form>
    )
  );
};

export default PropertyAddForm;
