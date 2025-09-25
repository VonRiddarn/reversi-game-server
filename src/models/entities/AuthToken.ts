import type { authTokens } from "../../db/schema/authTokens.ts";

/** Type for database insertion. */
export type AuthTokenInsert = typeof authTokens.$inferInsert;
/** Type for database selection. */
export type AuthTokenSelect = typeof authTokens.$inferSelect;

export const AUTH_TOKEN_VALID_DAYS: number = 10 as const;
