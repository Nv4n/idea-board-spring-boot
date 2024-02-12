import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Note } from "../components/board/Note";
import { useAuth } from "../utils/auth";
import { notesQueryOptions } from "../model/BoardTypes";
import { useQuery } from "@tanstack/react-query";
import { LoadinSkeleton } from "../components/default/LoadingSkeleton";

export const Route = createFileRoute("/board/$board/notes")({
	component: () => <NotesComponent></NotesComponent>,
});

function NotesComponent() {
	const { board } = Route.useParams();
	const auth = useAuth();
	const navigate = useNavigate();
	const {
		data: grpcResponse,
		isLoading,
		isError,
	} = useQuery(notesQueryOptions(auth.token, board));
	if (!auth.isAuthenticated) {
		void navigate({ to: "/auth/$action", params: { action: "login" } });
	}
	if (isError) {
		throw Error("Failed to get notes");
	}

	if (isLoading) {
		return <LoadinSkeleton></LoadinSkeleton>;
	}

	return (
		<>
			{!grpcResponse?.notes ? (
				<div>No notes found</div>
			) : (
				grpcResponse.notes.map((note) => {
					return (
						<>
							<Note
								key={note.id}
								id={note.id}
								content={note.content}
							></Note>
							;
						</>
					);
				})
			)}
		</>
	);
}
