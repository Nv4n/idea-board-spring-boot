import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/$board")({
	component: () => <BoardComponent></BoardComponent>,
});

function BoardComponent() {
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
								["/board/$board/chat/$chat", "Chat"],
								["/board/$board/notes", "Notes", true],
								,
							] as const
						).map(([to, label, exact]) => {
							return (
								<NavigationMenuItem key={to}>
									<Link
										to={to}
										key={to}
										activeOptions={{ exact }}
										activeProps={{ className: `font-bold` }}
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
