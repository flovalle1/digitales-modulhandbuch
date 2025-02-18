import { paths } from "@/paths"
import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "./utils/auth/getUserFromDb"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: paths.signIn,
    },
    providers: [Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) => {
            let user = null

            // logic to verify if the user exists
            user = await getUserFromDb(credentials.email as string, credentials.password as string)

            if (!user) {
                // No user found, so this is their first attempt to login
                // Optionally, this is also the place you could do a user registration
                throw new Error("Invalid credentials.")
            }

            // return user object with their profile data
            return user
        },
    }),],
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email!,
                },
            })
            if (user && dbUser) {
                token.id = user.id
                token.role = dbUser.role
            }
            return token
        },
        session({ session, token }) {
            if (token) return { user: { ...session.user, role: token.role }, expires: session.expires }
            return session
        },
    },
});