import type { invites } from "../../db/schema/invites.ts";

/** Type for database insertion. */
export type InviteInsert = typeof invites.$inferInsert;
/** Type for database selection. */
export type InviteSelect = typeof invites.$inferSelect;
