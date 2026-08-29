"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profileDeafult from "@/assets/images/profile.png";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userID) => {
      if (!userID) {
        return;
      } else {
        try {
          const res = await fetch(`/api/properties/user/${userID}`);

          if (res.status === 200) {
            const data = await res.json();
            setProperties(data);
          }
        } catch (err) {
          console.log(err);
          return new Response(err, { status: 404 });
        } finally {
          setLoading(false);
        }
      }
    };

    // Fetch user properties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyID) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this property ?",
      text: "This Operation is unreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "rgb(244, 9, 9)",
      cancelButtonColor: "#03c700",
      cancelButtonText: "No, cancel!",
      overlay: true,
      backdrop: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/properties/${propertyID}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        // Remove the property from state
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyID,
        );
        setProperties(updatedProperties);

        toast.success("Property Deleted!");
      } else {
        toast.error("Failed to delete property!");
      }
    } catch (err) {
      toast.error("Failed to delete property!");
      console.log(err);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10 shadow-xl shadow-blue-100/50 rounded-2xl border border-slate-200">
          <div className="mb-8 border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
              Your Profile
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Manage your profile and property listings
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Profile */}
            <div className="w-full lg:w-1/4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 lg:p-6">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="mb-6 relative">
                    <div className="rounded-full p-1.5 bg-white shadow-lg ring-1 ring-slate-200">
                      <Image
                        className="h-32 w-32 sm:h-40 sm:w-40 lg:h-44 lg:w-44 rounded-full object-cover"
                        src={profileImage || profileDeafult}
                        alt="User"
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </div>
                  </div>

                  <div className="w-full space-y-5 text-center lg:text-left">
                    <h2 className="text-base sm:text-lg text-slate-700">
                      <span className="font-semibold block text-xs uppercase tracking-wider text-slate-400 mb-1">
                        Name
                      </span>
                      <span className="font-bold text-xl sm:text-2xl text-slate-800 break-words">
                        {profileName}
                      </span>
                    </h2>

                    <h2 className="text-base sm:text-lg text-slate-700">
                      <span className="font-semibold block text-xs uppercase tracking-wider text-slate-400 mb-1">
                        Email
                      </span>
                      <span className="font-medium text-base sm:text-lg text-slate-700 break-all">
                        {profileEmail}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Listings */}
            <div className="w-full lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Your Listings
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Properties you've added
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {!loading && properties.length === 0 && (
                  <p>You have no property listings</p>
                )}
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  properties.map((property) => (
                    <div
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      key={property._id}
                    >
                      <Link
                        href={`/properties/${property._id}`}
                        className="block overflow-hidden"
                      >
                        <Image
                          className="h-48 sm:h-56 lg:h-52 xl:h-60 w-full object-cover transition-transform duration-500 hover:scale-105"
                          src={property.images[0] || "/public/images/logo.png"}
                          width={250}
                          height={100}
                          alt={property.name}
                          priority={true}
                        />
                      </Link>

                      <div className="p-5 sm:p-6">
                        <p className="text-lg sm:text-xl font-bold text-slate-800">
                          {property.name}
                        </p>

                        <p className="mt-2 text-sm sm:text-base text-slate-500">
                          {property.location.street} {property.location.city},{" "}
                          {property.location.state} {property.location.zipcode}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link
                            href={`/properties/${property._id}/edit`}
                            className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm"
                          >
                            Edit
                          </Link>

                          <button
                            className="inline-flex items-center justify-center bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-medium text-sm sm:text-base hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer"
                            type="button"
                            onClick={() => handleDeleteProperty(property._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
