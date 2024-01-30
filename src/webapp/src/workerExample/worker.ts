import { WorkerData } from "./types";

let token: string | null = null;

self.onmessage = async (e: MessageEvent<WorkerData>) => {
	if (e.data.comand === "SetToken") {
		token = e.data.data;
		setTimeout(() => postMessage("Set token succesfull"), 1000);
	}
	if (e.data.comand === "GetToken") {
		setTimeout(() => postMessage(token), 1000);
	}
	console.log("Worker got message", e.data);
};
