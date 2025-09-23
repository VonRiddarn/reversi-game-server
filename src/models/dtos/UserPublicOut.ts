import { USERS_ROOT } from "../../controllers/userEndpoints.ts";
import type { UserSelect } from "../entities/User.ts";
import type { HasEndpoint } from "../types/HasEndpoint.ts";

/** Type for public use. */
export type UserPublicOut = Omit<UserSelect, "passwordHash"> & HasEndpoint;

// Explicit opt-in for clarity and safety
export const toUserPublicOut = (userSelect: UserSelect): UserPublicOut => ({
	id: userSelect.id,
	createdAt: userSelect.createdAt,
	updatedAt: userSelect.updatedAt,
	username: userSelect.username,
	refererId: userSelect.refererId,
	avatarId: userSelect.avatarId,
	brickId: userSelect.brickId,
	lastLogin: userSelect.lastLogin,
	verificationDate: userSelect.verificationDate,
	endpoint: `${USERS_ROOT}/${userSelect.username}`,
});

export const toUserPublicOutArray = (userSelect: UserSelect[]): UserPublicOut[] =>
	userSelect.map((u) => toUserPublicOut(u));
