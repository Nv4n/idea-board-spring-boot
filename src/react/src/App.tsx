import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "./components/LoginForm";
import { Chat } from "./components/Chat";

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: Infinity } },
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Chat></Chat>
			<LoginForm></LoginForm>
		</QueryClientProvider>
	);
}
export default App;
