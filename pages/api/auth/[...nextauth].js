import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import FaceItProvider from "next-auth/providers/faceit";
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
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    FaceItProvider({
      clientId: process.env.FACEIT_CLIENT_ID,
      clientSecret: process.env.FACEIT_CLIENT_SECRET,
      idToken: true,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, token, user }) {
      session.userId = token.id;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = token.sub;
      }
      return token;
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
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
};
export default NextAuth(authOptions);
