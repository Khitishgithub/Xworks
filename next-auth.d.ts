// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      // image?: string | null;
      user_type_id:number;
    };
  }

  interface User {
    id: string;
    user_type_id: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user_type_id: number; 
  }
}
