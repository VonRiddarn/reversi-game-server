import express from "express";
import * as userServices from "../services/userService.ts";
import type { UserPublicOut } from "../models/dtos/UserPublicOut.ts";
import { newApiResponse } from "../models/ApiResponse.ts";
import { StatusCodes } from "http-status-codes";

export const USERS_ROOT = "/api/users" as const;

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
	const searchParam = req.query.search as string | undefined;
	try {
		const userDto: UserPublicOut[] = searchParam
			? await userServices.getUsersBySearchParam(searchParam)
			: await userServices.getUsersAll();
		if (!userDto || userDto.length <= 0)
			return res.apiResponse(newApiResponse(StatusCodes.NOT_FOUND, "No users found."));

		return res.apiResponse(newApiResponse(StatusCodes.OK, "Found users.", userDto));
	} catch (err) {
		return res.apiResponse(
			newApiResponse(
				StatusCodes.INTERNAL_SERVER_ERROR,
				`Error getting users from database: ${(err as Error).message}`,
				err
			)
		);
	}
});

userRouter.get("/:username", async (req, res) => {
	const { username } = req.params;

	try {
		const userDto = userServices.getUserByUsername(username);

		if (!userDto) return res.apiResponse(newApiResponse(StatusCodes.NOT_FOUND, "User not found."));

		return res.apiResponse(newApiResponse(StatusCodes.OK, "User found.", userDto));
	} catch (err) {
		return res.apiResponse(
			newApiResponse(
				StatusCodes.INTERNAL_SERVER_ERROR,
				`Error getting users from database: ${(err as Error).message}`,
				err
			)
		);
	}
});
