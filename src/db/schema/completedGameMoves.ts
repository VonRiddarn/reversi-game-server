import { integer, pgTable, type AnyPgColumn } from "drizzle-orm/pg-core";
import { newEntityTable } from "./_entityTable.ts";
import { completedGames } from "./completedGames.ts";
import { users } from "./users.ts";

export const completedGameMoves = pgTable(
	"completed_game_moves",
	newEntityTable({
		completedGameId: integer("completed_game_id")
			.notNull()
			.references((): AnyPgColumn => completedGames.id),
		userId: integer("user_id")
			.notNull()
			.references((): AnyPgColumn => users.id),
		turn: integer().notNull(),
		placement: integer().array().notNull(),
		endTurnGameState: integer("end_turn_game_state").array().array().notNull(), // Could make a normalized cell tabele,
	})
);

/* 
	Note: We could normalize the board by using a table for completed game cells.
	I am purposefully not doing this because that would increase the amount of 
	inserts to the database to O(n) where n is the number of cells on the board.
	Thus, potentially maxing out my bandwith for the host I will be using.
*/
