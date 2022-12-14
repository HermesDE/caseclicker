import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import FaceItProvider from "next-auth/providers/faceit";
import RedditProvider from "next-auth/providers/reddit";
import clientPromise from "../../../lib/database/mongodb";
import mongoose from "mongoose";
import UserStat from "../../../lib/database/schemas/userStat";
import Profile from "../../../lib/database/schemas/profile";
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
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: "permanent",
        },
      },
    }),
    /* FaceItProvider({
      clientId: process.env.FACEIT_CLIENT_ID,
      clientSecret: process.env.FACEIT_CLIENT_SECRET,
    }), */
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
        .then(async () => {
          const newUserStat = new UserStat({
            userId: message.user.id,
          });
          await newUserStat.save();
          const newProfile = new Profile({
            userId: message.user.id,
          });
          await newProfile.save();
          //await mongoose.connection.close();
        });
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};
export default NextAuth(authOptions);
