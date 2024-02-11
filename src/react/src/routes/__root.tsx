import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavMenu } from "../components/NavMenu";
import { Separator } from "@/components/ui/separator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotFound } from "../components/default/NotFound";

export const Route = createRootRoute({
	notFoundComponent: () => (
		<>
			<div className="flex gap-2 p-2">
				<NavMenu></NavMenu>
			</div>
			<Separator></Separator>
			<div className="p-2">
				<NotFound></NotFound>
			</div>
		</>
	),

	component: () => (
		<>
			<div className="flex gap-2 p-2">
				<NavMenu></NavMenu>
			</div>
			<Separator></Separator>
			<div className="p-2">
				<Outlet />
			</div>
			<TanStackRouterDevtools />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	),
});
