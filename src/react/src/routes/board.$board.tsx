import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	Link,
	Outlet,
	createFileRoute,
	useNavigate,
} from "@tanstack/react-router";
import { useAuth } from "../utils/auth";
import { boardQueryOptions } from "../model/BoardTypes";
import { useQuery } from "@tanstack/react-query";
import { LoadinSkeleton } from "../components/default/LoadingSkeleton";

export const Route = createFileRoute("/board/$board")({
	component: () => <BoardComponent></BoardComponent>,
});

function BoardComponent() {
	const { board } = Route.useParams();
	const auth = useAuth();
	const {
		data: grpcResponse,
		isLoading,
		isError,
	} = useQuery(boardQueryOptions(auth.token, board));

	const navigate = useNavigate();
	if (!auth.isAuthenticated) {
		void navigate({ to: "/auth/$action", params: { action: "login" } });
	}
	if (isError) {
		throw Error("Failed to get board");
	}

	if (isLoading) {
		return <LoadinSkeleton></LoadinSkeleton>;
	}

	return (
		<>
			<div className="flex items-center border-b">
				<h2 className="p-2 text-xl">Idea Board</h2>
			</div>
			<div className="flex flex-wrap divide-x">
				<NavigationMenu>
					<NavigationMenuList>
						{(
							[
								[
									"/board/$board/chat/$chat",
									"Chat",
									false,
									grpcResponse?.chatId,
								],
								["/board/$board/notes", "Notes", true, ""],
								,
							] as const
						).map(([to, label, exact, param]) => {
							return (
								<NavigationMenuItem key={to}>
									<Link
										to={to}
										key={to}
										params={!!param ? { chat: param } : {}}
										activeOptions={{ exact }}
										activeProps={{
											className: `font-bold`,
										}}
										className="p-2"
									>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											{label}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							);
						})}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<hr />
			<Outlet />
		</>
	);
}
