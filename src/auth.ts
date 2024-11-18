import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "./utils/auth/getUserFromDb"
import { saltAndHashPassword } from "./utils/auth/saltAndHashPassword"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) => {
            let user = null

            // logic to salt and hash password
            const pwHash = await saltAndHashPassword(credentials.password as string)

            // logic to verify if the user exists
            user = await getUserFromDb(credentials.email as string, pwHash)

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