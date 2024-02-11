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
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { AuthServiceClient } from "../grpc/auth.client";
import { type AuthResponse, type UserDTO } from "../grpc/auth";
import { UserAuthSchema } from "../model/UserTypes";
import { useAuth } from "../utils/auth";
import { useNavigate } from "@tanstack/react-router";

async function sendLoginRequest(
	user: string,
	pass: string,
): Promise<AuthResponse> {
	const loginRequest: UserDTO = {
		username: user,
		password: pass,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new AuthServiceClient(transport);
	const { response } = await client.login(loginRequest);
	return response;
}

export const LoginForm = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof UserAuthSchema>>({
		resolver: zodResolver(UserAuthSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof UserAuthSchema>) => {
		const { token } = await sendLoginRequest(
			values.username,
			values.password,
		);
		console.log(token);

		if (token === "") {
			form.setError("root", {
				type: "server",
				message: "Wrong password or username",
			});
		} else {
			auth.setUser(token);
			await navigate({ to: "/" });
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-xs space-y-6"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="*****"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Login</Button>
			</form>
		</Form>
	);
};
