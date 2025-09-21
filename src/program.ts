import express from "express";
import { newApiResponse } from "./models/ApiResponse.js";
import { StatusCodes } from "http-status-codes";
import { attachApiResponse } from "./extentions/ResponseExtentions.js";
import { hashPassword, validatePassword } from "./services/AuthServices.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./db/schema/users.js";
import { eq } from "drizzle-orm";
import { newUserPublic, type UserInsert, type UserPublic, type UserSelect } from "./models/entities/User.js";

const app = express();
app.use(attachApiResponse);

const db = drizzle(process.env.DATABASE_URL!);

// Try some hashing
const hash = await hashPassword("PleaseProtectMe");
console.log(hash);
console.log(await validatePassword("PweaseProtectMe", hash));
console.log(await validatePassword("PleaseProtectMe", hash));
//

// DB SEED 1 USER.
// TODO: Find out what the hell .$inderInsert is and how we can make this pretty.
const user: UserInsert = {
	age: 33,
	name: "Alice",
	email: "alice.lastname@maildomain.com",
};

try {
	await db.insert(usersTable).values(user);
	console.log("New user created!");
} catch (err) {
	console.log(err);
}

// /DB SEED/

app.get("/api/users/:username", async (req, res) => {
	try {
		const user: UserSelect | undefined = (
			await db.select().from(usersTable).where(eq(usersTable.name, req.params.username)).limit(1)
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
