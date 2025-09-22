import "dotenv/config";
import express from "express";
import { newApiResponse } from "./models/ApiResponse.ts";
import { StatusCodes } from "http-status-codes";
import { attachApiResponse } from "./extentions/ResponseExtentions.ts";
import { hashPassword, validatePassword } from "./services/AuthServices.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";
import { newUserPublic, type UserInsert, type UserPublic, type UserSelect } from "./models/entities/User.ts";
import { users } from "./db/schema/users.ts";

const app = express();
app.use(attachApiResponse);

const db = drizzle(process.env.DATABASE_URL!);

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

app.get("/api/users/:username", async (req, res) => {
	try {
		const user: UserSelect | undefined = (
			await db
				.select()
				.from(users)
				.where(eq(sql`lower(${users.username})`, req.params.username.toLowerCase()))
				.limit(1)
		)[0];

		if (!user) return res.apiResponse(newApiResponse(StatusCodes.NOT_FOUND, "User not found."));

		return res.apiResponse(
			newApiResponse<UserPublic>(StatusCodes.OK, "User found.", newUserPublic(user))
		);
	} catch (err) {
		return res.apiResponse(
			newApiResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error.", err)
		);
	}
});

app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));

// TODO: Go through this prototype and see why it works. Consult documentation:
// https://orm.drizzle.team/docs/rqb#find-first
// https://orm.drizzle.team/docs/get-started/postgresql-new
// https://orm.drizzle.team/docs/sql-schema-declaration
