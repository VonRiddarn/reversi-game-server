import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { newEntityTable } from "./_entityTable.ts";
import { users } from "./users.ts";
import { AUTH_TOKEN_VALID_DAYS } from "../../models/entities/AuthToken.ts";

export const authTokens = pgTable(
	"auth_tokens",
	newEntityTable({
		userId: integer("user_id")
			.notNull()
			.references(() => users.id),
		tokenHash: varchar({ length: 255 }).notNull().unique(),
		expiresAt: timestamp("expires_at", { mode: "date" })
			.notNull()
			.$default(() => {
				let date = new Date();
				date.setDate(date.getDate() + AUTH_TOKEN_VALID_DAYS);
				return date;
			}),
	})
);
