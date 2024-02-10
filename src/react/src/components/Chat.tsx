import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Timestamp } from "../grpc/google/protobuf/timestamp";
import {
	MessageResponse,
	type Message,
	type MessageRequest,
} from "../grpc/chat";
import { MessageServiceClient } from "../grpc/chat.client";
import { useSocketIo } from "../hooks/useSocketIo";
import {
	ChatMessageSchema,
	type ChatSocketResponse,
	type ChatMessageDto,
} from "../model/ChatTypes";
import { ChatMessage } from "./ChatMessage";
import { LoadinSkeleton } from "./LoadingSkeleton";
import { Separator } from "@radix-ui/react-separator";
import { ScrollBar } from "@/components/ui/scroll-area";

async function getAllChatMessages(room: string): Promise<MessageResponse> {
	const msgRequest: MessageRequest = {
		chatRoom: room,
		requestedChunkSize: 25,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new MessageServiceClient(transport);
	const { response } = await client.getAllMessages(msgRequest);
	return response;
}

const chatQueryOptions = (room: string) => {
	return queryOptions({
		queryKey: ["chat", room],
		queryFn: () => getAllChatMessages(room),
		staleTime: Infinity,
	});
};

interface ChatProps {
	chatRoom: string;
}

export const Chat = ({ chatRoom = "123" }: ChatProps) => {
	const client = useQueryClient();
	const randId = Math.random.toString();
	const {
		data: grpcResponse,
		isLoading,
		isError,
	} = useQuery(chatQueryOptions(chatRoom));

	if (isError) {
		throw new Error("Can't load any messages");
	}

	const socket = useSocketIo(chatRoom);
	const form = useForm<z.infer<typeof ChatMessageSchema>>({
		resolver: zodResolver(ChatMessageSchema),
		defaultValues: {
			msg: "",
		},
	});

	useEffect(() => {
		if (!socket || isLoading) {
			return;
		}
		socket.on(
			"get_message",
			function ({ type, messageDto: msgDto }: ChatSocketResponse) {
				console.log("Received message", type, msgDto);

				const currentData = client.getQueryData([
					"chat",
					chatRoom,
				]) as MessageResponse;
				console.log(currentData);

				const newEnity: Message = {
					messageId: msgDto.id,
					senderId: msgDto.senderId,
					content: msgDto.content,
					createdAt: Timestamp.fromDate(new Date(msgDto.createdAt)),
				};
				const newData: MessageResponse = {
					messages: [...currentData.messages, newEnity],
				};
				form.setValue("msg", "");
				client.setQueryData(["chat", chatRoom], newData);
			},
		);

		socket.connect();
	}, [client, isLoading, chatRoom, socket]);

	if (isLoading) {
		return <LoadinSkeleton></LoadinSkeleton>;
	}

	const onSubmit = (values: z.infer<typeof ChatMessageSchema>) => {
		if (!socket) {
			return;
		}
		const chatMessage: ChatMessageDto = {
			id: randId,
			senderId: "dasdasdad",
			content: values.msg,
			createdAt: new Date(),
		};
		const jsonObject = {
			type: "CLIENT",
			messageDto: chatMessage,
			room: chatRoom,
		};
		console.log(jsonObject);
		socket.emit("send_message", jsonObject);
	};

	return (
		<>
			<ScrollArea className="max-h-72 w-1/3 overflow-hidden rounded-md border p-2">
				<div className="p-4">
					<h4 className="mb-4 text-sm font-medium leading-none">
						Tags
					</h4>
					{!!grpcResponse &&
						grpcResponse.messages.map((msg) => (
							<div key={msg.messageId}>
								<>
									<ChatMessage
										messageStyle={"OWNER_MSG"}
										message={msg.content}
										created_at={msg.createdAt}
									></ChatMessage>
								</>
							</div>
						))}
				</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-xs space-y-6"
				>
					<div className="relative">
						<FormField
							control={form.control}
							name="msg"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="sr-only ">
										Chat message
									</FormLabel>
									<FormControl>
										<Input
											className="pr-14"
											placeholder="send something"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							variant="outline"
							type="submit"
							className="absolute right-0 top-0"
						>
							<span className="sr-only">Send</span>
							<ChevronRightIcon></ChevronRightIcon>
						</Button>
						<Button
							variant="outline"
							type="submit"
							className="absolute right-0 top-0"
						>
							<span className="sr-only">Send</span>
							<ChevronRightIcon></ChevronRightIcon>
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
