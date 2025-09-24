import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { newEntityTable } from "./_entityTable.ts";
import { users } from "./users.ts";

export const authTokens = pgTable(
	"auth_tokens",
	newEntityTable({
		userId: integer("user_id")
			.notNull()
			.references(() => users.id),
		tokenHash: varchar({ length: 255 }).notNull().unique(),
		expiresAt: timestamp("expires_at", { mode: "date" }),
	})
);
