import { WorkerData } from "./types";

const workerFactory = (workerScript: URL, workerOptions: WorkerOptions) => () =>
	new Worker(workerScript, workerOptions);

const main = () => {
	// const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
	const factory = workerFactory(new URL("./worker.ts", import.meta.url), {
		type: "module",
		credentials: "same-origin",
	});
	const worker = factory();

	worker.onmessage = (e) => console.log(e);
	worker.onerror = (e) => console.error(e);
	const test: WorkerData = {
		comand: "SetToken",
		data: "secretToken",
	};
	const test2: WorkerData = {
		comand: "GetToken",
		data: null,
	};
	worker.postMessage(test);
	worker.postMessage(test2);
};

main();
