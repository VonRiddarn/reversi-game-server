// Type safe environment variables that also gives dot access.
declare namespace NodeJS {
	interface ProcessEnv {
		DATABASE_URL: string;
		PORT: string;
	}
}
