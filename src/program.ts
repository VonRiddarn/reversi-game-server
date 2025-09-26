import "dotenv/config";
import express from "express";
import { attachApiResponse } from "./middleware/ExtendResponse.ts";
import { userRouter, USERS_ROOT } from "./controllers/userEndpoints.ts";

const app = express();
app.use(attachApiResponse);
app.use(express.json());
app.use(USERS_ROOT, userRouter);
app.listen(process.env.PORT, startMessage);

function startMessage() {
	console.log("\nServer is now operating.");
	console.log(`\tServer running on http://localhost:${process.env.PORT}`);
}

// TODO: Go through this prototype and see why it works. Consult documentation:
// https://orm.drizzle.team/docs/rqb#find-first
// https://orm.drizzle.team/docs/get-started/postgresql-new
// https://orm.drizzle.team/docs/sql-schema-declaration

// TODO: Endpoint notes!!!
//
// Users should have a search query param that uses "like" to find users
// http://localhost:3000/api/users?search=
//
