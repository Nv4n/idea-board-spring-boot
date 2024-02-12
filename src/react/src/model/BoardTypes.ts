import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import {
	GetBoardRequest,
	type GetAllBoardsRequest,
	type GetAllBoardsResponse,
	BoardDto,
	GetAllNotesResponse,
	GetAllNotesRequest,
} from "../grpc/board";
import { BoardServiceClient } from "../grpc/board.client";

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

export const boardsQueryOptions = (token: string) => {
	return queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ["boards"],
		queryFn: () => getAllBoards(token),
		staleTime: 5 * 60 * 1000,
	});
};

export const boardQueryOptions = (token: string, bid: string) => {
	return queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ["board", bid],
		queryFn: () => getBoard(token, bid),
		staleTime: 5 * 60 * 1000,
	});
};

async function getBoard(token: string, bid: string): Promise<BoardDto> {
	const request: GetBoardRequest = {
		token: token,
		boardId: bid,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new BoardServiceClient(transport);
	const { response } = await client.getBoard(request);
	return response;
}

async function getAllBoards(token: string): Promise<GetAllBoardsResponse> {
	const request: GetAllBoardsRequest = {
		token: token,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new BoardServiceClient(transport);
	const { response } = await client.getAllBoards(request);
	return response;
}

export const notesQueryOptions = (token: string, bid: string) => {
	return queryOptions({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ["notes", bid],
		queryFn: () => getNotes(token, bid),
		staleTime: 5 * 60 * 1000,
	});
};

async function getNotes(
	token: string,
	bid: string,
): Promise<GetAllNotesResponse> {
	const request: GetAllNotesRequest = {
		token: token,
		boardId: bid,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new BoardServiceClient(transport);
	const { response } = await client.getAllNotes(request);
	return response;
}
