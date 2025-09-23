import { integer, pgEnum, pgTable, varchar, type AnyPgColumn } from "drizzle-orm/pg-core";
import { newEntity } from "./_entity.ts";
import { users } from "./users.ts";

export const WinConditionEnum = pgEnum("win_condition_enum", ["Score", "Forfeit", "Disconnect"]);

export const completedGames = pgTable(
	"completed_games",
	newEntity({
		userAId: integer("user_a_id")
			.notNull()
			.references((): AnyPgColumn => users.id),
		userBId: integer("user_b_id")
			.notNull()
			.references((): AnyPgColumn => users.id),
		winnerId: integer("winner_id").references((): AnyPgColumn => users.id),
		roomName: varchar("room_name", { length: 64 }).notNull(),
		spectators: integer().notNull(),
		winCondition: WinConditionEnum("win_condition").notNull(),
	})
);
