import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      authProvider?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      image?: string | null;
      _id?: string; // Add _id to the session user
      authStep?: number; // Optional field for user status
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    authProvider?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string | null;
    _id?: string; // Add _id to the JWT token
    authStep?: number; // Optional field for user status
  }
}
