import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type ErrorCompomentProps = {
	error: Error;
};

export const ErrorComponent = ({ error }: ErrorCompomentProps) => {
	return (
		<>
			<Alert className="max-w-lg" variant="destructive">
				<ExclamationTriangleIcon className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error.message}</AlertDescription>
			</Alert>
		</>
	);
};
