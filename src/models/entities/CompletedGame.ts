import type { completedGames } from "../../db/schema/completedGames.ts";

/** Type for database insertion. */
export type CompletedGameInsert = typeof completedGames.$inferInsert;
/** Type for database selection. */
export type CompletedGameSelect = typeof completedGames.$inferSelect;
