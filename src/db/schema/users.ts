import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { newEntity } from "./_entity.js";

export const usersTable = pgTable(
	"users",
	newEntity({
		name: varchar({ length: 255 }).notNull(),
		age: integer().notNull(),
		email: varchar({ length: 255 }).notNull().unique(),
	})
);

export const abc = pgTable("abc", {});
