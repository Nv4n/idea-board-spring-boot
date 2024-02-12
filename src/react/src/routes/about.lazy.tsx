import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../utils/auth";

export const Route = createLazyFileRoute("/about")({
	component: About,
});

function About() {
	const auth = useAuth();
	const navigate = useNavigate();
	if (!auth.isAuthenticated) {
		void navigate({ to: "/auth/$action", params: { action: "login" } });
	}
	return <div className="p-2">Hello from About!</div>;
}
