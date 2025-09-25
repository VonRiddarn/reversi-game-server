import type { PgTransaction } from "drizzle-orm/pg-core";
import { db } from "../db/db.ts";
import { authTokens } from "../db/schema/authTokens.ts";
import type { AuthTokenInsert } from "../models/entities/AuthToken.ts";
import type { OmitEntity } from "../models/types/OmitEntity.ts";

export const createAuthToken = async (request: OmitEntity<AuthTokenInsert>) =>
	(
		await db
			.insert(authTokens)
			.values({
				...request,
			})
			.returning()
	)[0];

export const createAuthTokenTransactional = async (
	tx: PgTransaction<any, any, any>,
	request: OmitEntity<AuthTokenInsert>
) =>
	(
		await tx
			.insert(authTokens)
			.values({
				...request,
			})
			.returning()
	)[0];
