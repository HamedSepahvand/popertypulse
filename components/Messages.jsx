"use client";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/messages");
        if (res.status === 200) {
          const data = await res.json();
          setMessages(data.messages);
        } else {
          console.error("Error fetching messages: ", res.statusText);
          return new Response(JSON.stringify("Error fetching messages"), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          });
        }
      } catch (err) {
        console.error("Error fetching messages: ", err);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);
  console.log(messages);
  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Your Messages
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage and view your property inquiries.
                </p>
              </div>

              {/* Message count */}
              <div className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                {messages.length}{" "}
                {messages.length === 1 ? "Message" : "Messages"}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-6 sm:p-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  💬
                </div>

                <h2 className="text-lg font-semibold text-slate-800">
                  No messages yet
                </h2>

                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  You don't have any property inquiries at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {messages.map((message) => (
                  <Message
                    key={message._id}
                    message={message}
                    setMessages={setMessages}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
