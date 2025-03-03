import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // GitHub ID as user.id
      return session;
    },
  }
});
