import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ErrorComponent } from "./components/default/ErrorComponent";
import { LoadinSkeleton } from "./components/default/LoadingSkeleton";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth, type AuthContext } from "./utils/auth";

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: Infinity } },
});

export interface RouterContext {
	auth: AuthContext | undefined;
	queryClient: typeof queryClient;
}

const router = createRouter({
	defaultPendingComponent: () => <LoadinSkeleton></LoadinSkeleton>,
	defaultErrorComponent: ({ error }) => (
		<ErrorComponent error={error as unknown as Error}></ErrorComponent>
	),
	routeTree,
	context: {
		auth: undefined,
		queryClient,
	},
	defaultPreload: false,
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth, queryClient }} />;
}

function App() {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<InnerApp></InnerApp>
				</AuthProvider>
			</QueryClientProvider>
		</StrictMode>
	);
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App></App>);
}
