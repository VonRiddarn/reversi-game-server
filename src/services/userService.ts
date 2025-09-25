import * as userRepository from "../repositories/userRepository.ts";
import * as inviteRepository from "../repositories/inviteRepository.ts";
import * as authTokenRepository from "../repositories/authTokenRepository.ts";
import { StatusCodes } from "http-status-codes";
import { newApiResponse } from "../models/ApiResponse.ts";
import { toUserPublicOut, toUserPublicOutArray, type UserPublicOut } from "../models/dtos/UserPublicOut.ts";
import {
	PASSWORD_LENGTH_MAX,
	PASSWORD_LENGTH_MIN,
	USERNAME_LENGTH_MAX,
	USERNAME_LENGTH_MIN,
	type UserSelect,
} from "../models/entities/User.ts";
import type { RegisterUserIn } from "../models/dtos/RegisterUserIn.ts";
import { generateToken, hashPassword, hashToken } from "./authService.ts";
import { db } from "../db/db.ts";

// TODO: GetUserByIdPartial ("username") -- Alternative just make a getUsername method ?

export const getUsersAllInternal = async (): Promise<UserSelect[]> => await userRepository.findAll();

export const getUsersAll = async (): Promise<UserPublicOut[]> =>
	toUserPublicOutArray(await getUsersAllInternal());

export const getUsersByUsernameInternal = async (username: string): Promise<UserSelect | undefined> =>
	await userRepository.findByUsername(username);

export const getUserByUsername = async (username: string): Promise<UserPublicOut | undefined> => {
	const user = await getUsersByUsernameInternal(username);
	if (!user) return undefined;

	return toUserPublicOut(user);
};

export const getUsersBySearchParamInternal = async (search: string): Promise<UserSelect[]> =>
	await userRepository.findBySearchParam(search);

export const getUsersBySearchParam = async (search: string): Promise<UserPublicOut[]> =>
	toUserPublicOutArray(await getUsersBySearchParamInternal(search));

export const newUser = async (request: RegisterUserIn) => {
	request.username = request.username.trim();
	request.inviteCode = request.inviteCode.trim();

	// Check invite - done here so we don't excessively call the database.
	const invite = await inviteRepository.findByRedeemCode(request.inviteCode);

	if (!invite || invite.usesLeft < 1 || invite.expiresAt >= new Date())
		return newApiResponse(StatusCodes.BAD_REQUEST, "Invalid or expired invite token.");

	// Check user
	const deviation = await validateRegisterUserIn(request);
	if (deviation) return deviation;

	const pwHash = await hashPassword(request.password);
	const authtoken = await generateToken();

	const verDate = new Date();
	verDate.setDate(verDate.getDate() + invite.userVerificationCooldownDays);

	// BEGIN CREATION - TRANSACTIONAL FLOW

	// TODO: Break into bite-sized methods like:
	// validateRegisterUserIn()
	// createUserWithToken(tx, request, pwHash, authtoken, verDate)
	// updateInviteUses(tx, invite.id)

	try {
		return await db.transaction(async (tx) => {
			const userInternal = await userRepository.createUserTransactional(tx, {
				refererId: invite.creatorId,
				role: invite.grantsRole,
				username: request.username,
				passwordHash: pwHash,
				verificationDate: verDate,
				avatarId: request.cosmetics?.avatarId ?? 0,
				brickId: request.cosmetics?.brickId ?? 0,
			});

			if (!userInternal) throw new Error("User does not exist after initialization.");

			await authTokenRepository.createAuthTokenTransactional(tx, {
				userId: userInternal.id,
				tokenHash: await hashToken(authtoken),
			});

			await inviteRepository.editByIdTransactional(tx, invite.id, {
				usesLeft: invite.usesLeft - 1,
			});

			return newApiResponse(
				StatusCodes.OK,
				`User [${userInternal.id} : ${userInternal.username}] created successfully.`,
				{
					user: toUserPublicOut(userInternal),
					authToken: authtoken,
				}
			);
		});
	} catch (err) {
		return newApiResponse(
			StatusCodes.INTERNAL_SERVER_ERROR,
			"Something went wrong when creating the user."
		);
	}
};

export const validateRegisterUserIn = async (request: RegisterUserIn) => {
	if (!request || !request.inviteCode || !request.username)
		return newApiResponse(StatusCodes.BAD_REQUEST, "Request is missing required arguments.");

	if (request.username.length < USERNAME_LENGTH_MIN)
		return newApiResponse(
			StatusCodes.BAD_REQUEST,
			`Username must be at least ${USERNAME_LENGTH_MIN} characters long.`
		);

	if (request.username.length >= USERNAME_LENGTH_MAX)
		return newApiResponse(
			StatusCodes.BAD_REQUEST,
			`Username cannot be longer than ${USERNAME_LENGTH_MAX} characters.`
		);

	if (request.password.length < PASSWORD_LENGTH_MIN)
		return newApiResponse(
			StatusCodes.BAD_REQUEST,
			`Password must be at least ${PASSWORD_LENGTH_MIN} characters long.`
		);

	if (request.password.length >= PASSWORD_LENGTH_MAX)
		return newApiResponse(
			StatusCodes.BAD_REQUEST,
			`Password cannot be longer than ${PASSWORD_LENGTH_MAX} characters long.`
		);

	if (await userRepository.findByUsername(request.username))
		return newApiResponse(StatusCodes.CONFLICT, `User "${request.username}" already exists!`);

	return null;
};
