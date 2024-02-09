import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavMenu } from "../components/NavMenu";
import { Separator } from "@/components/ui/separator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
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
