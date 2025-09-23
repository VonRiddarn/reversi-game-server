import type { users } from "../../db/schema/users.ts";

/** Type for database insertion. */
export type UserInsert = typeof users.$inferInsert;
/** Type for database selection. */
export type UserSelect = typeof users.$inferSelect;
