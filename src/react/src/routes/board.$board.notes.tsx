import { createFileRoute } from "@tanstack/react-router";
import { Note } from "~/components/board/Note";

export const Route = createFileRoute("/board/$board/notes")({
	component: () => <NotesComponent></NotesComponent>,
});

function NotesComponent() {
	return <Note id={""} content={""}></Note>;
}
