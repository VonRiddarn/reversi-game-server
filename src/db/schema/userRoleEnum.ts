import { pgEnum } from "drizzle-orm/pg-core";

export const UserRoleEnum = pgEnum("role_enum", ["Member", "Admin", "Banned"]);
