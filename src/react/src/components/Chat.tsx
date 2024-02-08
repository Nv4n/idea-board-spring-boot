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
import { useSocketIo } from "../hooks/useSocketIo";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

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
	const [room, _setRoom] = useState<string>("124");
	const {
		data: _messages,
		isLoading: _loading,
		isError: _error,
	} = useQuery({
		queryKey: ["chat", room],
		queryFn: () => "",
	});
	const socket = useSocketIo(room);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			msg: "",
		},
	});

	useEffect(() => {
		if (!socket) {
			return;
		}
		socket.on("get_message", function (data) {
			console.log("Received message", data);
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
