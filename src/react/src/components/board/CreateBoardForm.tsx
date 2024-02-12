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
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { type CreateBoardRequest } from "../../grpc/board";
import { BoardServiceClient } from "../../grpc/board.client";
import { type Empty } from "../../grpc/google/protobuf/empty";
import { useAuth } from "../../utils/auth";
import { BoardSchema } from "../../model/BoardTypes";
import { useQueryClient } from "@tanstack/react-query";

async function sendCreateBoardRequest(
	title: string,
	creatorId: string,
	token: string,
): Promise<Empty> {
	const boardRequest: CreateBoardRequest = {
		title: title,
		creatorId: creatorId,
		token: token,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new BoardServiceClient(transport);
	const { response } = await client.createBoard(boardRequest);
	return response;
}

export const CreateBoardForm = () => {
	const client = useQueryClient();
	const auth = useAuth();
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof BoardSchema>>({
		resolver: zodResolver(BoardSchema),
		defaultValues: {
			title: "",
		},
	});

	if (!auth.isAuthenticated) {
		void navigate({ to: "/" });
	}

	const onSubmit = async (values: z.infer<typeof BoardSchema>) => {
		const response = await sendCreateBoardRequest(
			values.title,
			auth.user,
			auth.token,
		);
		console.log(response);
		void client.invalidateQueries({ queryKey: ["boards"] });
		await navigate({ to: "/" });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-xs space-y-6"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Inspring board title"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Create</Button>
			</form>
		</Form>
	);
};
