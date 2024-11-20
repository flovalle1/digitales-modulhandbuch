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
})