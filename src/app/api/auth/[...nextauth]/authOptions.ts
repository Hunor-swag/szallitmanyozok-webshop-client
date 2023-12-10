import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'E-mail' },
        password: { label: 'Password', type: 'Password' },
      },

      async authorize(credentials, req) {
        try {
          const user = await fetch(`${process.env.API_URL}/api/auth/users`, {
            method: 'POST',
            body: JSON.stringify({ email: credentials?.email }),
            headers: { 'Content-Type': 'application/json' },
          }).then((res) => (res.ok ? res.json() : null));

          console.log(user);
          // console.log(user);
          if (!user) {
            return null;
          }
          // console.log(credentials?.password, user.password);
          const isMatch = await bcrypt.compare(
            credentials?.password as string | Buffer,
            user.password
          );
          // const isMatch = credentials?.password === user.password;
          // console.log(isMatch);
          if (!isMatch) {
            console.log('user:', user);
            // console.log("Invalid password");
            return null;
          } else {
            // console.log("User found & authenticated");
            return user;
          }
          return null;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.uid = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
