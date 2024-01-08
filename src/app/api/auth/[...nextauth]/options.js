import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import { User } from "@/app/models/User";
import { getServerSession } from "next-auth";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Adapter for interacting with MongoDB for session and user data storage
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
          // const user = await User.findOne({ email });
          const user = await authOptions.adapter.getUserByEmail(email);
          if (user) {
            const passwordOk = await bcrypt.compare(password, user.password);
            if (passwordOk) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    // Use JWT strategy for session management // Set it as jwt instead of database
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await User.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}
