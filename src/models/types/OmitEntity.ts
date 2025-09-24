export type OmitEntity<T, K extends keyof T = never> = Partial<Omit<T, K | "id" | "updatedAt" | "createdAt">>;
