import NextAuth, { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authenticateUser } from '../../../../lib/auth'; 


declare module 'next-auth' {
  interface User {
    id: string;  
    user_type_id: number;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      user_type_id: number;
    };
  }

  interface JWT {
    id: string;  
    user_type_id: number;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        const user = await authenticateUser(email, password);

        if (!user) {
          throw new Error('Invalid email or password');
        }

        
        return {
          id: String(user.id),  // Convert id to string
          name: user.name,
          email: user.email,
          user_type_id: user.user_type_id,  
        } as User;  
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  
        token.user_type_id = user.user_type_id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;  // id will now be a string
        session.user.user_type_id = token.user_type_id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
