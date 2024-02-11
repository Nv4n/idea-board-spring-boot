import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "../utils/auth";

// export const loginRouteMask = createRouteMask({
// 	routeTree,
// 	from: "/auth/login",
// 	to: "/login",
// });

// export const registerRouteMask = createRouteMask({
// 	routeTree,
// 	from: "/auth/register",
// 	to: "/register",
// });

export const Route = createFileRoute("/auth/$action")({
	stringifyParams: ({ action }) => ({
		action: `${action}`,
	}),
	component: AuthComponent,
});

function AuthComponent() {
	const auth = useAuth();
	const { action } = Route.useParams();
	const navigate = useNavigate();

	if (auth.isAuthenticated) {
		void navigate({ to: "/" });
	}
	if (action !== "login" && action !== "register") {
		void navigate({ to: "/auth/$action", params: { action: "login" } });
	}
	return (
		<>
			<Tabs defaultValue={action} className="w-[400px]">
				<TabsList>
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<LoginForm></LoginForm>
				</TabsContent>
				<TabsContent value="register">
					<RegisterForm></RegisterForm>
				</TabsContent>
			</Tabs>
		</>
	);
}
