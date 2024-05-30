import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs';

import {fetchUserByEmail} from '@/actions/user-actions'

export const BASE_PATH = "/api/auth";

export const {handlers, auth, signIn, signOut,} = NextAuth({  session: {   strategy: 'jwt',},
    providers: [
        CredentialsProvider({
            credentials: {
                Email: {},
                Password: {},
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                
                try {
                    const { email, password } = credentials;

                    const user = await fetchUserByEmail(email);
                    if (user) {
                        const isMatch =  await bcryptjs.compare(password, user.password); 

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
          if (user?._id) token._id = user._id;
          if (user?.isAdmin) token.isAdmin = user.isAdmin;
          if (user?.isActive) token.isActive = user.isActive;
          if (user?.first_name) token.first_name = user.first_name;
          if (user?.last_name) token.last_name = user.last_name;
          return token;
        },
        async session({ session, token }) {
          if (token?._id) session.user._id = token._id;
          if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
          if (token?.isActive) session.user.isActive = token.isActive;
          if (token?.first_name) session.user.first_name = token.first_name;
          if (token?.last_name) session.user.last_name = token.last_name;
          return session;
        },
      },
      pages: {
        signIn: "/auth/signin",
      },
});