import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';

interface SafeUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
}

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         const googleProfile = profile as {
//           given_name?: string;
//           family_name?: string;
//           email?: string;
//           picture?: string;
//         };

//         token.firstName = googleProfile.given_name || '';
//         token.lastName = googleProfile.family_name || '';
//         token.email = googleProfile.email || '';
//         token.image = googleProfile.picture || '';
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.firstName = token.firstName || '';
//         session.user.lastName = token.lastName || '';
//         session.user.email = token.email || '';
//         session.user.image = token.image || '';
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/auth/signup',
//     newUser: '/auth/onboarding',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

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
        token.email = user.email ?? undefined;
        token.firstName = user.name?.split(' ')[0]; 
        token.lastName = user.name?.split(' ')[1]; 
        token.image = user.image;
        token.authProvider = (user as any).authProvider || 'google'; // eslint-disable-line @typescript-eslint/no-explicit-any

      }
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

      return session;
    },
  },
  pages: {
    signIn: '/auth/signup',
    newUser: '/auth/onboarding',
  },
  secret: process.env.NEXTAUTH_SECRET,
};