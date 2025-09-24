export type OmitEntity<T, K extends keyof T = never> = Omit<T, K | "id" | "updatedAt" | "createdAt">;

export type OmitEntityPatrial<T, K extends keyof T = never> = Partial<
	Omit<T, K | "id" | "updatedAt" | "createdAt">
>;
