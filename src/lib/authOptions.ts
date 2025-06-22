import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';
import { AdapterUser } from "next-auth/adapters";

export interface SafeUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
}

interface CustomUser extends AdapterUser {
  authProvider?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  name?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await Profile.findOne({ email: credentials?.email }).lean<SafeUser>();
        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordValid) return null;
        // console.log("User authenticated successfully:", user);
        return {
          id: user._id.toString(),
          email: user.email ?? undefined,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.profileImageUrl,
          authProvider: 'credentials', // ✅ add this
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.email = customUser.email ?? undefined;
        token.firstName = customUser.authProvider === 'credentials'
          ? customUser.firstName
          : customUser.name?.split(' ')[0];
        token.lastName = customUser.authProvider === 'credentials'
          ? customUser.lastName
          : customUser.name?.split(' ')[1];
        token.image = customUser.image;
        token.authProvider = customUser.authProvider || 'google';
      }
      // console.log("JWT callback triggered for user:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.image = token.image as string;
        session.user.authProvider = token.authProvider as string;

      }
      // console.log("Session callback triggered for user:", session);

      return session;
    },
  },
  pages: {
    signIn: '/auth/signup',
    newUser: '/auth/onboarding',
  },
  secret: process.env.NEXTAUTH_SECRET,
};