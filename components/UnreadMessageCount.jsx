"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect } from "react";

const UnreadMessageCount = ({ session }) => {
  const { unreadCount, setUnreadCount } = useGlobalContext(0);

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");
        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUnreadMessages();
  }, [session]);
  return unreadCount > 0 ? (
    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-600 rounded-full">
      {unreadCount}
    </span>
  ) : (
    <></>
  );
};

export default UnreadMessageCount;
