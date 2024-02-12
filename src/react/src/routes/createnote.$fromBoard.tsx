import { createFileRoute } from "@tanstack/react-router";
import { CreateNoteForm } from "../components/board/CreateNoteForm";

export const Route = createFileRoute("/createnote/$fromBoard")({
	component: CreateNote,
});

function CreateNote() {
	const { fromBoard } = Route.useParams();
	return <CreateNoteForm board={fromBoard}></CreateNoteForm>;
}
