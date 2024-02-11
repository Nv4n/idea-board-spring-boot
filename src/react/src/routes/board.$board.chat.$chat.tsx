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
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChatBox } from "../components/chat/ChatBox";
import { LoadinSkeleton } from "../components/default/LoadingSkeleton";
import { type Message, type ChatResponse } from "../grpc/chat";
import { Timestamp } from "../grpc/google/protobuf/timestamp";
import { useSocketIo } from "../hooks/useSocketIo";
import {
	ChatMessageSchema,
	chatQueryOptions,
	type ChatMessageDto,
	type ChatSocketError,
	type ChatSocketResponse,
} from "../model/ChatTypes";

export const Route = createFileRoute("/board/$board/chat/$chat")({
	parseParams: (params) => {
		chat: z.string().uuid().parse(String(params.chat));
	},
	stringifyParams: ({ board, chat }) => ({
		board: `${board}`,
		chat: `${chat}`,
	}),
	component: Chat,
});

interface ChatProps {
	chatRoom: string;
}

function Chat({
	chatRoom = "41f172b7-5e07-47fd-8a4c-c3ffd4e77c01",
}: ChatProps) {
	const [socketError, setSocketError] = useState<string | null>(null);
	const client = useQueryClient();
	const {
		data: grpcResponse,
		isLoading,
		isError,
	} = useQuery(chatQueryOptions(chatRoom));

	if (isError) {
		throw Error("Can't load any messages");
	}
	if (!!socketError) {
		throw Error(socketError);
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
		socket.on("error_chat", ({ type: _type, error }: ChatSocketError) => {
			setSocketError(error);
		});

		socket.on(
			"get_message",
			({ type: _type, messageDto: msgDto }: ChatSocketResponse) => {
				const currentData = client.getQueryData([
					"chat",
					chatRoom,
				]) as ChatResponse;

				const newEnity: Message = {
					messageId: msgDto.id,
					senderId: msgDto.senderId,
					content: msgDto.content,
					createdAt: Timestamp.fromDate(new Date(msgDto.createdAt)),
				};
				const newData: ChatResponse = {
					messages: [newEnity, ...currentData.messages],
				};
				form.setValue("msg", "");
				client.setQueryData(["chat", chatRoom], newData);
			},
		);

		socket.connect();
	}, [client, isLoading, chatRoom, socket, form]);

	if (isLoading) {
		return <LoadinSkeleton></LoadinSkeleton>;
	}

	const onSubmit = (values: z.infer<typeof ChatMessageSchema>) => {
		if (!socket) {
			return;
		}
		const chatMessage: Omit<ChatMessageDto, "id"> = {
			senderId: "dasdasdad",
			content: values.msg,
			createdAt: new Date(),
		};
		const jsonObject = {
			type: "CLIENT",
			messageDto: chatMessage,
			room: chatRoom,
		};
		socket.emit("send_message", jsonObject);
	};

	return (
		<>
			<ChatBox
				messages={!!grpcResponse ? grpcResponse.messages : []}
			></ChatBox>
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
					</div>
				</form>
			</Form>
		</>
	);
}
