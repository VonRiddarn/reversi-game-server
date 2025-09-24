type LoginWithPasswordIn = {
	username: string;
	password: string;
};

type LoginWithAuthTokenIn = {
	authToken: string;
};

export type LoginUserIn = LoginWithPasswordIn | LoginWithAuthTokenIn;
