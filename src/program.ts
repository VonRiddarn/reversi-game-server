import express from "express";
import { newApiResponse } from "./models/ApiResponse.js";
import { StatusCodes } from "http-status-codes";
import { attachApiResponse } from "./extentions/ResponseExtentions.js";
import { hashPassword, validatePassword } from "./services/AuthServices.js";

const app = express();
app.use(attachApiResponse);

// Try some hashing
const hash = await hashPassword("PleaseProtectMe");
console.log(hash);
console.log(await validatePassword("PweaseProtectMe", hash));
console.log(await validatePassword("PleaseProtectMe", hash));
//

app.get("/api/users/:username", async (_req, res) => {
	try {
		// Hard code until we have re-applied a ORM.
		const user = { id: 1, username: "alice", age: 33 };

		if (!user) return res.apiResponse(newApiResponse(StatusCodes.NOT_FOUND, "User not found."));

		const { id, username, age } = user;

		return res.apiResponse(newApiResponse(StatusCodes.OK, "User found.", { id, username, age }));
	} catch (err) {
		return res.apiResponse(
			newApiResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error.", err)
		);
	}
});

app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
