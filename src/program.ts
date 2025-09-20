import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

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

		if (!user) return res.status(404).json({ error: "User not found" });

		// Expose only public data
		const { id, username, age } = user;
		res.json({ id, username, age });
		res.status(200);
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}

	return res;
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
