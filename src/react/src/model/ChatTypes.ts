import { strict } from "assert";
import { z } from "zod";

export const ChatMessageSchema = z.object({
	msg: z
		.string()
		.trim()
		.min(1, {
			message: "Message can't be blank",
		})
		.max(256, {
			message: "Message can't be longer than 256 symbols",
		}),
});

export type ChatMessageDto = {
	id: string;
	senderId: string;
	content: string;
	createdAt: Date;
};

export type ChatSocketResponse = {
	type: string;
	messageDto: ChatMessageDto;
};


