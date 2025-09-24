import type { invites } from "../../db/schema/invites.ts";
import type { OmitEntityPatrial } from "../types/OmitEntity.ts";

/** Type for database insertion. */
export type InviteInsert = typeof invites.$inferInsert;
/** Type for database selection. */
export type InviteSelect = typeof invites.$inferSelect;
/** Type for database update. */
export type InviteUpdate = OmitEntityPatrial<InviteSelect>;
