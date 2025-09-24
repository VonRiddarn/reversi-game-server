import { integer, pgTable, smallint, timestamp, varchar, type AnyPgColumn } from "drizzle-orm/pg-core";
import { newEntityTable } from "./_entityTable.ts";
import { UserRoleEnum } from "./userRoleEnum.ts";

const USER_VERIIFICATION_COOLDOWN_DAYS: number = 7;

export const users = pgTable(
	"users",
	newEntityTable({
		role: UserRoleEnum().notNull().default("Member"),
		refererId: integer("referer_id").references((): AnyPgColumn => users.id),
		username: varchar({ length: 42 }).notNull().unique(),
		passwordHash: varchar("password_hash", { length: 255 }).notNull(),
		avatarId: smallint("avatar_id").default(0),
		brickId: smallint("brick_id").default(0),
		lastLogin: timestamp("last_login").defaultNow(),
		verificationDate: timestamp("verification_date")
			.notNull()
			.$default(() => {
				let date = new Date();
				date.setDate(date.getDate() + USER_VERIIFICATION_COOLDOWN_DAYS);
				return date;
			}),
	})
);
