import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { newEntityTable } from "./_entityTable.ts";
import { users } from "./users.ts";

export const invites = pgTable(
	"invites",
	newEntityTable({
		expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
		creatorId: integer("creator_id").references(() => users.id),
		usesLeft: integer("uses_left").notNull().default(1),
		redeemCode: varchar("redeem_code", { length: 16 }).notNull().unique(),
		userVerificationCooldownDays: integer("user_verification_cooldown_days").notNull().default(7),
	})
);
