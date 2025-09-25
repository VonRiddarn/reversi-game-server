import { db } from "../db/db.ts";
import { authTokens } from "../db/schema/authTokens.ts";
import type { AuthTokenInsert } from "../models/entities/AuthToken.ts";
import type { OmitEntity } from "../models/types/OmitEntity.ts";

export const createAuthToken = async (request: OmitEntity<AuthTokenInsert>, tx: typeof db = db) =>
	(
		await tx
			.insert(authTokens)
			.values({
				...request,
			})
			.returning()
	)[0];
