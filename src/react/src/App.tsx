import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { GreetRequest, Greeting } from "./grpc/greet";
import { GreetServiceClient } from "./grpc/greet.client";
import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
function App() {
	let greeting: Greeting = {
		firstName: "Slimen",
		lastName: "Arnaout",
	};

	const request: GreetRequest = {
		greeting: greeting,
	};
	const transport = new TwirpFetchTransport({
		baseUrl: "http://localhost:8080",
	});

	const client = new GreetServiceClient(transport);

	useEffect(() => {
		const greet = async () => {
			const { response } = await client.greet(request);
			console.log(`Got RPC msg: ${response}`);
		};
		void greet();
	}, []);
	return (
		<>
			<LoginForm></LoginForm>
		</>
	);
}

export default App;
