import "dotenv/config";
import { db } from "./db/db.ts";
import express from "express";
import { newApiResponse } from "./models/ApiResponse.ts";
import { StatusCodes } from "http-status-codes";
import { attachApiResponse } from "./extentions/ResponseExtentions.ts";
import { hashPassword, validatePassword } from "./services/authServices.ts";
import { eq, sql } from "drizzle-orm";
import { users } from "./db/schema/users.ts";
import type { UserInsert, UserSelect } from "./models/entities/User.ts";
import { toUserPublicOut, toUserPublicOutArray, type UserPublicOut } from "./models/dtos/UserPublicOut.ts";

const app = express();
app.use(attachApiResponse);

// Try some hashing
const hash = await hashPassword("PleaseProtectMe");
console.log(hash);
console.log(await validatePassword("PweaseProtectMe", hash));
console.log(await validatePassword("PleaseProtectMe", hash));

const user: UserInsert = {
	username: "xXSniperNinjaXx",
	passwordHash: await hashPassword("proSquad1337MLG"), // Should not be returned
	avatarId: 3,
};
//

// DB SEED 1 USER.
// TODO: Find out what the hell .$inderInsert is and how we can make this pretty.

try {
	await db.insert(users).values(user);
	console.log("New user created!");
} catch (err) {
	console.log((err as Error).message);
}

// /DB SEED/

app.get("/api/users", async (_req, res) => {
	try {
		const selectedUsers: UserSelect[] = await db.select().from(users);

		if (selectedUsers.length <= 0)
			return res.apiResponse(newApiResponse(StatusCodes.NOT_FOUND, "No users."));

		return res.apiResponse(
			newApiResponse<UserPublicOut[]>(
				StatusCodes.OK,
				"Users found.",
				toUserPublicOutArray(selectedUsers)
			)
		);
	} catch (err) {
		return res.apiResponse(
			newApiResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error.", err)
		);
	}
});
app.get("/api/users/:username", async (req, res) => {
	try {
		const selectedUser: UserSelect | undefined = (
			await db
				.select()
				.from(users)
				.where(eq(sql`lower(${users.username})`, req.params.username.toLowerCase()))
				.limit(1)
		)[0];

		if (!selectedUser) return res.apiResponse(newApiResponse(StatusCodes.NOT_FOUND, "User not found."));

		return res.apiResponse(
			newApiResponse<UserPublicOut>(StatusCodes.OK, "User found.", toUserPublicOut(selectedUser))
		);
	} catch (err) {
		return res.apiResponse(
			newApiResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error.", err)
		);
	}
});

app.listen(process.env.PORT, () => startMessage());

const startMessage = () => {
	console.log("\nServer is now operating.");
	console.log(`\tServer running on http://localhost:${process.env.PORT}`);
	console.log(`\tTest users api on http://localhost:${process.env.PORT}/api/users`);
};

// TODO: Go through this prototype and see why it works. Consult documentation:
// https://orm.drizzle.team/docs/rqb#find-first
// https://orm.drizzle.team/docs/get-started/postgresql-new
// https://orm.drizzle.team/docs/sql-schema-declaration

// TODO: Endpoint notes!!!
//
// Users should have a search query param that uses "like" to find users
// http://localhost:3000/api/users?search=
//
