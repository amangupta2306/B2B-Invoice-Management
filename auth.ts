import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserFromDb } from "./lib/utils";
import { signInCredNProvider } from "./action/authenication";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      companyName?: string | null;
    } & DefaultSession["user"];
  }
}

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
    signIn: async ({ account, profile }) => {
      if (account?.provider === "google") {
        if (!profile?.email) return false;
        signInCredNProvider(
          {
            email: profile.email as string,
            username: profile.name as string,
            image: (profile.image as string) || "",
          },
          "google"
        );
        return true;
      }
      return true;
      // return false;
    },

    async session({ session, token }) {
      if (session?.user) {
        let user = await getUserFromDb(session.user.email as string);

        if (user && typeof token.sub === "string") {
          session.user.id = user.id || token.sub;
          session.user.companyName = user.companyName || null;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
});
