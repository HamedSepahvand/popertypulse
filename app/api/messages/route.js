import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify("User ID is required"), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { userId } = sessionUser;

    const readMessages = await Message.find({
      recipient: userId,
      read: true,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name email phone")
      .populate("recipient", "name email phone");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name email phone")
      .populate("recipient", "name email phone");

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify({ messages }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong while fetching messages!", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: "User ID is required!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { userId } = sessionUser;

    // Can not send message to self
    if (userId === recipient) {
      return new Response(
        JSON.stringify({ message: "You cannot send a message to yourself!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      name,
      email,
      phone,
      property,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message Sent Successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong while sending the message!", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
