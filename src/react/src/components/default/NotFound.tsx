import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { EyeNoneIcon } from "@radix-ui/react-icons";

export const NotFound = () => {
	return (
		<Alert className="max-w-lg">
			<EyeNoneIcon className="h-4 w-4" />
			<AlertTitle>ERROR 404</AlertTitle>
			<AlertDescription>The page was not found</AlertDescription>
		</Alert>
	);
};
