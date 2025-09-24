import type { UserPublicOut } from "./UserPublicOut.ts";

export type RegisterUserResponseOut = {
	user: UserPublicOut;
	authToken: string;
} | null;
