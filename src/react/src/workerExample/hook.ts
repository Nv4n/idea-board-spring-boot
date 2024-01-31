import { WorkerData, WorkerResult } from "./types";
const workerFactory = (workerScript: URL, workerOptions: WorkerOptions) => () =>
	new Worker(workerScript, workerOptions);

const factory = workerFactory(new URL("./worker.ts", import.meta.url), {
	type: "module",
	credentials: "same-origin",
});
const worker = factory();

let receivedData: WorkerResult;
worker.onerror = (e) => console.error(e);
worker.onmessage = (e: MessageEvent<WorkerResult>) => {
	receivedData = e.data;
	if (!receivedData.hasToken) {
		console.log(receivedData.msg);
		return;
	}
	if (!!receivedData.token) {
		receivedData.handle(receivedData.token);
		return;
	}
	receivedData.handle("");
};

export const useTokenWorker = (data: WorkerData) => {
	worker.postMessage(data);
};
