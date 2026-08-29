"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const BookmarkButton = ({ property }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!property._id || !userId) return;
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkBookmarkStatus();
  }, [userId, property._id]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");

      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);

      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${isBookmarked ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center cursor-pointer transition`}
    >
      {isBookmarked ? (
        <FaDeleteLeft className="mr-2" />
      ) : (
        <FaBookmark className="mr-2" />
      )}
      {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
