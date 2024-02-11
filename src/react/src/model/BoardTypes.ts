import { z } from "zod";

export const BoardSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, {
			message: "Board's title can't be blank",
		})
		.max(32, {
			message: "Board's title can't be longer than 32 symbols",
		}),
});
