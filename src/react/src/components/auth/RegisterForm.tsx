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
import { useForm } from "react-hook-form";
import { UserAuthSchema } from "../../model/UserTypes";
import { type z } from "zod";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { type AuthResponse, type UserDTO } from "../../grpc/auth";
import { AuthServiceClient } from "../../grpc/auth.client";
import { useAuth } from "../../utils/auth";
import { useNavigate } from "@tanstack/react-router";

async function sendRegisterRequest(
	username: string,
	password: string,
): Promise<AuthResponse> {
	const registerRequest: UserDTO = {
		username: username,
		password: password,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new AuthServiceClient(transport);
	const { response } = await client.register(registerRequest);
	return response;
}

export const RegisterForm = () => {
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
		const { token } = await sendRegisterRequest(
			values.username,
			values.password,
		);
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
				<Button type="submit">Register</Button>
			</form>
		</Form>
	);
};
