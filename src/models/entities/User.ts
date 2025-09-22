import type { usersTable } from "../../db/schema/users.js";

/** Type for database insertion. */
export type UserInsert = typeof usersTable.$inferInsert;
/** Type for database selection. */
export type UserSelect = typeof usersTable.$inferSelect;
/** Type for public use. */
export type UserPublic = Omit<UserSelect, "email">;

// Explicit opt-in for clarity and safety
export const newUserPublic = (userSelect: UserSelect): UserPublic => ({
	id: userSelect.id,
	name: userSelect.name,
	age: userSelect.age,
	createdAt: userSelect.createdAt,
	updatedAt: userSelect.updatedAt,
});

export const newUserPublicArray = (userSelect: UserSelect[]): UserPublic[] =>
	userSelect.map((u) => newUserPublic(u));
