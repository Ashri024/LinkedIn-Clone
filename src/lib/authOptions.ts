import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';
import { AdapterUser } from "next-auth/adapters";
import { authStepOptions } from '@/types/next-auth';
let jwtCall = 0;
let sessionCall = 0;
export interface SafeUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  authStep: authStepOptions; // Optional field for user status
}

interface CustomUser extends AdapterUser {
  _id?: string;
  authProvider?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  name?: string;
  authStep: authStepOptions; // Optional field for user status
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
        return {
          _id: user._id.toString(),
          email: user.email ?? undefined,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.profileImageUrl,
          authProvider: 'credentials', // ✅ add this
          authStep: user.authStep || 0, // Optional field
        } as CustomUser;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback called: ", ++jwtCall);
      await connectDB();
      if (user) {
        const customUser = user as CustomUser;
      
        token.email = customUser.email;
        token.authProvider = customUser.authProvider || 'google';
        // Optional fields
        const [first, last] = (customUser.name || '').split(' ');
        token.firstName = customUser.firstName || first;
        token.lastName = customUser.lastName || last || '';
        token.image = customUser.image || '';
        if(token._id) {
          token._id = customUser._id;
        }else{
          const userFromDb = await Profile.findById(customUser._id).lean<SafeUser>();
          if (userFromDb) {
            token._id = userFromDb._id.toString();
            token.authStep = (typeof userFromDb.authStep === 'number' ? userFromDb.authStep : 0) as authStepOptions;

        }
        }
      }
      // console.log('JWT token object:', token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback called: ", ++sessionCall);
      await connectDB();
      if (session.user) {
        // PAHLE KA CODE
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.image = token.image as string;
        session.user.authProvider = token.authProvider as string;
        session.user.authStep = (typeof token.authStep === 'number' ? token.authStep : 0) as authStepOptions; // Optional field

        session.user._id = token._id as string || undefined;
        if( session.user._id && session.user._id !== 'undefined') {
        const userFromDb = await Profile.findById(session.user._id).lean<SafeUser>();
        if (userFromDb) {
          session.user.email = userFromDb.email;
          session.user.firstName = userFromDb.firstName;
          session.user.lastName = userFromDb.lastName;
          session.user.image = userFromDb.profileImageUrl;
          session.user.authStep = (typeof userFromDb.authStep === 'number' ? userFromDb.authStep : 0) as authStepOptions; // Optional field
        }
      }
      else { 
        // else find via email
        const userFromDb = await Profile.findOne({ email: session.user.email }).lean<SafeUser>();
        if (userFromDb) {
          session.user._id = userFromDb._id.toString();
          session.user.email = userFromDb.email;
          session.user.firstName = userFromDb.firstName;
          session.user.lastName = userFromDb.lastName;
          session.user.image = userFromDb.profileImageUrl;
          session.user.authStep = (typeof userFromDb.authStep === 'number' ? userFromDb.authStep : 0) as authStepOptions; // Optional field
        }
      }}
      // console.log('Session object:', session);
      return session;
    },
  },
  pages: {
    signIn: '/auth/signup',
    newUser: '/auth/onboarding',
  },
  secret: process.env.NEXTAUTH_SECRET,
};