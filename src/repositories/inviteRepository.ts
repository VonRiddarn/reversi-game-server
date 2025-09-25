import { ilike, eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { users } from "../db/schema/users.ts";
import type { InviteSelect, InviteUpdate } from "../models/entities/Invite.ts";
import { invites } from "../db/schema/invites.ts";
import type { PgTransaction } from "drizzle-orm/pg-core";

export const findAll = async (): Promise<InviteSelect[]> => await db.select().from(invites);

export const findByRedeemCode = async (redeemCode: string): Promise<InviteSelect | undefined> =>
	(await db.select().from(invites).where(eq(invites.redeemCode, redeemCode)).limit(1))[0];

export const findByCreatorUsername = async (username: string): Promise<InviteSelect[]> => {
	const rows = await db
		.select()
		.from(invites)
		.innerJoin(users, eq(invites.creatorId, users.id))
		.where(ilike(users.username, username));

	return rows.map((r) => r.invites);
};

export const editById = async (id: number, properties: InviteUpdate) =>
	(
		await db
			.update(invites)
			.set({ ...properties })
			.where(eq(invites.id, id))
			.returning()
	)[0];
export const editByIdTransactional = async (
	tx: PgTransaction<any, any, any>,
	id: number,
	properties: InviteUpdate
) =>
	(
		await tx
			.update(invites)
			.set({ ...properties })
			.where(eq(invites.id, id))
			.returning()
	)[0];
