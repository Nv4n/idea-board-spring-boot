import { z } from "zod";

export const UserAuthSchema = z.object({
	username: z
		.string()
		.min(5, {
			message: "Username must be at least 5 characters.",
		})
		.max(32, {
			message: "Username must be less than 32 characters",
		}),
	password: z
		.string()
		.min(5, {
			message: "Password must be at least 5 characters",
		})
		.max(32, {
			message: "Password must be less than 32 characters",
		})
		.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{5,32}$/, {
			message:
				"Password must contain at least one of each characters: a-z, A-Z, 0-9, special symbol",
		}),
});
