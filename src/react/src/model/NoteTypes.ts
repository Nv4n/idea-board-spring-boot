import { z } from "zod";

export const NoteSchema = z.object({
	content: z
		.string()
		.trim()
		.min(1, {
			message: "Note can't be blank",
		})
		.max(256, {
			message: "Note can't be longer than 256 symbols",
		}),
});
