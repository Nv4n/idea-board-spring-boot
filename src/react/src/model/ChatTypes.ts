import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { type ChatRequest, type ChatResponse } from "../grpc/chat";
import { ChatServiceClient } from "../grpc/chat.client";

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

export type ChatSocketError = {
	type: string;
	error: string;
};

export const chatQueryOptions = (room: string) => {
	return queryOptions({
		queryKey: ["chat", room],
		queryFn: () => getAllChatMessages(room),
		staleTime: Infinity,
	});
};

async function getAllChatMessages(room: string): Promise<ChatResponse> {
	const msgRequest: ChatRequest = {
		chatRoom: room,
		requestedChunkSize: 25,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new ChatServiceClient(transport);
	const { response } = await client.getAllMessages(msgRequest);
	return response;
}
