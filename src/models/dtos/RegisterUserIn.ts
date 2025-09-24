import type { SetCosmeticsIn } from "./SetCosmeticsIn.ts";

export type RegisterUserIn = {
	username: string;
	password: string;
	inviteCode: string;
	cosmetics?: SetCosmeticsIn;
	// Can add more things if we expand user registration
	// IE: termsAccepter
};
