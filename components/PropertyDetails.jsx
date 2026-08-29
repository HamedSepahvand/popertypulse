import React from "react";
import { FaBath, FaBed, FaCheck } from "react-icons/fa";
import { FaLocationDot, FaRulerCombined, FaXmark } from "react-icons/fa6";

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaLocationDot className="fa-solid fa-location-dot text-lg text-orange-700 mr-2" />
          <p className="text-orange-700">
            {property.location.street} {property.location.city}{" "}
            {property.location.state} {property.location.zipcode}{" "}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2 rounded-lg text-center">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            {property.rates.nightly ? (
              <div className="text-2xl font-bold text-blue-600">
                ${property.rates.nightly.toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold">
                <FaXmark className="fa fa-xmark text-red-700" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mx-2 font-bold">Weekly</div>
            {property.rates.weekly ? (
              <div className="text-2xl font-bold text-blue-600">
                ${property.rates.weekly.toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold">
                <FaXmark className="fa fa-xmark text-red-700" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mx-2 font-bold">Monthly</div>
            {property.rates.monthly ? (
              <div className="text-2xl font-bold text-blue-600">
                ${property.rates.monthly.toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold">
                <FaXmark className="fa fa-xmark text-red-700" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <FaBed className="mb-2" />
            <span className="sm:inline">{property.beds} Beds</span>
          </p>
          <p>
            <FaBath className="mb-2" />
            <span className="sm:inline">{property.baths} Baths</span>
          </p>
          <p>
            <FaRulerCombined className="mb-2" />
            <span className="sm:inline">
              {property.square_feet.toLocaleString()} sqft
            </span>
          </p>
        </div>
        <p className="text-gray-500 mb-4 text-center">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-5">Amenities</h3>

        <ul className="flex gap-3 flex-wrap">
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className="text-green-600 inline mr-1 ml-3 " />
              <span className="font-medium">{amenity}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default PropertyDetails;
