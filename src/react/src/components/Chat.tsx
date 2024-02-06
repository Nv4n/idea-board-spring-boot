import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
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

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="msg"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="sr-only">
									Chat message
								</FormLabel>
								<FormControl>
									<Input
										minLength={1}
										maxLength={256}
										placeholder="send something"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant="outline" type="submit">
						<span className="sr-only">Send</span>
						<ChevronRightIcon></ChevronRightIcon>
					</Button>
				</form>
			</Form>
		</>
	);
};
