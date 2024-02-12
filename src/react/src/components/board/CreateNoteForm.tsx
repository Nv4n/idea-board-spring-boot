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
import { type CreateNoteRequest } from "../../grpc/board";
import { BoardServiceClient } from "../../grpc/board.client";
import { type Empty } from "../../grpc/google/protobuf/empty";
import { NoteSchema } from "../../model/NoteTypes";
import { useAuth } from "../../utils/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";

async function sendCreateNoteRequest(
	note: string,
	creator: string,
	token: string,
	board: string,
): Promise<Empty> {
	const noteRequest: CreateNoteRequest = {
		content: note,
		creator: creator,
		token: token,
		boardId: board,
	};
	const transport = new GrpcWebFetchTransport({
		baseUrl: "http://localhost:8000",
	});

	const client = new BoardServiceClient(transport);
	const { response } = await client.createNote(noteRequest);
	return response;
}

interface CreateNoteProps {
	board: string;
}

export const CreateNoteForm = ({ board }: CreateNoteProps) => {
	const client = useQueryClient();
	const auth = useAuth();
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof NoteSchema>>({
		resolver: zodResolver(NoteSchema),
		defaultValues: {
			content: "",
		},
	});

	if (!auth.isAuthenticated) {
		void navigate({ to: "/" });
	}

	const onSubmit = async (values: z.infer<typeof NoteSchema>) => {
		const response = await sendCreateNoteRequest(
			values.content,
			auth.user,
			auth.token,
			board,
		);
		console.log(response);
		void client.invalidateQueries({ queryKey: ["notes", board] });
		await navigate({ to: "/board/$board", params: { board: board } });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-xs space-y-6"
			>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Note content</FormLabel>
							<FormControl>
								<Textarea
									placeholder="# H1 markdown"
									className="max-h-72"
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
