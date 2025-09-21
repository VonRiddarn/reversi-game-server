import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema",
	out: "./drizzle",
	dbCredentials: {
		// Here we can separate later.
		// host:
		// password:
		url: process.env.DATABASE_URL!,
	},
});
