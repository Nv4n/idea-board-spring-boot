import { Separator } from "@/components/ui/separator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NotFound } from "../components/default/NotFound";
import { NavMenu } from "../components/NavMenu";
import { type RouterContext } from "../main";
import { useAuth } from "../utils/auth";

export const Route = createRootRouteWithContext<RouterContext>()({
	notFoundComponent: NotFoundComponent,
	component: RootComponent,
});

function NotFoundComponent() {
	const auth = useAuth();
	return (
		<>
			<div className="flex gap-2 p-2">
				<NavMenu auth={auth}></NavMenu>
			</div>
			<Separator></Separator>
			<div className="p-2">
				<NotFound></NotFound>
			</div>
		</>
	);
}

function RootComponent() {
	const auth = useAuth();
	return (
		<>
			<div className="flex gap-2 p-2">
				<NavMenu auth={auth}></NavMenu>
			</div>
			<Separator></Separator>
			<div className="p-2">
				<Outlet />
			</div>
			<TanStackRouterDevtools
				position="bottom-left"
				initialIsOpen={false}
			/>
			<ReactQueryDevtools position="bottom" initialIsOpen={false} />
		</>
	);
}
