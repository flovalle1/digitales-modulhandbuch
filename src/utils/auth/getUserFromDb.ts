import { prisma } from '@/prisma';
import { comparePasswordAndHash } from './saltAndHashPassword';

/**
 * Fetches a user from the database using their email and password hash.
 * 
 * @param {string} email - The email of the user.
 * @param {string} pwHash - The hashed password of the user.
 * @returns {Promise<Object|null>} - Returns the user object if found and password hash matches, otherwise null.
 * @throws {Error} - Throws an error if there is an issue with the database query and logs it to the console.
 */
export async function getUserFromDb(email: string, password: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) return null;

        const passwordMatch: boolean = await comparePasswordAndHash(password, user.passwordHash)
        if (passwordMatch) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user from database:', error);
        throw error;
    }
}
