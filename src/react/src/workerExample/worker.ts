import { type WorkerData, type WorkerResult } from "./types";

let jwt: string | null = null;

self.onmessage =  (e: MessageEvent<WorkerData>) => {
	let result: WorkerResult;
	if (e.data.command === "SetToken") {
		result = { hasToken: false, msg: "Set token succesfull" };
		jwt = e.data.data;
		postMessage(result);
	}
	if (e.data.command === "GetToken") {
		result = { hasToken: true, token: jwt, handle: e.data.handle };
		postMessage(result);
	}
};
