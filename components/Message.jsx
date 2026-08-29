"use client";

import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useGlobalContext } from "@/context/GlobalContext";

const Message = ({ message, setMessages }) => {
  const [isRead, setIsRead] = useState(message.read || false);
  const [property, setProperty] = useState(message.property || null);
  const { setUnreadCount } = useGlobalContext();

  const session = useSession();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${message.property}`);
        if (res.ok) {
          const data = await res.json();
          setProperty(data);
        } else {
          console.error("Error fetching property: ", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching property: ", error);
      }
    };

    fetchProperty();
  }, [message]);

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        toast.success(`Message marked as ${read ? "read" : "new"}`);
      } else {
        console.error("Error updating message read status: ", res.statusText);
        toast.error("Failed to update message read status");
      }
    } catch (error) {
      console.error("Error updating message read status: ", error);
      toast.error("Failed to update message read status");
    }
  };

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: "Delete message?",
      text: "This message will be deleted for permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      confrimButtonColor: "#D61A29",
      cancelButtonColor: "#14B30C",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/messages/${message._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          toast.success("Message Deleted Successfully!");
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg._id !== message._id),
          );
          setUnreadCount((prevCount) => prevCount - 1);
        } else {
          toast.error("Failed to delete the Message!");
        }
      } catch (err) {
        console.log("Delete message error: ", err);
        toast.error("Failed to delete the Message");
      }
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Top accent */}
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {session.data?.user?.id !== message.sender._id
                  ? "Received"
                  : "Sent"}
              </span>

              {session.data?.user?.id !== message.sender._id && !isRead && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  New
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {property.name}
            </h2>
          </div>

          {/* Received time */}
          <div className="text-sm text-slate-400">
            {message.updatedAt
              ? new Date(message.updatedAt).toLocaleString("us")
              : new Date(message.createdAt).toLocaleString("us")}
          </div>
        </div>

        {/* Message */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-lg leading-6 text-slate-800">{message.body}</p>
        </div>

        {/* Contact information */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {/* Name */}
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Name
            </p>

            <p className="mt-1 font-semibold text-slate-800">{message.name}</p>
          </div>

          {/* Email */}
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Email
            </p>

            <a
              href={"mailto:" + message.email}
              className="mt-1 block truncate font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              {message.email}
            </a>
          </div>

          {/* Phone */}
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Reply Phone
            </p>

            <a
              href={"tel:" + message.phone}
              className="mt-1 block font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              {message.phone}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-slate-100" />

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={handleReadClick}
            className={`cursor-pointer rounded-lg border border-slate-200 ${isRead ? "bg-gray-500" : "bg-white"} px-5 py-2.5 text-sm font-semibold ${isRead ? "text-slate-200" : "text-slate-700 "} transition hover:border-slate-300 hover:bg-slate-400 active:scale-95`}
          >
            {isRead ? "Mark As New" : "Mark As Read"}
          </button>

          <button
            onClick={handleDeleteClick}
            className="cursor-pointer rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
