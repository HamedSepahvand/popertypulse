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
    <div className="relative overflow-hidden rounded-xl bg-white shadow-md">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Price */}
        <div className="absolute right-3 top-3 max-w-[65%] truncate rounded-lg bg-white/95 px-3 py-1.5 text-sm font-bold text-blue-500 shadow-sm sm:text-base">
          ${getRateDisplay()}
        </div>
      </div>

      <div className="p-4">
        {/* Type & Name */}
        <div className="mb-4">
          <p className="mb-1 text-xs text-gray-500 sm:text-sm">
            {property.type}
          </p>

          <h3 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
            {property.name}
          </h3>
        </div>

        {/* Features */}
        <div className="mb-4 flex min-w-0 items-center justify-between border-y border-gray-100 py-3 text-gray-500">
          <div className="flex min-w-0 items-center gap-1">
            <FaBed className="shrink-0 text-sm text-blue-400" />
            <span className="truncate text-xs sm:text-sm">
              {property.beds}
              <span className="hidden sm:inline"> Beds</span>
            </span>
          </div>

          <div className="mx-2 h-4 w-px shrink-0 bg-gray-200" />

          <div className="flex min-w-0 items-center gap-1">
            <FaBath className="shrink-0 text-sm text-blue-400" />
            <span className="truncate text-xs sm:text-sm">
              {property.baths}
              <span className="hidden sm:inline"> Baths</span>
            </span>
          </div>

          <div className="mx-2 h-4 w-px shrink-0 bg-gray-200" />

          <div className="flex min-w-0 items-center gap-1">
            <FaRulerCombined className="shrink-0 text-sm text-blue-400" />
            <span className="truncate text-xs sm:text-sm">
              {property.square_feet.toLocaleString()}
              <span className="hidden sm:inline"> sqft</span>
            </span>
          </div>
        </div>

        {/* Rates */}
        <div className="mb-4 flex min-w-0 items-center justify-center gap-2 whitespace-nowrap text-[10px] font-medium text-green-700 sm:gap-3 sm:text-xs">
          {property.rates.weekly && (
            <span className="flex min-w-0 items-center gap-1">
              <FaMoneyBill className="shrink-0" />
              <span>Weekly</span>
            </span>
          )}

          {property.rates.monthly && (
            <span className="flex min-w-0 items-center gap-1">
              <FaMoneyBill className="shrink-0" />
              <span>Monthly</span>
            </span>
          )}

          {property.rates.nightly && (
            <span className="flex min-w-0 items-center gap-1">
              <FaMoneyBill className="shrink-0" />
              <span>Nightly</span>
            </span>
          )}
        </div>

        {/* Bottom */}
        <div className="flex min-w-0 items-center justify-between gap-2">
          {/* Location */}
          <div className="flex min-w-0 items-center gap-1.5 text-orange-700">
            <FaMapMarker className="shrink-0 text-sm" />

            <span className="truncate text-xs sm:text-sm">
              {property.location.city}, {property.location.state}
            </span>
          </div>

          {/* Details */}
          <Link
            href={`/properties/${property._id}`}
            className="shrink-0 rounded-lg bg-blue-500 px-3 py-2 text-xs text-white transition hover:bg-blue-600 sm:px-4 sm:text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
