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
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { type MessageRequest, type MessageResponse } from "src/grpc/chat";
import { type z } from "zod";
import { MessageServiceClient } from "../grpc/chat.client";
import { useSocketIo } from "../hooks/useSocketIo";
import { ChatMessage } from "./ChatMessage";
import { LoadinSkeleton } from "./LoadingSkeleton";
import { ChatMessageSchema } from "~/model/ChatTypes";

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
		queryKey: ["users", { room }],
		queryFn: () => getAllChatMessages(room),
		staleTime: Infinity,
	});
};

interface ChatProps {
	chatRoom: string;
}

export const Chat = ({ chatRoom = "123" }: ChatProps) => {
	const client = useQueryClient();
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
		socket.on("get_message", function (data) {
			console.log("Received message", data);
			void client.invalidateQueries({
				queryKey: ["users", { chatRoom }],
			});
		});

		socket.connect();
	}, [client, isLoading, chatRoom, socket]);

	if (isLoading) {
		return <LoadinSkeleton></LoadinSkeleton>;
	}

	const onSubmit = (values: z.infer<typeof ChatMessageSchema>) => {
		if (!socket) {
			return;
		}
		const jsonObject = {
			type: "CLIENT",
			message: values.msg,
			room: chatRoom,
		};
		console.log(jsonObject);
		socket.emit("send_message", jsonObject);
	};

	const sendDisconnect = () => {
		!!socket && socket.disconnect();
	};

	return (
		<>
			<ScrollArea className="h-72 w-1/3 rounded-md border p-2">
				{!!grpcResponse &&
					grpcResponse.messages.map((msg) => (
						<div key={msg.messageId}>
							<ChatMessage
								messageStyle={"OWNER_MSG"}
								message={msg.content}
								created_at={msg.createdAt}
							></ChatMessage>
						</div>
					))}
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
			<Button variant="outline" onClick={sendDisconnect}>
				<span className="sr-only">Disconnect</span>
				<Cross2Icon></Cross2Icon>
			</Button>
		</>
	);
};
