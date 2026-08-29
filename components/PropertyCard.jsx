import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="rounded-xl shadow-md relative">
      <div className="relative h-[290px]">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold h-10">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${getRateDisplay()}
        </h3>

        <div className="flex justify-around gap-3 text-gray-500 mb-4">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
            <FaBed className="text-blue-400" />
            <span className="text-sm">
              {property.beds} <span className="hidden sm:inline">Beds</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
            <FaBath className="text-blue-400" />
            <span className="text-sm">
              {property.baths} <span className="hidden sm:inline">Baths</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
            <FaRulerCombined className="text-blue-400" />
            <span className="text-sm">
              {property.square_feet.toLocaleString()}{" "}
              <span className="hidden sm:inline">sqft</span>
            </span>
          </div>
        </div>

        {/* Rates */}
        <div className="flex justify-center gap-4 text-sm mb-4">
          {property.rates.weekly && (
            <span className=" font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
              <FaMoneyBill className="inline mr-1.5" /> Weekly
            </span>
          )}
          {property.rates.monthly && (
            <span className=" font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
              <FaMoneyBill className="inline mr-1.5" /> Monthly
            </span>
          )}
          {property.rates.nightly && (
            <span className=" font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
              <FaMoneyBill className="inline mr-1.5" /> Nightly
            </span>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <span className="text-orange-700">
              <FaMapMarker className="inline mr-2" /> {property.location.city} ,{" "}
              {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
