import { ilike } from "drizzle-orm";
import { db } from "../db/db.ts";
import { users } from "../db/schema/users.ts";
import type { UserInsert, UserSelect } from "../models/entities/User.ts";

export const findAll = async (): Promise<UserSelect[]> => await db.select().from(users);

export const findByUsername = async (username: string): Promise<UserSelect | undefined> =>
	(await db.select().from(users).where(ilike(users.username, username)).limit(1))[0];

// I can't see in the docs if this is safe: https://orm.drizzle.team/docs/operators#ilike
// NOTE: Has been manually tested for query injection and is safe. ChatGPT also states that is the case.
export const findBySearchParam = async (search: string): Promise<UserSelect[]> =>
	await db
		.select()
		.from(users)
		.where(ilike(users.username, `%${search}%`));

export const createUser = async (request: UserInsert, tx: typeof db = db) =>
	(
		await tx
			.insert(users)
			.values({
				...request,
			})
			.returning()
	)[0];
