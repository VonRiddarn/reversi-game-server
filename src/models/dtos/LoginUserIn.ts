type _LoginWithPassword = {
	username: string;
	password: string;
};

type _LoginWithAuthToken = {
	authToken: string;
};

export type LoginUserIn = _LoginWithPassword | _LoginWithAuthToken;
