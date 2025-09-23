import { integer, timestamp } from "drizzle-orm/pg-core";

export const entityColumns = {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" })
		.defaultNow()
		.$onUpdate(() => new Date()),
};

// T extends Record<string, unknown> => I only accept objects with string keys. Unknown doesn't turn off type checking.
// T & typeof entityColumns - Return type could be infered, but being explicit "feels" right here.
export const newEntityTable = <T extends Record<string, unknown>>(table: T): T & typeof entityColumns => {
	return {
		...entityColumns,
		...table,
	};
};
