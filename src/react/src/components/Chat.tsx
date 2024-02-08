import { Badge } from "@/components/ui/badge";
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
import { ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type Socket, io } from "socket.io-client";
import { z } from "zod";

const formSchema = z.object({
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

export const Chat = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [room, _setRoom] = useState<string>("124");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			msg: "",
		},
	});
	useEffect(() => {
		setSocket(
			io(`localhost:9092/?room=${room}`, {
				reconnectionDelay: 500,
				reconnectionAttempts: 3,
				autoConnect: false,
				secure: true,
				transportOptions: ["pooling", "websocket"],
				auth: {
					token: "abc123",
				},
			}),
		);

		return () => {
			if (socket) {
				socket.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		if (!socket) {
			return;
		}
		socket.on("connect", function () {
			console.log(`Connected with ID: ${socket.id}`);
		});
		socket.on("get_message", function (data) {
			console.log("Received message", data);
		});
		socket.on("disconnect", function () {
			console.log("The client has disconnected!");
		});
		socket.on("reconnect_attempt", (attempts) => {
			console.log(`Try to reconnect at ${attempts} attempt(s).`);
		});
		socket.connect();
	}, [socket]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		const jsonObject = {
			type: "CLIENT",
			message: values.msg,
			room: room,
		};
		!!socket && socket.emit("send_message", jsonObject);
	};

	const sendDisconnect = () => {
		!!socket && socket.disconnect();
	};
	return (
		<>
			<ScrollArea className="h-72 w-1/3 rounded-md border p-2">
				<div className="flex flex-col items-start gap-2">
					<span className="rounded-lg rounded-bl-none bg-primary p-2 text-input">
						Some damn message 1
					</span>
					<Badge variant="outline">11/02/2013</Badge>
				</div>
				<div className="flex flex-col items-end gap-2">
					<span className="rounded-lg rounded-br-none bg-primary/50 p-2">
						Some damn message 2
					</span>
					<Badge className="w-fit" variant="outline">
						11/02/2013
					</Badge>
				</div>
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
