import type { completedGameMoves } from "../../db/schema/completedGameMoves.ts";

/** Type for database insertion. */
export type CompletedGameMove = typeof completedGameMoves.$inferInsert;
/** Type for database selection. */
export type CompletedGameMoveSelect = typeof completedGameMoves.$inferSelect;
