import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ApiResponse } from "../models/ApiResponse.js";

// Declare module = Extend existing module
// Extend the interface "Response" (default interface of res)
// Add normalize as a method.

declare module "express-serve-static-core" {
	interface Response {
		apiResponse: <T>(apiResponse: ApiResponse<T>) => this;
	}
}

// Add an extention method to the Response objects (res) for configuring the object using a normalized dto.
export const attachApiResponse: RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
	res.apiResponse = function <T>(apiResponse: ApiResponse<T>) {
		return this.status(apiResponse.status).json(apiResponse);
	};

	next();
};
