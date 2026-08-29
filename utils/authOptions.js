import connectDB from "@/config/database";
import User from "@/models/User";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // Google Authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Email & Password Authentication
    CredentialsProvider({
      name: "Email",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user
        const user = await User.findOne({
          email: credentials.email.toLowerCase().trim(),
        });

        if (!user) {
          return null;
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordCorrect) {
          return null;
        }

        // Return user
        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    // Runs after successful sign in
    async signIn({ profile, account }) {
      // Only handle Google users here
      if (account?.provider === "google") {
        await connectDB();

        // Check if Google user already exists
        const userExist = await User.findOne({
          email: profile.email,
        });

        // Create Google user if doesn't exist
        if (!userExist) {
          const username =
            profile.name?.slice(0, 20) || profile.email.split("@")[0];

          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
      }

      return true;
    },

    // Add database user ID to session
    async session({ session }) {
      if (session.user?.email) {
        const user = await User.findOne({
          email: session.user.email,
        });

        if (user) {
          session.user.id = user._id.toString();
        }
      }

      return session;
    },
  },
};
