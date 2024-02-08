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
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			msg: "",
		},
	});

	const userName = "user" + Math.floor(Math.random() * 1000 + 1);
	// const manager = new Manager("localhost:9092", {});

	// const socket = manager.socket("/chat?token=abs123");
	// manager.open((err) => {
	// 	if (err) {
	// 		console.log(err);
	// 		// an error has occurred
	// 	} else {
	// 		console.log("!!!!!!!!!!!!!!!!!");
	// 		// the connection was successfully established
	// 	}
	// });
	const socket = io("ws://localhost:9092/chat", {
		reconnectionDelayMax: 3000,
		autoConnect: false,
		auth: {
			token: "abc123",
		},
		transportOptions: ["pooling", "websocket"],
	});
	socket.connect();
	socket.on("connect", function () {
		console.log(`Connected with username: ${userName}`);
	});
	socket.on("chat", function (data) {
		console.log("Received message", data);
	});
	socket.on("disconnect", function () {
		console.log("The client has disconnected!");
	});
	socket.on("reconnect_attempt", (attempts) => {
		console.log(`Try to reconnect at ${attempts} attempt(s).`);
	});

	socket.on("disconnect", () => {
		console.log(socket.id); // undefined
	});
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		const jsonObject = {
			userName: userName,
			message: values.msg,
			actionTime: new Date(),
		};
		socket.emit("chat", jsonObject);
	};

	const sendDisconnect = () => {
		socket.disconnect();
	};
	return (
		<>
			<ScrollArea className="h-72 w-1/3 rounded-md border p-2">
				<div className="flex flex-col items-start gap-2">
					<span className="rounded-lg rounded-bl-none bg-primary p-2 text-white">
						Some damn message 1
					</span>
					<Badge variant="outline">11/02/2013</Badge>
				</div>
				<div className="flex flex-col items-end gap-2">
					<span className="rounded-lg rounded-br-none bg-primary p-2 text-white">
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
