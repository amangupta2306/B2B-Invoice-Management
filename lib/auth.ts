import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserFromDb } from "./utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        );
        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],

  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },
  },
});
