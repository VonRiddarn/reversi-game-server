import { integer, pgTable, smallint, timestamp, varchar, type AnyPgColumn } from "drizzle-orm/pg-core";
import { newEntity } from "./_entity.ts";

const USER_VERIIFICATION_COOLDOWN_DAYS: number = 7;

export const users = pgTable(
	"users",
	newEntity({
		refererId: integer().references((): AnyPgColumn => users.id),
		username: varchar({ length: 42 }).notNull().unique(),
		passwordHash: varchar({ length: 255 }).notNull(),
		avatarId: smallint().default(0),
		brickId: smallint().default(0),
		lastLogin: timestamp().defaultNow(),
		verificationDate: timestamp().$default(() => {
			let date = new Date();
			date.setDate(date.getDate() + USER_VERIIFICATION_COOLDOWN_DAYS);
			return date;
		}),
	})
);
