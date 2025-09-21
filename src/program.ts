import express from "express";
import { PrismaClient } from "@prisma/client";
import { newApiResponse } from "./models/ApiResponse.js";
import { StatusCodes } from "http-status-codes";
import { attachApiResponse } from "./extentions/ResponseExtentions.js";
import { hashPassword, validatePassword } from "./services/AuthServices.js";

const app = express();
const prisma = new PrismaClient();
app.use(attachApiResponse);

// Try some hashing
const hash = await hashPassword("PleaseProtectMe");
console.log(hash);
console.log(await validatePassword("PweaseProtectMe", hash));
console.log(await validatePassword("PleaseProtectMe", hash));
//

app.get("/api/users/:username", async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				username: {
					equals: req.params.username,
					mode: "insensitive",
				},
			},
		});

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
