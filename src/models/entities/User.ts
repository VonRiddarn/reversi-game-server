import type { usersTable } from "../../db/schema/users.js";

/** Type for database insertion. */
export type UserInsert = typeof usersTable.$inferInsert;
/** Type for database selection. */
export type UserSelect = typeof usersTable.$inferSelect;
/** Type for public use. */
export type UserPublic = Omit<UserSelect, "age" | "email">;
/** Type for authorized use. */
// Not implemented - add if needed (logged in state)
