import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { BoardPreview } from "../components/board/BoardPreview";
import { LoadinSkeleton } from "../components/default/LoadingSkeleton";
import { boardsQueryOptions } from "../model/BoardTypes";
import { useAuth } from "../utils/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: BoardsListComponent,
});

function BoardsListComponent() {
	const auth = useAuth();
	const navigate = useNavigate();
	const {
		data: grpcResponse,
		isLoading,
		isError,
	} = useQuery(boardsQueryOptions(auth.token));
	if (!auth.isAuthenticated) {
		void navigate({ to: "/auth/$action", params: { action: "login" } });
	}
	if (isError) {
		throw Error("Can't load any boards");
	}
	if (isLoading) {
		return <LoadinSkeleton></LoadinSkeleton>;
	}
	console.log(grpcResponse);

	return (
		<>
			<Link to="/createboard">
				<Button>CREATE BOARD</Button>
			</Link>
			{!grpcResponse?.boards ? (
				<div>There are no boards</div>
			) : (
				<div>
					{grpcResponse?.boards.map((board) => {
						return (
							<BoardPreview
								key={board.id}
								id={board.id}
								title={board.title}
							></BoardPreview>
						);
					})}
				</div>
			)}
		</>
	);
}
