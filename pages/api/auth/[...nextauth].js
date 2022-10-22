import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/database/mongodb";
import mongoose from "mongoose";
import UserStat from "../../../lib/database/schemas/userStat";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
  },
  events: {
    createUser: async (message) => {
      await mongoose
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          const newUserStat = new UserStat({
            userId: message.user.id,
          });
          newUserStat.save();
          mongoose.connection.close();
        });
    },
  },
};
export default NextAuth(authOptions);
