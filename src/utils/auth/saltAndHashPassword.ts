import bcrypt from 'bcrypt';

/**
 * Salts and hashes a password
 * @param password - The password to salt and hash
 * @returns A promise that resolves to the hashed password
 */
export async function saltAndHashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
