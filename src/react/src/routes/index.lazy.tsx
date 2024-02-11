import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: () => <BoardsListComponent></BoardsListComponent>,
});

function BoardsListComponent() {
	return <div>Hello /boards!</div>;
}
