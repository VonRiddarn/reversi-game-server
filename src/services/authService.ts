import bcrypt from "bcrypt";
import { randomBytes, randomUUID } from "crypto";

export const generateUUID = () => randomUUID(); // No plans for usage, but defined for clarity vs tokens
export const generateToken = (size: number = 32) => randomBytes(size).toString("hex");

export const hashPassword = async (password: string): Promise<string> => {
	return bcrypt.hash(password + process.env.PASSWORD_PEPPER, 12);
};

export const validatePassword = async (inputPassword: string, passwordHash: string): Promise<boolean> => {
	return bcrypt.compare(inputPassword + process.env.PASSWORD_PEPPER, passwordHash);
};

export const hashToken = async (token: string): Promise<string> => {
	return bcrypt.hash(token + process.env.AUTH_TOKEN_PEPPER, 12);
};

export const validateToken = async (inputToken: string, tokenHash: string): Promise<boolean> => {
	return bcrypt.compare(inputToken + process.env.AUTH_TOKEN_PEPPER, tokenHash);
};
