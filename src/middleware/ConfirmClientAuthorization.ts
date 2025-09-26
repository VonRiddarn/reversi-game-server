import type { Request, Response, NextFunction } from "express";
import { newApiResponse } from "../models/ApiResponse.ts";
import { StatusCodes } from "http-status-codes";

export const confirmClientAutorization = (req: Request, res: Response, next: NextFunction): void => {
	if (req.headers["x-client-key"] !== process.env.CLIENT_KEY) {
		res.apiResponse(newApiResponse(StatusCodes.UNAUTHORIZED, "Missing or invalid client password."));
		return;
	}
	next();
};
