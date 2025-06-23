import { DefaultSession } from "next-auth";
export type authStepOptions = 0 | 1 | 2 | 3 | 4 | 5;
declare module "next-auth" {
  interface Session {
    user: {
      authStep: authStepOptions; // Optional field for user status
      authProvider?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      image?: string | null;
      _id?: string; // Add _id to the session user
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
    authStep:authStepOptions; // Optional field for user status
  }
}
