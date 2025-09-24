import { StatusCodes } from "http-status-codes";

export type ApiResponse<T> = {
	status: StatusCodes;
	message: string;
	data: T | null;
	// TODO: Add pagination?: PaginationMeta;
	// TODO: Add params as required field - that way we can do global things like "nodata"
};

export const newApiResponse = <T>(
	status: StatusCodes,
	message: string,
	data: T | null = null
): ApiResponse<T> => ({
	status,
	message,
	data,
});

/*
	"This is not necessary, you can make an inline object and force the type with { ... }: ApiResponse"
	Yes, that is true, but this way if I ever need to change the signature for any reason I can easily affect all responses.
	This is a way to normalize the data so that the response parsing is easier for the frontend.

	Eg: If we want to add a timestamp we just do it here instead of trying to fin N places in code.
*/
