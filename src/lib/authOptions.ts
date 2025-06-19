import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const googleProfile = profile as {
          given_name?: string;
          family_name?: string;
          email?: string;
          picture?: string;
        };

        token.firstName = googleProfile.given_name || '';
        token.lastName = googleProfile.family_name || '';
        token.email = googleProfile.email || '';
        token.image = googleProfile.picture || '';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.firstName = token.firstName || '';
        session.user.lastName = token.lastName || '';
        session.user.email = token.email || '';
        session.user.image = token.image || '';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/onboarding',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
