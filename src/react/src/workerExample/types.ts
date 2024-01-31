export type WorkerData =
	| {
			command: "GetToken";
			handle: (data: string) => void;
	  }
	| {
			command: "SetToken";
			data: string;
	  };

export type WorkerResult =
	| {
			hasToken: false;
			msg: string;
	  }
	| {
			hasToken: true;
			token: string | null;
			handle: (data: string) => void;
	  };
