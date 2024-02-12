import { createFileRoute } from "@tanstack/react-router";
import { CreateBoardForm } from "../components/board/CreateBoardForm";

export const Route = createFileRoute("/createboard")({
	component: CreateBoardForm,
});
