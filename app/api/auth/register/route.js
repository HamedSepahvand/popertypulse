import connectDB from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const { username, email, password } = await request.json();

    // Validation
    if (!username || !email || !password) {
      return Response.json(
        { message: "Please provide all fields" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    const userExists = await User.findOne({
      email: normalizedEmail,
    });

    if (userExists) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return Response.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
