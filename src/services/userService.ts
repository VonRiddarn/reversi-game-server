import { toUserPublicOut, toUserPublicOutArray, type UserPublicOut } from "../models/dtos/UserPublicOut.ts";
import type { UserSelect } from "../models/entities/User.ts";
import * as userRepository from "../repositories/userRepository.ts";

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
