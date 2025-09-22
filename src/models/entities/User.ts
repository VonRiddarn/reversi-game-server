import type { users } from "../../db/schema/users.ts";

/** Type for database insertion. */
export type UserInsert = typeof users.$inferInsert;
/** Type for database selection. */
export type UserSelect = typeof users.$inferSelect;
/** Type for public use. */
export type UserPublic = Omit<UserSelect, "passwordHash">;

// Explicit opt-in for clarity and safety
export const newUserPublic = (userSelect: UserSelect): UserPublic => ({
	id: userSelect.id,
	createdAt: userSelect.createdAt,
	updatedAt: userSelect.updatedAt,
	username: userSelect.username,
	refererId: userSelect.refererId,
	avatarId: userSelect.avatarId,
	brickId: userSelect.brickId,
	lastLogin: userSelect.lastLogin,
	verificationDate: userSelect.verificationDate,
});

export const newUserPublicArray = (userSelect: UserSelect[]): UserPublic[] =>
	userSelect.map((u) => newUserPublic(u));
