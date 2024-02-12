import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Note } from "../components/board/Note";
import { useAuth } from "../utils/auth";
import { notesQueryOptions } from "../model/BoardTypes";
import { useQuery } from "@tanstack/react-query";
import { LoadinSkeleton } from "../components/default/LoadingSkeleton";
import { Button } from "@/components/ui/button";

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
			<Link to="/createnote/$fromBoard" params={{ fromBoard: board }}>
				<Button>Create new note</Button>
			</Link>
			{!grpcResponse?.notes ? (
				<div>No notes found</div>
			) : (
				grpcResponse.notes.map((note) => {
					return (
						<div key={note.id} className="max-w-lg">
							<Note id={note.id} content={note.content}></Note>
						</div>
					);
				})
			)}
		</>
	);
}
