"use client";

import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomeProperties = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await res.json();
        const recentProperties = data.properties
          .sort(() => Math.random() - Math.random())
          .slice(0, 3);
        setProperties(recentProperties);
      } catch (error) {
        console.error(error);
        setProperties([]);
      }
    };
    getProperties();
  }, []);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
