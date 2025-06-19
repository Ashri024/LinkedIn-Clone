import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      authProvider?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      image?: string | null;
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
  }
}
