import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/$board/notes")({
	component: () => <div>Hello /board/notes!</div>,
});
