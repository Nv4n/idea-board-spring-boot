import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";

interface BoardPreviewProps {
	id: string;
	title: string;
}

export const BoardPreview = ({ id, title }: BoardPreviewProps) => {
	return (
		<>
			<Link to="/board/$board" params={{ board: id }}>
				<Alert>
					<RocketIcon className="h-4 w-4" />
					<AlertTitle>{title}</AlertTitle>
				</Alert>
			</Link>
		</>
	);
};
