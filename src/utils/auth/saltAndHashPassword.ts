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

/**
 * Compares a password with a hashed password
 * @param password - The plain text password to compare
 * @param hash - The hashed password to compare against
 * @returns A promise that resolves to a boolean indicating if the password matches the hash
 */
export async function comparePasswordAndHash(password: string, hash: string | null): Promise<boolean> {
    if (!hash) {
        return false;
    }
    return bcrypt.compare(password, hash);
}
